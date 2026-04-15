<?php
require_once 'db.php';

header('Content-Type: application/json');

try {
    // 1. Создаем временную таблицу для теста
    $pdo->exec("CREATE TEMPORARY TABLE debug_test (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        test_val VARCHAR(50)
    )");

    // 2. Записываем тестовую строку
    $stmt = $pdo->prepare("INSERT INTO debug_test (test_val) VALUES (?)");
    $stmt->execute(['Docker connection is working!']);

    // 3. Читаем эту строку обратно
    $result = $pdo->query("SELECT * FROM debug_test")->fetch();

    echo json_encode([
        "status" => "success",
        "database" => "my_review_db",
        "check_write_read" => $result['test_val'],
        "php_version" => PHP_VERSION,
        "mysql_server_info" => $pdo->getAttribute(PDO::ATTR_SERVER_INFO)
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}