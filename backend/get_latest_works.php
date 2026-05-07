<?php
require_once 'db.php';
$cat = $_GET['category'] ?? 'music';

$sql = "SELECT w.*, wt.name as type_name 
        FROM Works w
        JOIN Work_types wt ON w.work_type_id = wt.id
        WHERE wt.category = ?
        ORDER BY w.id DESC
        LIMIT 8";

$stmt = $pdo->prepare($sql);
$stmt->execute([$cat]);
echo json_encode($stmt->fetchAll());