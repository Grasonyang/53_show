<?php
$db = mysqli_connect("localhost", "admin", "1234", "a_18_1");
if ($_GET['call'] == 0) {
  if (!mysqli_num_rows(mysqli_query($db, "SELECT * FROM `user` WHERE `user` = '$_POST[user]'"))) {
    mysqli_query($db, "INSERT INTO `user`(`user`) VALUES ('$_POST[user]')");
    echo "1";
  } else {
    echo "0";
  }
} else if ($_GET['call'] == 1) {
  $row = mysqli_query($db, "SELECT * FROM `chat`");
  while ($arr = mysqli_fetch_array($row)) {
    echo json_encode($arr) . "(+)";
  }
} else if ($_GET['call'] == 2) {
  $row = mysqli_query($db, "SELECT * FROM `user`");
  while ($arr = mysqli_fetch_array($row)) {
    echo json_encode($arr) . "(+)";
  }
} else if ($_GET['call'] == 3) {
  mysqli_query($db, "INSERT INTO `chat`(`user`, `chat`) VALUES 
  ('$_POST[user]','$_POST[chat]')");
} else if ($_GET['call'] == 4) {
  mysqli_query($db, "DELETE FROM `user` WHERE `user`='$_POST[name]'");
}
