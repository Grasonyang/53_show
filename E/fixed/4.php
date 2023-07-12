<?php
function distance($V0, $V, $A)
{
  if ($A == 1) {
    $dd = 0;
    for ($i = 0; $i < count($V0); $i++) {
      $dd += pow($V[$i] - $V0[$i], 2);
    }
    $dd = sqrt($dd);
    return $dd;
  } else {
    $dd = 0;
    for ($i = 0; $i < count($V0); $i++) {
      if ($V[$i] != $V0[$i]) {
        $dd++;
      }
    }
    return $dd;
  }
}
$stdin = fopen('php://stdin', 'r');
list($N, $L) = fscanf($stdin, "%d %d\n");
$V0 = array_map('intval', explode(' ', trim(fgets($stdin))));
$A = intval(trim(fgets(STDIN)));
$ans;
$d = PHP_INT_MAX;
while ($N--) {
  $V = array_map('intval', explode(' ', trim(fgets($stdin))));
  $d1 = distance($V0, $V, $A);
  // echo $d;
  // echo PHP_EOL;
  // echo $d1;
  // echo PHP_EOL;
  if ($d1 < $d) {
    $ans = $V;
    $d = $d1;
  }
}
echo implode(' ', $ans);
