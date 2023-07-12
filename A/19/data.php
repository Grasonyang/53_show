<?php
if ($_GET['call'] == 0) {
  $data = explode(',', $_POST['data']);
  $file = "";
  if (count($data) == 1) {
    $file = $data[0];
  } else {
    $file = $data[1];
  }
  if (!file_exists("src/img")) {
    mkdir("src/img");
  }
  $dataname = "src/img/" . "img" . uniqid() . ".png";
  $data = base64_decode($file);
  file_put_contents($dataname, $data);
}
