<?php
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/db.php';
require_once '../../includes/check_admin.php';

verifyAdminOrDie($pdo); 

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;
$action = $data['action'] ?? null; 

if (!$id || !$action) {
    http_response_code(400);
    echo json_encode(["error" => "Не переданы обязательные параметры"]);
    exit;
}

if ($action === 'approve') {
    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare("UPDATE Reviews SET status = 'published' WHERE id = ?");
        $stmt->execute([$id]);

        $stmt = $pdo->prepare("SELECT work_id FROM Reviews WHERE id = ?");
        $stmt->execute([$id]);
        $review = $stmt->fetch();
        $work_id = $review['work_id'];

        $updateRatingSql = "
            UPDATE Works 
            SET average_rating = (
                SELECT COALESCE(AVG(rating), 0) 
                FROM Reviews 
                WHERE work_id = ? AND status = 'published'
            ) 
            WHERE id = ?
        ";
        $stmt = $pdo->prepare($updateRatingSql);
        $stmt->execute([$work_id, $work_id]);

        $pdo->commit();
        echo json_encode(["status" => "published", "new_rating" => "updated"]);
    } catch (Exception $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} elseif ($action === 'reject') {
    try {
        $stmt = $pdo->prepare("UPDATE Reviews SET status = 'rejected' WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "rejected"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Неизвестное действие"]);
}
?>