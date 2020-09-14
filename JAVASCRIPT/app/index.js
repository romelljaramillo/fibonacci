// var fibonacci = require("./Fibonacci");
// var fibonacciMonth = require("./FibonacciMont");

var fibonacci = require("./Fibonacci");
var fibonacciMonth = require("./FibonacciMonth");

// console.log(fibonacciMonth);
app = new fibonacci(fibonacciMonth.index());
console.log(app);