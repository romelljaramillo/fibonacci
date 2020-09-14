"use strict";
/**
 * Classe principal de busqueda número de fibonacci
 * Mediante CLI
 */

class Fibonacci {
    /* idProcess = 0;
    process = [];
    startDate;
    endDate;
    title; */

    /**
     * Muestra la lista de opciones a seleccionar
     *
     * @param FibonacciInterface output
     * @return string
     */
    constructor(output) {
        console.log(output.index());
        
        // this.process.push(output);

        // out = "---------------------------------</br>";
        // out += "- Seleccione proceso a ejecutar -</br>";
        // out += "---------------------------------</br>"; 

        // listProcess = '';
        // this.process.forEach((value, index)=> {
        //     listProcess += index + ". - ". value.index() + "</br>";
        // })
        
        // return out.listProcess;
    }

    /**
     * Permite seleccionar un elemento de la lista
     * Valida el valor introducido
     * Ejecuta el proceso perteneciente al valos seleccionado
     *
     * @return void
     */
    selectProcess()
    {
        this.idProcess = trim(fgets(STDIN));
        
        echo =  "The selected option: this.idProcess </br>";
        
        cont = 0;
        
        while(!this.validateSelectProcess(this.idProcess)){
            if(cont == 2){
                echo =  "you have exceeded the number of attempts thanks </br>";
                exit;
            }
            this.idProcess = trim(fgets(STDIN));
            cont++;
        }

        this.process[this.idProcess].process();
    }

    /**
     * Valida el valor introducido 
     * si es numérico y si hay un proceso a ejecutar
     *
     * @param [type] idProcess
     * @return boolean
     */
    validateSelectProcess(idProcess)
    {
        if(!is_numeric(idProcess)){
            echo =  "The entered value is not correct, please try again </br>";
            return false;
        }
        
        if(!in_array(+idProcess, array_keys (this.process), true)) {
            echo =  "the value is not in the list, try again </br>";
            return false;
        }

        return true;
    }

    /**
     * Recibe los datos introducidos por CLI
     *
     * @return string | exit
     */
    enterDate()
    {
        date = trim(fgets(STDIN));
        cont = 0;

        while (!this.validatedateFormat(date))
        {
            if(cont == 2){
                echo =  "you have exceeded the number of attempts thanks </br>";
                exit;
            }
            date = trim(fgets(STDIN));
            cont++;
        }

        return date;
    }

    /**
     * Imprime en CLI las fechas a evaluar
     *
     * @return void
     */
    printDates()
    {
        echo =  'date START: ' + this.startDate + "</br>";
        echo =  'date END: ' + this.endDate + "</br>";
    }

    /**
     * Recorre el rango de fechas
     *
     * @return void
     */
    runDates()
    {
        ini=strtotime(this.startDate);
        end=strtotime(this.endDate);

        for(i=ini; i<=end; i+=86400){
            fibonacci = 'NO';
            if(this.verifyFiboonaci(i)){
                fibonacci = 'Fibonacci';
            }
            echo =  i + " - " . date("Y-m-d H:i:s", i) + " - " .fibonacci + "</br>";
        }
    }

    /**
     * Verifica si el numero pertenece a la serie de Fibonacci
     *
     * @param integer numero
     * @return boolean 
     */
    verifyFiboonaci(numero) {
        a = -1;
        b = 1;
        fibo = 0;
        // echo =  "Numero a comprobar numero </br></br>";
        
        do {
            fibo = a + b;
            a = b; 
            b = fibo; 
            // echo =  "comprobando fibo </br></br>";
        } 
        while (fibo < numero); 
        
        if(fibo != numero){
            return false;
        }
    
        return true;
    }
    
    /**
     * Valida el formato de la fecha introducida
     *
     * @param string date
     * @return boolean
     */
    validatedateFormat(date)
    {
        regexDate = '/^(\d{4})(\/|-)(0[1-9]|1[0-2])\2([0-2][0-9]|3[0-1])(\s)([0-1][0-9]|2[0-3])(:)([0-5][0-9])(:)([0-5][0-9])/';

        if (!preg_match(regexDate, date, matchDate) ) {
            echo =  "The date format is not correct " . date . "</br>";
            echo =  "the format Y-m-d H:i:s </br>";
            return false;
        }

        // print_r(matchDate);
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
        dateFormat = date("Y-m-d H:i:s", strtotime(date));
        // echo =  "la fecha formateada es: " . dateFormat . "</br>";

        if(date != dateFormat){
            echo =  "The date is not correct " . date . "</br>";
            return false;
        }
        
        return true;
    }
}

module.export = Fibonacci;