<?php

namespace App;

class FibonacciYear extends FibonacciCli implements FibonacciInterface {

    /**
     * Retorna la opción a seleccionar
     *
     * @return title
     */
    public function index(){
        $this->title = "Se encuentre entre el timestamp del inicio y fin del año actual";
        return  $this->title;
    }
    
    /**
     * Ejecuta el proceso seleccionado
     *
     * @return void
     */
    public function process(){
        echo "Selected process current YEAR \n";
        $this->startDate = date("Y-01-01 H:i:s");
        $this->endDate = date("Y-12-t H:i:s");
        $this->printDates();
        $this->runDates();
    }

}