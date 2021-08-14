<?php
$server = 'localhost';
$user = 'root';
$password = '';
$db = 'game';
$dsn = "mysql:host=$server;dbname=$db";

try {
  $conn = new PDO($dsn, $user, $password);
  $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
  $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

} catch (PDOException $e) {
  echo 'connection failed: ' . $e->getMessage();
}
?>