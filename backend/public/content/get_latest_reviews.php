<?php
require_once '../../config/db.php';

$cat = $_GET['category'] ?? 'music';

$sql = "SELECT r.*, u.username, u.avatar_url, w.title as work_title, w.singers, w.actors
        FROM Reviews r
        JOIN Users u ON r.user_id = u.id
        JOIN Works w ON r.work_id = w.id
        JOIN Work_types wt ON w.work_type_id = wt.id
        WHERE wt.category = ? AND r.status = 'published'
        ORDER BY r.created_at DESC
        LIMIT 6";

$stmt = $pdo->prepare($sql);
$stmt->execute([$cat]);
echo json_encode($stmt->fetchAll());