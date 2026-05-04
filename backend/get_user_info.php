<?php
require_once 'db.php';

$username = $_GET['username'] ?? null;

if (!$username) {
    echo json_encode(['error' => 'Не указан username']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id, username, email, avatar_url, created_at FROM Users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode($user);
    } else {
        echo json_encode(['error' => 'Пользователь не найден']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>