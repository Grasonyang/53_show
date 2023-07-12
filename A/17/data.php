<?php
$db = mysqli_connect("localhost", "admin", "1234", "a_17_1");
if ($_GET['call'] == 0) {
  mysqli_query($db, "INSERT INTO `data`(`data`, `player`) VALUES 
  ('$_POST[data]','$_POST[player]')");
} else if ($_GET['call'] == 1) {
  $arr = mysqli_fetch_array(mysqli_query($db, "SELECT * FROM `data` ORDER BY`id` DESC LIMIT 1"));
  echo json_encode($arr);
}
