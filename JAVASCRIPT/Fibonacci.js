"use strict";
class Fibonacci {
    idProcess = 0;
    process = [];
    numStart;
    numEnd;
    title;
    inputDate = true;

    constructor() {
    }

    setProcess(obj = {}) {
        this.process.push(obj);
    }

    view(){
        let listProcess = [];
        this.process.forEach((item, index)=> {
            listProcess.push(item.index());
        });
        return listProcess;
    }

    runProcess() {
        let i;
        let fibo = [];
        // console.log(this.numStart);
        // console.log(this.numEnd);

        for(i=this.numStart; i<=this.numEnd; i+=86400){
            // console.log(i);

            if(this.verifyFiboonaci(i)){
                fibo.push(i);
                console.log(i);
            }
        }

        return fibo;
    }


    verifyFiboonaci(numero) {
        let a = -1;
        let b = 1;
        let fibo = 0;
        
        do {
            fibo = a + b;
            a = b; 
            b = fibo; 
        } 
        while (fibo < numero); 
        
        if(fibo != numero){
            return false;
        }
    
        return true;
    }
}

class FibonacciMonth extends Fibonacci {
    index(){
        this.title = 'Fibonacci Month';
        return this.title;
    }

    getDate(){
        var date = new Date();
        this.numStart = new Date(date.getFullYear(), date.getMonth(), 1, date.getHours(), date.getMinutes(), date.getSeconds());
        this.numEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, date.getHours(), date.getMinutes(), date.getSeconds());
        this.inputDate = false;
    }

}

class FibonacciYear extends Fibonacci {
    index(){
        this.title = 'Fibonacci Year';
        return this.title;
    }
    
    getDate(){
        var date = new Date();
        this.numStart = new Date(date.getFullYear(), 0, 1, date.getHours(), date.getMinutes(), date.getSeconds());
        this.numEnd = new Date(date.getFullYear(), 12, 0, date.getHours(), date.getMinutes(), date.getSeconds());
        this.inputDate = false;
    }
}

class FibonacciInsertDate extends Fibonacci {
    index(){
        this.title = 'Fibonacci insert date';
        return this.title;
    }
    
    getDate(){
        var date = new Date();
        this.numStart = date;
        this.numEnd = date;
    }
}


const fibonacciMonth = new FibonacciMonth();
const fibonacciYear = new FibonacciYear();
const fibonacciInsertDate = new FibonacciInsertDate();

const fibonacci = new Fibonacci();

fibonacci.setProcess(fibonacciMonth);
fibonacci.setProcess(fibonacciYear);
fibonacci.setProcess(fibonacciInsertDate);

const options = fibonacci.view();
console.log(options);

cargaCombo();

function cargaCombo() {
  let list = '<option value="2">Select</option>';
  options.forEach((item, index) => {
    list += '<option value=" ' + index + ' ">' + item + '</option>';
  });
  document.getElementById("select-process").innerHTML = list;

}

document.getElementById('select-process').addEventListener('change', selectOption);


function selectOption() {
    var option = document.getElementById("select-process").value;
    
    console.log('elemento seleccionado: ' + option);
    console.log(fibonacci.process[parseInt(option)]);

    var obj = fibonacci.process[parseInt(option)];

    obj.getDate();

    console.log(obj.numStart);
    console.log(obj.numEnd);

    var dateIni = new Date(obj.numStart.getTime() - (obj.numStart.getTimezoneOffset() * 60000)).toISOString();
    var dateaEnd = new Date(obj.numEnd.getTime() - (obj.numEnd.getTimezoneOffset() * 60000)).toISOString();

    console.log(dateIni);
    console.log(dateaEnd);

    document.getElementById('date-ini').value = dateIni.slice(0,19);
    document.getElementById('date-end').value = dateaEnd.slice(0,19);

    console.log('inputDate ', obj.inputDate);
    
    if(!obj.inputDate){
        document.getElementById('date-ini').disabled = true;
        document.getElementById('date-end').disabled = true;
    } else {
        document.getElementById('date-ini').disabled = false;
        document.getElementById('date-end').disabled = false;
    }

}

document.getElementById("fibonacci-btn").addEventListener("click", processForm);
    
function processForm(e) {
    const option = document.getElementById('select-process').value;
    const dateIni = document.getElementById('date-ini').value;
    const dateEnd = document.getElementById('date-end').value;
    console.log(option);

    if(option == undefined){
        alert('option not valid');
        return;
    }
    const obj = fibonacci.process[parseInt(option)];
    // console.log(obj);

    if(!obj){
        alert('obj not valid');
        return;
    }
    var date = new Date(dateIni);
    var unixTimeStamp = Math.round(date.getTime() / 1000);


    console.log('UNIX ', unixTimeStamp);


    obj.numStart = new Date(dateIni).getTime();
    obj.numEnd = new Date(dateEnd).getTime();

    // console.log(obj.numStart);
    // console.log(obj.numEnd);

    // obj.numStart = new Date(obj.numStart);
    // obj.numEnd = new Date(obj.numEnd);

    // console.log(obj.numStart);
    // console.log(obj.numEnd);

    // 04-01-1975 10:29:01 = 158059741000 = fibonacci
    // 28-06-1978 20:38:16 = 267907096000 = fibonacci
    const resul = obj.verifyFiboonaci(obj.numStart);
    // const resul = obj.runProcess();
    
    console.log(resul);

    

    // addContent(option);
    document.getElementById('fibonacci-resul').innerHTML = `
        <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Select</strong>: ${option} -
                    <strong>Price</strong>: ${dateIni} - 
                    <strong>Year</strong>: ${dateEnd}
                    <a href="#" class="btn btn-danger" name="delete">Reset</a>
                </div>
            </div>
        `;

    e.preventDefault();
}