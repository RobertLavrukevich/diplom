<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

$query = "SELECT * FROM users WHERE email = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$data->email]);
$user = $stmt->fetch();

if ($user && password_verify($data->password, $user['password'])) {
    // В идеале тут генерируется JWT. Пока вернем заглушку.
    echo json_encode([
        "token" => "fake-jwt-token-for-testing",
        "user" => [
            "id" => $user['id'],
            "username" => $user['username'],
            "email" => $user['email']
        ]
    ]);
} else {
    http_response_code(401);
    echo json_encode(["error" => "Неверный логин или пароль"]);
}