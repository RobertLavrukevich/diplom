<?php
require_once 'db.php';
$follower_id = $_GET['follower_id'];
$following_id = $_GET['following_id'];

$stmt = $pdo->prepare("SELECT 1 FROM Subscriptions WHERE follower_id = ? AND following_id = ?");
$stmt->execute([$follower_id, $following_id]);

echo json_encode(["isSubscribed" => (bool)$stmt->fetch()]);
?>