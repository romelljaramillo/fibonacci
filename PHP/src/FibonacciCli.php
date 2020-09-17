<?php
/**
 * Classe principal de busqueda número de fibonacci
 * Mediante CLI
 */
namespace App;

class FibonacciCli {

    public $idProcess = 0;
    private $process;
    public $startDate;
    public $endDate;
    public $title;

    /**
     * Muestra la lista de opciones a seleccionar
     *
     * @param FibonacciInterface $output
     * @return string
     */
    public function view(FibonacciInterface $output) {
        
        $this->process[] = $output;

        $out = "---------------------------------\n";
        $out .= "- Seleccione proceso a ejecutar -\n";
        $out .= "---------------------------------\n"; 

        $listProcess = '';
        $i = 0;
        foreach ($this->process as $value) {
            $listProcess .= $i . ". - ". $value->index() . "\n";
            $i++;
        }
        
        return $out.$listProcess;
    }

    /**
     * Permite seleccionar un elemento de la lista
     * Valida el valor introducido
     * Ejecuta el proceso perteneciente al valos seleccionado
     *
     * @return void
     */
    public function selectProcess()
    {
        $this->idProcess = trim(fgets(STDIN));
        
        echo "The selected option: $this->idProcess \n";
        
        $cont = 0;
        
        while(!$this->validateSelectProcess($this->idProcess)){
            if($cont == 2){
                echo "you have exceeded the number of attempts thanks \n";
                exit;
            }
            $this->idProcess = trim(fgets(STDIN));
            $cont++;
        }

        $this->process[$this->idProcess]->process();
    }

    /**
     * Valida el valor introducido 
     * si es numérico y si hay un proceso a ejecutar
     *
     * @param [type] $idProcess
     * @return boolean
     */
    public function validateSelectProcess($idProcess)
    {
        if(!is_numeric($idProcess)){
            echo "The entered value is not correct, please try again \n";
            return false;
        }
        
        if(!in_array((int)$idProcess, array_keys ($this->process), true)) {
            echo "the value is not in the list, try again \n";
            return false;
        }

        return true;
    }

    /**
     * Recibe los datos introducidos por CLI
     *
     * @return string | exit
     */
    public function enterDate()
    {
        $date = trim(fgets(STDIN));
        $cont = 0;

        while (!$this->validatedateFormat($date))
        {
            if($cont == 2){
                echo "you have exceeded the number of attempts thanks \n";
                exit;
            }
            $date = trim(fgets(STDIN));
            $cont++;
        }

        return $date;
    }

    /**
     * Imprime en CLI las fechas a evaluar
     *
     * @return void
     */
    public function printDates()
    {
        echo 'date START: ' . $this->startDate . "\n";
        echo 'date END: ' . $this->endDate . "\n";
    }

    /**
     * Recorre el rango de fechas
     *
     * @return void
     */
    public function runDates()
    {
        $ini=strtotime($this->startDate);
        $end=strtotime($this->endDate);

        for($i=$ini; $i<=$end; $i+=1){
            $fibonacci = 'NO';
            if($this->verifyFiboonaci($i)){
                $fibonacci = 'Fibonacci';
                echo $i . " - " . date("Y-m-d H:i:s", $i). " - " .$fibonacci . "\n";
            }
        }
    }

    /**
     * Verifica si el numero pertenece a la serie de Fibonacci
     *
     * @param integer $numero
     * @return boolean 
     */
    public function verifyFiboonaci(int $numero) {
        $a = -1;
        $b = 1;
        $fibo = 0;
        // echo "Numero a comprobar $numero \n\n";
        
        do {
            $fibo = $a + $b;
            $a = $b; 
            $b = $fibo; 
            // echo "comprobando $fibo \n\n";
        } 
        while ($fibo < $numero); 
        
        if($fibo != $numero){
            return false;
        }
    
        return true;
    }
    
    /**
     * Valida el formato de la fecha introducida
     *
     * @param string $date
     * @return boolean
     */
    public function validatedateFormat(string $date)
    {
        $regexDate = '/^(\d{4})(\/|-)(0[1-9]|1[0-2])\2([0-2][0-9]|3[0-1])(\s)([0-1][0-9]|2[0-3])(:)([0-5][0-9])(:)([0-5][0-9])$/';

        if (!preg_match($regexDate, $date, $matchDate) ) {
            echo "The date format is not correct " . $date . "\n";
            echo "the format Y-m-d H:i:s \n";
            return false;
        }

        // print_r($matchDate);
        /*
            array:9 [
                0 => "2020-09-11 11:08:00"
                1 => "27"
                2 => "-"
                3 => "05"
                4 => "2017"
                5 => " "
                6 => "23"
                7 => ":"
                8 => "00"
            ]
        */
        $dateFormat = date("Y-m-d H:i:s", strtotime($date));
        // echo "la fecha formateada es: " . $dateFormat . "\n";

        if($date != $dateFormat){
            echo "The date is not correct " . $date . "\n";
            return false;
        }
        
        return true;
    }
}