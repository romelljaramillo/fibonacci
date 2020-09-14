<?php

namespace App;

class FibonacciInsertDate extends FibonacciCli implements FibonacciInterface {

    /**
     * Retorna la opción a seleccionar
     *
     * @return title
     */
    public function index(){
        $this->title = "Se encuentre entre el timestamp del inicio y fin entre dos fechas atendiendo al formato Y-m-d H:i:s";
        return $this->title;
    }

    /**
     * Ejecuta el proceso seleccionado
     *
     * @return void
     */
    public function process(){
        echo "Selected process current INSERT DATE \n";
        echo "Enter the FIRST DATE in the format Y-m-d H:i:s \n";
        $this->startDate = $this->enterDate();

        echo "---------------------------- \n";
        echo "Enter the SECOND DATE in the format Y-m-d H:i:s \n";
        $this->endDate = $this->enterDate();
        $this->printDates();
        $this->runDates();
    }

}