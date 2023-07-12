<?php
function sameword($word1, $word2)
{
  for ($i = 0; $i < strlen($word1); $i++) {
    $a = $word1;
    $b = $word2;
    $a[$i] = ' ';
    $b[$i] = ' ';
    if ($a == $b) {
      return true;
    }
  }
  return false;
}
$seword = fopen("php://stdin", 'r');
list($start, $end) = fscanf($seword, "%s %s\n");
$wordcount = trim(fgets($seword));
$word = [];
for ($i = 0; $i < $wordcount; $i++) {
  $word[] = trim(fgets($seword));
}
$queue = [];
$visited = [];
$queue[] = [$start, 1];
$answer = null;
while (!empty($queue)) {
  [$thisword, $step] = array_shift($queue);
  $visited[] = $thisword;
  if ($thisword == $end) {
    $answer = $step;
    break;
  }
  foreach ($word as $key => $val) {
    if (!in_array($val, $visited)  && $thisword != $val) {
      if (sameword($thisword, $val)) {
        $queue[] = [$val, $step + 1];
      }
    }
  }
  echo "queue:";
  print_r($queue);
  echo PHP_EOL;
  echo "visited:";
  print_r($visited);
  echo PHP_EOL;
}
if ($answer == null) {
  echo "0";
} else {
  echo $answer;
}
