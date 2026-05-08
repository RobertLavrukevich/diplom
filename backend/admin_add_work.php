<?php
require_once 'db.php';
require_once 'check_admin.php';

verifyAdminOrDie($pdo);
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || empty($data['title'])) exit;

function generateSlug($string) {
    $string = mb_strtolower($string, 'UTF-8');
    $string = str_replace(' ', '-', $string);
    $string = preg_replace('/[^a-z0-9\-а-яё]/u', '', $string);
    return trim($string, '-');
}

$slug = generateSlug($data['title']);

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("INSERT INTO Works (work_type_id, title, description, release_date, poster_url, actors, singers, slug, average_rating) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)");
    $stmt->execute([
        $data['work_type_id'],
        $data['title'],
        $data['description'],
        $data['release_date'],
        $data['poster_url'],
        $data['actors'] ?? null,
        $data['singers'] ?? null,
        $slug
    ]);

    $work_id = $pdo->lastInsertId();

    if (!empty($data['genres'])) {
        $genreStmt = $pdo->prepare("INSERT INTO Work_genres (work_id, genre_id) VALUES (?, ?)");
        foreach ($data['genres'] as $genre_id) {
            $genreStmt->execute([$work_id, $genre_id]);
        }
    }

    $pdo->commit();
    echo json_encode(["status" => "success", "slug" => $slug]);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(["error" => $e->getMessage()]);
}