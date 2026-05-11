<?php
require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id'];
$work_id = $data['work_id'];

$stmt = $pdo->prepare("SELECT 1 FROM User_favorites WHERE user_id = ? AND work_id = ?");
$stmt->execute([$user_id, $work_id]);

if ($stmt->fetch()) {
    $stmt = $pdo->prepare("DELETE FROM User_favorites WHERE user_id = ? AND work_id = ?");
    $stmt->execute([$user_id, $work_id]);
    echo json_encode(["status" => "removed"]);
} else {
    $stmt = $pdo->prepare("INSERT INTO User_favorites (user_id, work_id) VALUES (?, ?)");
    $stmt->execute([$user_id, $work_id]);
    echo json_encode(["status" => "added"]);
}