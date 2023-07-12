<?php
session_start();
$db = mysqli_connect("localhost", "admin", "1234", "a_20_1");
if ($_GET['call'] == 0) {
  $user = $_POST['user'];
  $pwd = $_POST['pwd'];
  $code = $_POST['code'];
  $user = stripslashes($user);
  $pwd = stripslashes($pwd);
  $user = mysqli_real_escape_string($db, $user);
  $pwd = mysqli_real_escape_string($db, $pwd);
  $row = mysqli_query($db, "SELECT * FROM `user` WHERE `user` = '$user'");
  if (mysqli_num_rows($row)) {
    $arr = mysqli_fetch_array($row);
    if ($arr['password'] == $pwd || password_verify($pwd, $arr['password'])) {
      if ($code == $_SESSION['code']) {
        $token = hash("sha256", $user);
        mysqli_query($db, "UPDATE `user` SET `token`='$token' WHERE `id`='$user'");
        echo "成功";
      } else {
        echo "帳號、密碼或驗證碼錯誤";
      }
    } else {
      echo "帳號、密碼或驗證碼錯誤";
    }
  } else {
    echo "帳號、密碼或驗證碼錯誤";
  }
} else if ($_GET['call'] == 1) {
  $row = mysqli_query($db, "SELECT * FROM `user`");
  while ($arr = mysqli_fetch_array($row)) {
    if (password_needs_rehash($arr[2], PASSWORD_DEFAULT)) {
      $pwd = password_hash($arr[2], PASSWORD_DEFAULT);
      mysqli_query($db, "UPDATE `user` SET `password`='$pwd' WHERE `id`='$arr[0]'");
    }
  }
}
