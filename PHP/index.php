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

} else {
    echo 'interface web';
    echo 'proximamente';
}
