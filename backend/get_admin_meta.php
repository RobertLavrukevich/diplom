<?php
require_once 'db.php';

$types = $pdo->query("SELECT * FROM Work_types")->fetchAll();
$genres = $pdo->query("SELECT * FROM Genres")->fetchAll();

echo json_encode([
    "types" => $types,
    "genres" => $genres
]);