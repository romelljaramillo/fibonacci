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

    /* runProcess() {
        return new Promise(resolve => {
            let i;
            let fibo = [];
            for(i=this.numStart; i<=this.numEnd; i+=1){
                if(this.verifyFiboonaci(i)){
                    fibo.push(i);
                    console.log('Fibonacci: ' , i);
                }
            }
            resolve(fibo);
        });
    } */

    runProcess() {
        let i;
        let fibo = [];
        for(i=this.numStart; i<=this.numEnd; i+=1){
            if(this.verifyFiboonaci(i)){
                fibo.push(i);
                console.log('Fibonacci: ' , i);
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
        this.title = 'Se encuentre entre el timestamp del inicio y fin del mes actual';
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
        this.title = 'Se encuentre entre el timestamp del inicio y fin del a�o actual';
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
        this.title = 'Se encuentre entre el timestamp del inicio y fin entre dos fechas atendiendo al formato';
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
  let list = '<option value="2">Select process</option>';
  options.forEach((item, index) => {
    list += '<option value="' + index + '">' + item + '</option>';
  });
  document.getElementById("select-process").innerHTML = list;

}

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

function processForm() {
    // e.preventDefault();
    const option = document.getElementById('select-process').value;
    let dateIni = document.getElementById('date-ini').value;
    let dateEnd = document.getElementById('date-end').value;
    console.log(option);

    if(option == undefined){
        alert('option not valid');
        return;
    }
    
    const obj = fibonacci.process[parseInt(option)];

    if(!obj){
        alert('obj not valid');
        return;
    }
   
    console.log('dateIni ', dateIni);
    console.log('dateEnd ', dateEnd);

    obj.numStart = Date.parse(new Date(dateIni)+" UTC")/1000;
    obj.numEnd = Date.parse(new Date(dateEnd)+" UTC")/1000;

    console.log("numStart: " , obj.numStart);
    console.log("numEnd: " , obj.numEnd);

    let dateFibonaci= '';
    
    preload(true).then(() => {
        //processForm();
        let resp = obj.runProcess();
        if(resp.length > 0) {
            resp.forEach((timestamp,i) => {
                let newTimestamp =  new Date(timestamp*1000);
                let date = formatFecha(newTimestamp);
                console.log(i+ '.- ' + date);
                dateFibonaci += `<tr><td>${timestamp}</td><td>${date}</td></tr>`;
            });
        } else {
            dateFibonaci += `<tr><td>No result</td><td>No result</td></tr>`;
        }
        document.getElementById('fibonacci-table').innerHTML = dateFibonaci;
        preload(false);
    });
    
}

function formatFecha(date) {
    const d = new Date(date);
    let newDate = d.toISOString().slice(0,19);
    newDate = newDate.replace("T"," ", newDate);
    return newDate;
}

async function preload(enable){
    
    if(enable) document.getElementById('fibonacci-preload').style.display = "block";
    if(!enable) document.querySelector("#fibonacci-preload").style.display = "none";    

    let promise = new Promise( resolve => setTimeout(resolve, 100) );
    await promise;
}

document.getElementById('select-process').addEventListener('change', selectOption);
document.getElementById("fibonacci-btn").addEventListener("click", processForm);