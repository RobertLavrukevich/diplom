<?php
require_once 'db.php';
$cat = $_GET['category'] ?? 'music';

$sql = ($cat === 'music') ? 
    "SELECT 
        (SELECT COUNT(*) FROM Users) as users,
        (SELECT COUNT(*) FROM Works w JOIN Work_types wt ON w.work_type_id = wt.id WHERE wt.name = 'Сингл') as tracks,
        (SELECT COUNT(*) FROM Works w JOIN Work_types wt ON w.work_type_id = wt.id WHERE wt.name = 'Альбом') as albums,
        (SELECT COUNT(*) FROM Reviews r JOIN Works w ON r.work_id = w.id JOIN Work_types wt ON w.work_type_id = wt.id WHERE wt.category = 'music') as comments" :
    "SELECT 
        (SELECT COUNT(*) FROM Users) as users,
        (SELECT COUNT(*) FROM Works w JOIN Work_types wt ON w.work_type_id = wt.id WHERE wt.name = 'Фильм') as films,
        (SELECT COUNT(*) FROM Works w JOIN Work_types wt ON w.work_type_id = wt.id WHERE wt.name = 'Сериал') as series,
        (SELECT COUNT(*) FROM Reviews r JOIN Works w ON r.work_id = w.id JOIN Work_types wt ON w.work_type_id = wt.id WHERE wt.category = 'cinema') as comments";

$stmt = $pdo->query($sql);
echo json_encode($stmt->fetch());