<?php
$number = fgets(STDIN);
$number = trim($number);
$numbers = explode(' ', $number);
$answer = 0;
foreach ($numbers as $key => $value) {
  $answer += $value;
}
echo $answer;
echo PHP_EOL;
