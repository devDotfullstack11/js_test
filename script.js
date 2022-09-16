"use strict";
let str = "Hello Maninder, nice to meet you maninder, how are you today maninder? ";
let removeSpecialChars = str.replace(",","").replace("?","");
//console.log(str.indexOf("maninder",15));
console.log(removeSpecialChars.split(" "));

let arr = [4,7,2,3,9];
let arr1 = arr.slice(0,2);
let arr2 = arr.slice(2);
console.log(arr1,arr2);

const user = {
};

Object.defineProperties(user, {
  name: {
    value: "maninder",
    writable: false
  },
  age: {
    value: 34,
    writable: false
  },
  gender: {
    value: "Male",
    writable: false
  }
});

//user.age =35; // Will Produce Error
console.log("user",user.name,user.age,user.gender);
/* 
* Initialize Date to Midnight time
*/

var currentDate = new Date();
currentDate.setUTCHours(0,0,0,0); // UTC DATE
console.log("currentDate Midnight Time =>",currentDate);









