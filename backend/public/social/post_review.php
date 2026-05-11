<?php

require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data['user_id'] || !$data['work_id'] || !$data['content']) {
    echo json_encode(["error" => "Не все поля заполнены"]);
    exit;
}

try {
    $sql = "INSERT INTO Reviews (user_id, work_id, title, content, rating, status) 
            VALUES (:user_id, :work_id, :title, :content, :rating, 'pending')";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'user_id' => $data['user_id'],
        'work_id' => $data['work_id'],
        'title'   => $data['title'],
        'content' => $data['content'],
        'rating'  => $data['rating']
    ]);

    echo json_encode(["success" => true, "message" => "Рецензия опубликована"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}