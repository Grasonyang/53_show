<?php
$n = fgets(STDIN);
$array = array();
for ($i = 0; $i < $n; $i++) {
  $td = fgets(STDIN);
  $array[] = $td;
}
$maxx = max($array);
echo $maxx;
