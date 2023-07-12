<?php
$s = trim(fgets(STDIN));
$s = explode(' ', $s);
$optr = [
  '*' => 2,
  '/' => 2,
  '+' => 1,
  '-' => 1,
];
$stack = array();
$numbers = array();
for ($i = 0; $i < count($s); $i++) {
  if (is_numeric($s[$i])) {
    $numbers[] = $s[$i];
  } else if ($s[$i] == '(') {
    $stack[] = $s[$i];
  } else if ($s[$i] == ')') {
    while (!empty($stack) && end($stack) != '(') {
      $numbers[] = array_pop($stack);
    }
    array_pop($stack);
  } else {
    while (!empty($stack) && end($stack) != '(' && $optr[$s[$i]] <= $optr[end($stack)]) {
      $numbers[] = array_pop($stack);
    }
    $stack[] = $s[$i];
  }
}
while (!empty($stack)) {
  $numbers[] = array_pop($stack);
}
foreach ($numbers as $token) {
  if (is_numeric($token)) {
    $stack[] = intval($token);
  } else {
    $num1 = array_pop($stack);
    $num2 = array_pop($stack);
    switch ($token) {
      case '+':
        $result = $num2 + $num1;
        break;
      case '-':
        $result = $num2 - $num1;
        break;
      case '*':
        $result = $num2 * $num1;
        break;
      case '/':
        $result = $num2 / $num1;
        break;
    }
    $stack[] = $result;
  }
}
echo implode(' ', $numbers) . "\n";
echo $stack[0];
