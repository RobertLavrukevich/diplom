<?php
require_once '../../config/db.php';

$username = $_GET['username'] ?? null;
$user_id = $_GET['user_id'] ?? null;

if (!$username && !$user_id) {
    echo json_encode(['error' => 'Не указаны параметры поиска']);
    exit;
}

try {
    if ($user_id) {
        $stmt = $pdo->prepare("SELECT id, username, email, avatar_url, created_at FROM Users WHERE id = ?");
        $stmt->execute([$user_id]);
    } else {
        $stmt = $pdo->prepare("SELECT id, username, email, avatar_url, created_at FROM Users WHERE username = ?");
        $stmt->execute([$username]);
    }
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $found_id = $user['id'];

        $stmtStats = $pdo->prepare("SELECT COUNT(*) FROM Subscriptions WHERE follower_id = ?");
        $stmtStats->execute([$found_id]);
        $following_count = $stmtStats->fetchColumn();

        $stmtStats = $pdo->prepare("SELECT COUNT(*) FROM Subscriptions WHERE following_id = ?");
        $stmtStats->execute([$found_id]);
        $followers_count = $stmtStats->fetchColumn();

        $stmtStats = $pdo->prepare("SELECT COUNT(*) FROM Reviews WHERE user_id = ? AND status = 'published'");
        $stmtStats->execute([$found_id]);
        $reviews_count = $stmtStats->fetchColumn();

        $stmtStats = $pdo->prepare("
            SELECT COUNT(*) 
            FROM Review_likes l
            JOIN Reviews r ON l.review_id = r.id
            WHERE r.user_id = ?
        ");
        $stmtStats->execute([$found_id]);
        $likes_count = $stmtStats->fetchColumn();

        $user['stats'] = [
            'following' => (int)$following_count,
            'followers' => (int)$followers_count,
            'reviews' => (int)$reviews_count,
            'likes' => (int)$likes_count
        ];

        echo json_encode($user);
    } else {
        echo json_encode(['error' => 'Пользователь не найден']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>