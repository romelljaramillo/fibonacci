
<?php


// date_default_timezone_set('UTC');

// echo $app->verifyFiboonaci(377);   
    
// $date = date("1975-04-01 10:29:01");
// echo strtotime($date);
// echo date("Y-m-d H:i:s", 165580141);
// 1975-04-01 10:29:01 - 165580141 - fibonacci

// $date = date("1978-06-28 20:38:16");
// echo strtotime($date);
// echo date("Y-m-d H:i:s", 267914296);
// 1978-06-28 20:38:16 - 267914296 - fibonacci


// $date = date("1975-04-01 10:29:01");
// $date = strtotime($date);
// echo $date . "\n";
// echo date("Y-m-d H:i:s", $date);


$fecha = new DateTime();
echo $fecha->getTimestamp();