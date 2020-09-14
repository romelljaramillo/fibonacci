<?php

require_once realpath("vendor/autoload.php");

date_default_timezone_set('UTC');

if (PHP_SAPI == 'cli'){
    $app = new App\FibonacciCli();
    
    $app->view(new App\FibonacciMonth);
    $app->view(new App\FibonacciYear);
    $list = $app->view(new App\FibonacciInsertDate);
    
    echo $list;
    $app->selectProcess();

    // echo $app->verifyFiboonaci(377);
    // echo date("Y-m-d H:i:s", 267914296);
    // 1975-04-01 10:29:01 fibonacci
    // 1978-06-28 20:38:16 fibonacci
} else {
    echo 'interface web';
    echo 'proximamente';
}
