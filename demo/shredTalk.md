```js


//Object iteration 

const cohort ={
bob : {name: 'Bob', backGroundColor: 'red'},
larry : {name: 'Larry', backGroundColor:'blue'},
gerry : {name: 'Gerry', backGroundColor: 'green'},
garry : {name: 'Garry', backGroundColor: 'yellow'}
};
// for(let i in arr) iterate i throug every key of the object
 
// for(let i in cohort){
//   console.log(i);
//   console.log(cohort[i]);
// }


//Today we will use two methods. 

//1. Object.keys(object);

// console.log(Object.keys(cohort));


//we could then 
const keyArr = Object.keys(cohort);

keyArr.forEach(studentKey => console.log('hello ' + studentKey));




// keyArr.forEach(studentKey => console.log(cohort[studentKey]));

keyArr.forEach(studentKey => {
// console.log(cohort[studentKey])
});





console.log(Object.values(cohort));
//is an array of values 


Object.values(cohort).forEach(student => {
  console.log(student.backGroundColor);
});


//Object.values(object); puts the values into another array. takes each entry in an object, then entry is the key and the value and puts it in an array of arrays. 
console.log(Object.entries(cohort));

Object.entries(cohort).forEach(minArr => {
  if(/^[a-g]/.test(minArr[0])){
    console.log(minArr[1].backGroundColor);
  }
});

//in lab you will be asked to use these methods to get the job done today. 


```