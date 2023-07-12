<?php

$n = fgets(STDIN);
$array = array();
$answer = array();
for ($i = 0; $i < $n; $i++) {
  $td = fgets(STDIN);
  if (isPrime($td)) {
    printf("Y\n");
  } else {
    printf("N\n");
  }
}

function isPrime($num): bool
{
  if ($num < 2) {
    return false;
  } else {
    for ($j = 2; $j <= sqrt($num); $j++) {
      if ($num % $j == 0) {
        return false;
      }
    }
    return true;
  }
}
// foreach ($answer as $key => $value) {
//   echo sprintf("%s\n", $value);
// }
