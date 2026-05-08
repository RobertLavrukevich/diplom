<?php
require_once 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

$stmt = $pdo->prepare("INSERT INTO News (title, content, category, author_id) VALUES (?, ?, ?, ?)");
if($stmt->execute([$data['title'], $data['content'], $data['category'], $data['author_id']])) {
    echo json_encode(["status" => "success"]);
}