<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $targetDir = "assets/img/";
    $targetFile = $targetDir . basename($_FILES["image"]["name"]);
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    $check = getimagesize($_FILES["image"]["tmp_name"]);

    if ($check === false || !in_array($imageFileType, ["jpg", "jpeg", "png", "gif"])) {
        die(json_encode(["error" => "Fichier invalide"]));
    }

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
        $stmt = $pdo->prepare("INSERT INTO posts (image_path) VALUES (:image_path)");
        $stmt->execute(["image_path" => $targetFile]);
        echo json_encode(["success" => "Image uploadée"]);
    } else {
        echo json_encode(["error" => "Erreur d'upload"]);
    }
}
?>
