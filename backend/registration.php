<?php

require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['username']) && !empty($data['email']) && !empty($data['password'])) {
    try {
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO Users (username, email, password_hash, role_id) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['username'], $data['email'], $hashedPassword, 1]); 
        
        echo json_encode(["status" => "success", "message" => "User registered"]);
    } catch (PDOException $e) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}