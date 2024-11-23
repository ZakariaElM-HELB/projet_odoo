<?php
$servername = "localhost";
$username = "root"; // Nom d'utilisateur par défaut pour XAMPP
$password = ""; // Mot de passe par défaut pour XAMPP
$dbname = "singe_social";

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>
