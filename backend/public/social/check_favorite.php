<?php
require_once '../../config/db.php';

$user_id = $_GET['user_id'];
$work_id = $_GET['work_id'];

$stmt = $pdo->prepare("SELECT 1 FROM User_favorites WHERE user_id = ? AND work_id = ?");
$stmt->execute([$user_id, $work_id]);
echo json_encode(['isFavorite' => (bool)$stmt->fetch()]);