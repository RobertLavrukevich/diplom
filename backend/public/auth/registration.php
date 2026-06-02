<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data['username'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$confirmPassword = $data['confirmPassword'] ?? '';

if (empty($username) || empty($email) || empty($password) || empty($confirmPassword)) {
    echo json_encode(["status" => "error", "message" => "Все поля обязательны для заполнения", "field" => "common"]);
    exit;
}

if ($password !== $confirmPassword) {
    echo json_encode(["status" => "error", "message" => "Пароли не совпадают", "field" => "confirmPassword"]);
    exit;
}

try {
    $checkEmail = $pdo->prepare("SELECT id FROM Users WHERE email = ?");
    $checkEmail->execute([$email]);
    if ($checkEmail->fetch()) {
        echo json_encode(["status" => "error", "message" => "Этот email уже занят", "field" => "email"]);
        exit;
    }

    $checkUser = $pdo->prepare("SELECT id FROM Users WHERE username = ?");
    $checkUser->execute([$username]);
    if ($checkUser->fetch()) {
        echo json_encode(["status" => "error", "message" => "Это имя пользователя уже занято", "field" => "username"]);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO Users (username, email, password_hash, role_id) VALUES (?, ?, ?, 1)");
    $stmt->execute([$username, $email, $hashedPassword]); 
    
    echo json_encode(["status" => "success", "message" => "Регистрация успешна"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Ошибка базы данных", "field" => "common"]);
}