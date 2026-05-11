<?php
require_once '../../config/db.php';

$category = isset($_GET['category']) ? $_GET['category'] : '';

if ($category !== 'music' && $category !== 'cinema') {
    echo json_encode(["error" => "Invalid category"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id, title, content, image_url, created_at FROM News WHERE category = ? ORDER BY created_at DESC");
    $stmt->execute([$category]);
    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($news);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>