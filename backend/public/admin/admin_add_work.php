<?php
require_once '../../config/db.php';
require_once '../../includes/check_admin.php';

verifyAdminOrDie($pdo);
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || empty($data['title'])) exit;

function generateSlug($string) {
    $matrix = [
        'а' => 'a',   'б' => 'b',   'в' => 'v',   'г' => 'g',   'д' => 'd',
        'е' => 'e',   'ё' => 'yo',  'ж' => 'zh',  'з' => 'z',   'и' => 'i',
        'й' => 'y',   'к' => 'k',   'л' => 'l',   'м' => 'm',   'н' => 'n',
        'о' => 'o',   'п' => 'p',   'р' => 'r',   'с' => 's',   'т' => 't',
        'у' => 'u',   'ф' => 'f',   'х' => 'kh',  'ц' => 'ts',  'ч' => 'ch',
        'ш' => 'sh',  'щ' => 'shch','ъ' => '',    'ы' => 'y',   'ь' => '',
        'э' => 'e',   'ю' => 'yu',  'я' => 'ya',  'і' => 'i',   'ї' => 'yi',  
        'є' => 'ye',  'ґ' => 'g'
    ];
    $string = mb_strtolower($string, 'UTF-8');
    $string = strtr($string, $matrix);
    $string = preg_replace('/[\s_\-]+/', '-', $string);
    $string = preg_replace('/[^a-z0-9\-]/', '', $string);
    return trim($string, '-');
}

$slug = generateSlug($data['title']);

try {
    $checkStmt = $pdo->prepare("SELECT id FROM Works WHERE slug = ?");
    $checkStmt->execute([$slug]);
    
    if ($checkStmt->fetch()) {
        $extraInfo = '';
        
        if (!empty($data['singers'])) {
            $extraInfo = $data['singers'];
        } elseif (!empty($data['actors'])) {
            $actorsArray = explode(',', $data['actors']);
            $extraInfo = trim($actorsArray[0]); 
        }

        if (!empty($extraInfo)) {
            $suffix = generateBaseSlug($extraInfo);
            $slug = $slug . '-' . $suffix;
        } else {
            $slug = $slug . '-' . substr(md5(time()), 0, 5);
        }

        $finalCheck = $pdo->prepare("SELECT id FROM Works WHERE slug = ?");
        $finalCheck->execute([$slug]);
        if ($finalCheck->fetch()) {
            $slug = $slug . '-' . substr(md5(time()), 0, 4); 
        }
    }

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