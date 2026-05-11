<?php
require_once '../../config/db.php';

$cat = $_GET['category'] ?? 'music';

$sql = "SELECT w.*, wt.name as type_name, COUNT(r.id) as count_reviews 
        FROM Works w
        JOIN Work_types wt ON w.work_type_id = wt.id
        LEFT JOIN Reviews r ON w.id = r.work_id AND r.created_at >= NOW() - INTERVAL 1 DAY
        WHERE wt.category = ?
        GROUP BY w.id
        ORDER BY count_reviews DESC
        LIMIT 8";

$stmt = $pdo->prepare($sql);
$stmt->execute([$cat]);
echo json_encode($stmt->fetchAll());