<?php
function countt($array, &$winner)
{
  if (count($array) == 1 && $array[0] != "-") {
    if (!in_array($array[0], $winner)) {
      $winner[] = $array[0];
    }
  }
}
$number = (int) fgets(STDIN);
$data_row = [];
$data_col = [];
$data_slh = [[], []];
$winner = [];
for ($i = 0; $i < $number; $i++) {
  $data_row[] = str_split(trim(fgets(STDIN)));
}
for ($i = 0; $i < $number; $i++) {
  $data_col[] = array_column($data_row, $i);
  array_push($data_slh['0'], $data_row[$i][$i]);
  array_push($data_slh['1'], $data_row[$i][$number - $i - 1]);
}
for ($i = 0; $i < $number; $i++) {
  $array1 = array_unique($data_row[$i]);
  $array2 = array_unique($data_col[$i]);
  countt($array1, $winner);
  countt($array2, $winner);
}
countt(array_unique($data_slh[0]), $winner);
countt(array_unique($data_slh[1]), $winner);
if (count($winner) == 1) {
  echo sprintf("%s", $winner[0]);
} else {
  echo "?";
}
// print_r(array_count_values($data_slh[0]));
// print_r(array_count_values($data_slh[1]));
