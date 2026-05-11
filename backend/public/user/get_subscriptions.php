<?php
require_once '../../config/db.php';

$user_id = $_GET['user_id'];

$query = "
    SELECT u.id, u.username, u.avatar_url 
    FROM Subscriptions s
    JOIN Users u ON s.following_id = u.id
    WHERE s.follower_id = ?
";

try {
    $stmt = $pdo->prepare($query);
    $stmt->execute([$user_id]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>