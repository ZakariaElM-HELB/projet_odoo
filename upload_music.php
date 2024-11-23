<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['music'])) {
    $targetDir = "assets/music/";
    $targetFile = $targetDir . basename($_FILES["music"]["name"]);
    $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    $user = isset($_POST['user']) && !empty($_POST['user']) ? $_POST['user'] : "Utilisateur anonyme";

    if (!in_array($fileType, ["mp3", "wav"])) {
        die(json_encode(["error" => "Format invalide"]));
    }

    if (move_uploaded_file($_FILES["music"]["tmp_name"], $targetFile)) {
        $stmt = $pdo->prepare("INSERT INTO music (file_path, user) VALUES (:file_path, :user)");
        $stmt->execute(["file_path" => $targetFile, "user" => $user]);
        echo json_encode(["success" => "Musique ajoutée"]);
    } else {
        echo json_encode(["error" => "Erreur d'upload"]);
    }
}
?>
