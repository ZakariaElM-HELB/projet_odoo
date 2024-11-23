<?php
include 'db.php'; // Connexion à la base de données

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'];
$video_path = $data['video_path'];

if (empty($user_id) || empty($video_path)) {
    echo json_encode(['error' => 'Données manquantes']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO reposts (user_id, video_path) VALUES (:user_id, :video_path)");
    $stmt->execute(['user_id' => $user_id, 'video_path' => $video_path]);
    echo json_encode(['success' => 'Repost enregistré']);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
