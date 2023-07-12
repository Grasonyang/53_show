<?php
$money = intval(fgets(STDIN));
$moneytype = [1, 5, 10, 50];
$moneys = [0, 0, 0, 0];
$moneycount = [];
$moneycount[0] = 0;
for ($i = 1; $i <= $money; $i++) {
  if (!isset($moneycount[$i])) {
    $moneycount[$i] = PHP_INT_MAX;
  }
  for ($j = 0; $j < count($moneytype); $j++) {
    if ($i >= $moneytype[$j]) {
      // echo "$i $moneytype[$j]\n";
      $moneycount[$i] = min($moneycount[$i], $moneycount[$i - $moneytype[$j]] + 1);
    } else {
      break;
    }
  }
}
for ($i = count($moneytype) - 1; $i >= 0; $i--) {
  while ($money > 0 && $money >= $moneytype[$i] && $moneycount[$money - $moneytype[$i]] + 1 == $moneycount[$money]) {
    $moneys[$i] += 1;
    $money -= $moneytype[$i];
  }
}
$countt = 0;
for ($i = 0; $i < count($moneys); $i++) {
  $countt += $moneys[$i];
  printf("%d %d\n", $moneytype[$i], $moneys[$i]);
}
printf("%d", $countt);
