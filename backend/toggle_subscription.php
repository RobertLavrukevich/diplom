<?php
require_once 'db.php';
$data = json_decode(file_get_contents("php://input"), true);
$follower_id = $data['follower_id'];
$following_id = $data['following_id']; 

if ($follower_id == $following_id) {
    echo json_encode(["error" => "Нельзя подписаться на самого себя"]);
    exit;
}

$stmt = $pdo->prepare("SELECT 1 FROM Subscriptions WHERE follower_id = ? AND following_id = ?");
$stmt->execute([$follower_id, $following_id]);

if ($stmt->fetch()) {
    $stmt = $pdo->prepare("DELETE FROM Subscriptions WHERE follower_id = ? AND following_id = ?");
    $stmt->execute([$follower_id, $following_id]);
    echo json_encode(["status" => "unsubscribed"]);
} else {
    $stmt = $pdo->prepare("INSERT INTO Subscriptions (follower_id, following_id) VALUES (?, ?)");
    $stmt->execute([$follower_id, $following_id]);
    echo json_encode(["status" => "subscribed"]);
}
?>