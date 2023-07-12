<?php
function disassemble($number, $str)
{
  $text = "";
  for ($i = 2; $i <= sqrt($number); $i++) {
    $count = 0;
    if ($number == 1) {
      break;
    }
    while ($number % $i == 0 && $number != 1) {
      $count++;
      $number /= $i;
    }
    $textt = "";
    if ($count == 0) {
      $textt = "";
    } else if ($count == 1) {
      $textt = "$i";
    } else {
      $textt = "$i^$count";
    }
    $len = strlen($text) - 1;
    if ($text == "") {
      $text .= "$textt";
    } else if ($text[$len] == '*') {
      $text .= "$textt";
    } else {
      $text .= "*$textt";
    }
    // echo $text . "\n";
  }
  $len = strlen($text) - 1;
  if ($number != 1) {
    if ($text == "") {
      $text .= "$number";
    } else if ($text[$len] == '*') {
      $text .= "$number";
    } else {
      $text .= "*$number";
    }
  }
  printf("%s\n", $text);
  $now = microtime(true) - $str;
  echo $now . "\n";
}
$n = (int) fgets(STDIN);
while ($n--) {
  $number = (int) fgets(STDIN);
  $start = microtime(true);
  disassemble($number, $start);
}
