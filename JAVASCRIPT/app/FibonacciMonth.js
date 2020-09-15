export class FibonacciMonth {

    /**
     * Retorna la opción a seleccionar
     *
     * @return title
     */
    index(){
        this.title = "Se encuentre entre el timestamp del inicio y fin del mes actual";
        return this.title;
    }

    /**
     * Ejecuta el proceso seleccionado
     *
     * @return void
     */
    process(){
        echo = "Selected process current MONTH \n";
        this.startDate = date("Y-m-01 H:i:s");
        this.endDate = date("Y-m-t H:i:s");
        this.printDates();
        this.runDates();
    }

}

module.export = FibonacciMonth;