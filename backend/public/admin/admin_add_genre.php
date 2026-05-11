<?php
require_once '../../config/db.php';
require_once '../../includes/check_admin.php';

verifyAdminOrDie($pdo);
$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['name']) || empty($data['category'])) {
    echo json_encode(["error" => "Заполните все поля"]);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO Genres (name, category) VALUES (?, ?)");
if($stmt->execute([$data['name'], $data['category']])) {
    echo json_encode(["status" => "success"]);
}