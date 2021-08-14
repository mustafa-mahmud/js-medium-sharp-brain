<?php
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

if ($data) {
  $score = intval($data);
  $sql = "UPDATE filp SET score=:sc";
  $stmt = $conn->prepare($sql);
  $stmt->execute(['sc' => $score]);

  if ($stmt->rowCount()) {
    echo 'Success';
  }
}
?>