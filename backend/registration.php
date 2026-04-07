<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->email) && !empty($data->password)) {
    $query = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";
    $stmt = $pdo->prepare($query);
    
    $hashedPassword = password_hash($data->password, PASSWORD_BCRYPT);
    
    try {
        $stmt->execute([
            ':username' => $data->username,
            ':email' => $data->email,
            ':password' => $hashedPassword
        ]);
        echo json_encode(["message" => "Пользователь создан"]);
    } catch (PDOException $e) {
        http_response_code(400);
        echo json_encode(["error" => "Ошибка: возможно, email уже занят"]);
    }
}