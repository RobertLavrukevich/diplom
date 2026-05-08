<?php
require_once 'db.php';

$sql = "SELECT r.*, u.username, u.avatar_url, w.title as work_title, w.singers, w.actors 
        FROM Reviews r
        JOIN Users u ON r.user_id = u.id
        JOIN Works w ON r.work_id = w.id
        WHERE r.status = 'pending'
        ORDER BY r.created_at DESC";

$stmt = $pdo->query($sql);
echo json_encode($stmt->fetchAll());