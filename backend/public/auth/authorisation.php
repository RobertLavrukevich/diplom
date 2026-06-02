<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../config/db.php';
require_once '../../vendor/autoload.php';
use Firebase\JWT\JWT;

$secret_key = "f8a9d7a6b5c4e3d2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8";

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['email']) || empty($data['password'])) {
    echo json_encode(["status" => "error", "message" => "Введите email и пароль", "field" => "common"]);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM Users WHERE email = ?");
$stmt->execute([$data['email']]);
$user = $stmt->fetch();

if ($user && password_verify($data['password'], $user['password_hash'])) {
    $payload = [
        "iss" => "localhost",     
        "iat" => time(),            
        "exp" => time() + 86400,   
        "data" => [                 
            "id" => $user['id'],
            "username" => $user['username'],
            "email" => $user['email'],
            "created_at" => $user['created_at'],
            "role_id" => $user['role_id'],
            "avatar_url" => $user['avatar_url']
        ]
    ];

    $jwt = JWT::encode($payload, $secret_key, 'HS256');

    echo json_encode([
        "status" => "success",
        "token" => $jwt,
        "user" => $payload['data'] 
    ]);
} else {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Неверный email или пароль", "field" => "common"]);
}