<?php
require_once 'db.php';

if (isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];

    try {
        $query = "
            SELECT 
                r.id, 
                r.title AS review_title, 
                r.content, 
                r.rating, 
                w.title AS work_title,
                w.actors,
                w.singers,
                u.username,
                u.avatar_url
            FROM Reviews r
            JOIN Works w ON r.work_id = w.id
            JOIN Users u ON r.user_id = u.id
            WHERE r.user_id = ?
            ORDER BY r.created_at DESC
        ";

        $stmt = $pdo->prepare($query);
        $stmt->execute([$user_id]);
        $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($reviews);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}
?>