<?php
include 'db.php';

try {
    $stmt = $pdo->query("SELECT * FROM music ORDER BY created_at DESC");
    $musicList = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($musicList);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
