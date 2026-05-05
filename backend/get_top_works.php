<?php
include 'db.php';

$category = $_GET['category'] ?? '';
$typeSlug = $_GET['type'] ?? '';   

if (empty($category) || empty($typeSlug)) {
    echo json_encode(["error" => "Недостаточно параметров"]);
    exit;
}

$typeMapping = [
    'single' => 'Сингл',
    'album'  => 'Альбом',
    'film'   => 'Фильм',
    'series' => 'Сериал'
];

$typeName = $typeMapping[$typeSlug] ?? '';

try {
    $sql = "SELECT 
                w.id, 
                w.title, 
                w.poster_url AS imageUrl, 
                w.average_rating AS rating, 
                w.actors, 
                w.singers, 
                w.slug,
                (SELECT COUNT(*) FROM Reviews r WHERE r.work_id = w.id AND r.status = 'published') AS totalReviews
            FROM Works w
            JOIN Work_types wt ON w.work_type_id = wt.id
            WHERE wt.category = :category AND wt.name = :typeName
            ORDER BY w.average_rating DESC, totalReviews DESC
            LIMIT 30";

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['category' => $category, 'typeName' => $typeName]);
    $works = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($works);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Ошибка базы данных: " . $e->getMessage()]);
}