<?php
require_once 'db.php';

if (isset($_GET)) {
  $sql = "SELECT * FROM filp";
  $stmt = $conn->prepare($sql);
  $stmt->execute();
  $score = $stmt->fetch();

  echo $score->score;
}
?>