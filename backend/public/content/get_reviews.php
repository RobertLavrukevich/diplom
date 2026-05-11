<?php
require_once '../../config/db.php';

$work_id = $_GET['work_id'] ?? '';
$current_user_id = $_GET['user_id'] ?? null; 

if (!$work_id) {
    echo json_encode([]);
    exit;
}

try {
    $sql = "SELECT r.*, u.username, u.avatar_url,
            (SELECT COUNT(*) FROM Review_likes WHERE review_id = r.id) as likes_count,
            " . ($current_user_id ? "(SELECT COUNT(*) FROM Review_likes WHERE review_id = r.id AND user_id = :user_id) " : "0 ") . "as is_liked
            FROM Reviews r 
            JOIN Users u ON r.user_id = u.id 
            WHERE r.work_id = :work_id AND r.status = 'published'
            ORDER BY r.created_at DESC";
            
    $stmt = $pdo->prepare($sql);
    
    $params = ['work_id' => $work_id];
    if ($current_user_id) {
        $params['user_id'] = $current_user_id;
    }
    
    $stmt->execute($params);
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($reviews as &$review) {
        $review['likes_count'] = (int)$review['likes_count'];
        $review['is_liked'] = (bool)$review['is_liked'];
    }

    echo json_encode($reviews);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}