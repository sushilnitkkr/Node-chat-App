//timestamp
//npm i moment --save
const moment = require('moment');
// var date = new Date();
// var months = ['Jan','Feb']
// console.log(date);
var date = moment();
console.log(date.format(' Do MMM YYYY'));
console.log(date.format('h:mm a'));
