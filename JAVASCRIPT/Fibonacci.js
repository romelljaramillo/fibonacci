// "use strict";
class Fibonacci {
    idProcess = 0;
    process = [];
    startDate;
    endDate;
    title;

    constructor() {
    }

    setProcess(obj = {}) {
        this.process.push(obj);
    }

    view(){
        console.log(this.process);

        let listProcess = '';
        this.process.forEach((item, index)=> {
            console.log(index + ".- " + item.index());
            listProcess += index + ". - " + item.index() + "</br>";
        });
        
        return listProcess;
    }
}

class FibonacciMonth extends Fibonacci {
    // constructor(){
    // }

    index(){
        this.title = 'Fibonacci Month';
        return this.title;
    }
}

class FibonacciYear extends Fibonacci {
    // constructor(){
        // super();
        // // this.title = 'Fibonacci Year';
    // }

    index(){
        this.title = 'Fibonacci Year';
        return this.title;
    }
}

const fibonacciMonth = new FibonacciMonth();
const fibonacciYear = new FibonacciYear();

// console.log(fibonacciMonth);

const fibonacci = new Fibonacci();
fibonacci.setProcess(fibonacciMonth);
fibonacci.setProcess(fibonacciYear);

const view = fibonacci.view();
console.log(view);
// console.log(fibonacci);