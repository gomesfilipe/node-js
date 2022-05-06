var sumFunc = require('./sum.js')
var subFunc = require('./sub.js')
var multFunc = require('./mult.js')
var divFunc = require('./div.js')

var a = 10 
var b = 5

console.log(a + ' + ' + b + ' = ' + sumFunc(a, b))
console.log(a + ' - ' + b + ' = ' + subFunc(a, b))
console.log(a + ' * ' + b + ' = ' + multFunc(a, b))
console.log(a + ' / ' + b + ' = ' + divFunc(a, b))
