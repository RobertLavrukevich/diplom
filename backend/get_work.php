<?php

include 'db.php';

$id = $_GET['id'] ?? '';

if (empty($id)) {
    echo json_encode(["error" => "Не указан ID произведения"]);
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
                GROUP_CONCAT(g.name SEPARATOR ', ') AS genre,
                (SELECT COUNT(*) FROM Reviews r WHERE r.work_id = w.id AND r.status = 'published') AS totalReviews
            FROM Works w
            JOIN Work_types wt ON w.work_type_id = wt.id
            LEFT JOIN Work_genres wg ON w.id = wg.work_id
            LEFT JOIN Genres g ON wg.genre_id = g.id
            WHERE w.id = :id
            GROUP BY w.id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id]);
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