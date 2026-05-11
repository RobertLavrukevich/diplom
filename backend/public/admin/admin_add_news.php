<?php
require_once '../../config/db.php';
require_once '../../includes/check_admin.php';

$admin = verifyAdminOrDie($pdo); 
$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['title']) || empty($data['content'])) {
    echo json_encode(["error" => "Заполните данные"]);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO News (title, content, category, author_id, image_url) VALUES (?, ?, ?, ?, ?)");
if($stmt->execute([
    $data['title'], 
    $data['content'], 
    $data['category'], 
    $admin->id, 
    $data['image_url'] ?? null
    ])) 
    {
    echo json_encode(["status" => "success"]);
}