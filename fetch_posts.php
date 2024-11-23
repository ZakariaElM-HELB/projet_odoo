<?php
include 'db.php'; // Fichier de connexion à la base de données

try {
    // Récupérer tous les posts depuis la base de données
    $stmt = $pdo->query("SELECT * FROM posts ORDER BY created_at DESC");
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Envoyer les données au format JSON
    header('Content-Type: application/json');
    echo json_encode($posts);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
