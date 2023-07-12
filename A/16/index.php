<?php
if (isset($_GET['factor'])) {
  function modd($n)
  {
    if ($n % $_GET['factor'] == 0) {
      $nn = $n - 1;
      echo "<pre>    [$nn] => $n is a mutiple of $_GET[factor]**</pre>";
    } else {
      $nn = $n - 1;
      echo "<pre>    [$nn] => $n</pre>";
    }
  }
  $arr = range(1, 40);
  echo "<h2>Modified Array</h2>(";
  array_map("modd", $arr);
  echo ")";
}
