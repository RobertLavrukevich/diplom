<?php
include 'db.php';

$slug = $_GET['slug'] ?? '';

if (empty($slug)) {
    echo json_encode(["error" => "Не указан slug произведения"]);
    exit;
}

try {
    $sql = "SELECT 
                w.id, 
                w.title, 
                w.description,
                w.release_date AS releaseDate, 
                w.poster_url AS imageUrl, 
                w.average_rating AS averageRating, 
                w.actors, 
                w.singers, 
                wt.name AS typeName, 
                wt.category,
                w.slug,
                GROUP_CONCAT(g.name SEPARATOR ', ') AS genre,
                (SELECT COUNT(*) FROM Reviews r WHERE r.work_id = w.id AND r.status = 'published') AS totalReviews
            FROM Works w
            JOIN Work_types wt ON w.work_type_id = wt.id
            LEFT JOIN Work_genres wg ON w.id = wg.work_id
            LEFT JOIN Genres g ON wg.genre_id = g.id
            WHERE w.slug = :slug
            GROUP BY w.id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['slug' => $slug]);
    $work = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($work) {
        echo json_encode($work);
    } else {
        echo json_encode(["error" => "Произведение не найдено"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Ошибка базы данных: " . $e->getMessage()]);
}