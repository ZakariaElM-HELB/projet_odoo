<?php
include 'db.php'; // Connexion à la base de données

$user_id = $_GET['user_id']; // Récupérer l'ID de l'utilisateur depuis l'URL ou la session

try {
    $stmt = $pdo->prepare("SELECT video_path FROM reposts WHERE user_id = :user_id");
    $stmt->execute(['user_id' => $user_id]);
    $reposts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($reposts);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
