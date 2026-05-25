<?php

require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['user_id']) && isset($data['review_id'])) {
    $user_id = $data['user_id'];
    $review_id = $data['review_id'];

    try {
        $query = "DELETE FROM Reviews WHERE id = ? AND user_id = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$review_id, $user_id]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => true, "message" => "Рецензия успешно удалена"]);
        } else {
            echo json_encode(["success" => false, "error" => "Рецензия не найдена или не принадлежит вам"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Неполные данные для удаления"]);
}
?>