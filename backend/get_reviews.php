<?php
include 'db.php';

$work_id = $_GET['work_id'] ?? '';

if (!$work_id) {
    echo json_encode([]);
    exit;
}

try {
    $sql = "SELECT r.*, u.username, u.avatar_url 
            FROM Reviews r 
            JOIN Users u ON r.user_id = u.id 
            WHERE r.work_id = :work_id AND r.status = 'published'
            ORDER BY r.created_at DESC";
            
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['work_id' => $work_id]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}