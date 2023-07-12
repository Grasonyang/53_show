<?php
$number = (int) fgets(STDIN);
$arr = [0, 1];
for ($i = 2; $i <= $number; $i++) {
  $arr[$i] = $arr[$i - 1] + $arr[$i - 2];
}
echo sprintf("%d\n", $arr[$number]);
