<?php
session_start();
$db = imagecreate(25, 10);
$color1 = imagecolorallocate($db, rand(0, 255), rand(0, 255), rand(0, 255));
$color2 = imagecolorallocate($db, rand(0, 255), rand(0, 255), rand(0, 255));
$s = "ABCDEFGHIJKLMNOPQRSUVWXYZ";
$ss = $s[rand(0, strlen($s))] . $s[rand(0, strlen($s))] . $s[rand(0, strlen($s))] . $s[rand(0, strlen($s))];
$_SESSION['code'] = $ss;
imagestring($db, 1, 2, 2, $ss, $color2);
imagepng($db);
