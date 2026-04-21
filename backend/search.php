<?php

include 'db.php';

$category = $_GET['category'] ?? '';
$query = $_GET['q'] ?? '';

if (empty($category) || empty($query)) {
    echo json_encode([]);
    exit;
}

try {
    $searchTerm = "%$query%";

    $sql = "SELECT 
                w.id, 
                w.title, 
                w.poster_url, 
                w.average_rating, 
                w.actors, 
                w.singers, 
                wt.name AS work_type_name
            FROM Works w
            JOIN Work_types wt ON w.work_type_id = wt.id
            WHERE wt.category = :category 
              AND w.title LIKE :term";

    $stmt = $pdo->prepare($sql);
    
    $stmt->execute([
        'category' => $category,
        'term'     => $searchTerm
    ]);

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Ошибка базы данных: " . $e->getMessage()]);
}