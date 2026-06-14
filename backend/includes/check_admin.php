<?php
require_once __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function verifyAdminOrDie($pdo) {
    $secret_key = "f8a9d7a6b5c4e3d2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8";
    
    $headers = apache_request_headers();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? $_SERVER['HTTP_AUTHORIZATION'] ?? null;

    if (!$authHeader) {
        http_response_code(401);
        echo json_encode(["error" => "Токен отсутствует"]);
        exit;
    }

    try {
        $jwt = str_replace('Bearer ', '', $authHeader);
        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        
        if (!isset($decoded->data->role_id) || $decoded->data->role_id != 2) {
            http_response_code(403);
            echo json_encode(["error" => "Недостаточно прав (role_id: " . ($decoded->data->role_id ?? 'null') . ")"]);
            exit;
        }
        return $decoded->data;
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode([
            "error" => "Ошибка валидации JWT: " . $e->getMessage()
        ]);
        exit;
    }
}