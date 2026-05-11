<?php
require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'] ?? null;
$review_id = $data['review_id'] ?? null;

if (!$user_id || !$review_id) {
    echo json_encode(["error" => "Недостаточно данных"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT 1 FROM Review_likes WHERE user_id = ? AND review_id = ?");
    $stmt->execute([$user_id, $review_id]);

    if ($stmt->fetch()) {
        $stmt = $pdo->prepare("DELETE FROM Review_likes WHERE user_id = ? AND review_id = ?");
        $stmt->execute([$user_id, $review_id]);
        echo json_encode(["status" => "removed"]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO Review_likes (user_id, review_id) VALUES (?, ?)");
        $stmt->execute([$user_id, $review_id]);
        echo json_encode(["status" => "added"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}