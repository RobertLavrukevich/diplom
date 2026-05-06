<?php
require_once 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data['username'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (empty($username) || empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Все поля обязательны для заполнения"]);
    exit;
}

try {
    $check = $pdo->prepare("SELECT id FROM Users WHERE email = ? OR username = ?");
    $check->execute([$email, $username]);
    $existingUser = $check->fetch();
    
    if ($existingUser) {
        echo json_encode(["status" => "error", "message" => "Этот email занят"]);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO Users (username, email, password_hash, role_id) VALUES (?, ?, ?, 1)");
    $stmt->execute([$username, $email, $hashedPassword]); 
    
    echo json_encode(["status" => "success", "message" => "Регистрация успешна"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Ошибка базы данных"]);
}