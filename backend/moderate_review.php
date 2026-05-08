<?php
require_once 'db.php';
require_once 'check_admin.php';

verifyAdminOrDie($pdo); 

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$action = $data['action']; 

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
} else {
    $stmt = $pdo->prepare("DELETE FROM Reviews WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(["status" => "deleted"]);
}