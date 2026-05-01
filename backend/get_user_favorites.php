<?php
require_once 'db.php';

if (!isset($_GET['user_id'])) {
    echo json_encode(['error' => 'Missing user_id']);
    exit;
}

$user_id = $_GET['user_id'];

$query = "
    SELECT 
        w.*, 
        wt.name as typeName,
        CASE 
            WHEN wt.name IN ('Альбом', 'Сингл') THEN 'music'
            WHEN wt.name IN ('Фильм', 'Сериал') THEN 'cinema'
            ELSE 'music' 
        END as category
    FROM User_favorites uf 
    JOIN Works w ON uf.work_id = w.id 
    JOIN Work_types wt ON w.work_type_id = wt.id
    WHERE uf.user_id = ?
";

try {
    $stmt = $pdo->prepare($query);
    $stmt->execute([$user_id]);
    $favorites = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($favorites);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}