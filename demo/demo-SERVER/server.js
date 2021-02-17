'use strict';

console.log('this is the server.js connected!');



/*
=========================Servers=================================
A server need to respond to information on the internet. When information is sent on the internet it primarily uses http. HTTP is a way to encode data and send it in a uniform way so that everone can talk. It's like the alhpabet of talking on the interent.

The job of talking over talking http, and especially for http requests is handled by EXpress.
It get translated by express into javascript.

http requests contain a lot of information.
The basics - they are alot like mail.
address - URL
there is a to and a from - route from:client URL.
There can be a letter inside: we can encode information completely hiddent in the response. like a letter in an envelope.
There can also info on the outside of our letter - this represents our queries. - info on the visable URL.
Express reads all of this for us and much more.

====================Environment =====================================
A server needs somewhere to run.
- AWS, Heroku, terminal
- godaddy is a dns server,
The server need to run on a PORT on our local we use 3000, 3001,3333
- heroku - 27000-32000.
There are settings our server has to pay attention to inorder to run.
we will create dynamic variables instead of hard coded ones that our server can read live.

=========================end results =================================
*/

//======Packages that we need to add====================================

const express = require('express');
//implies that express has been loaded via npm.

//the command to download and save it is  npm install -S express

const cors = require('cors');
// - only need this week .
//Cross Origin Resource Sharing: allows connections between 2 local servers or websites. It can block or allow access to any list of urls. By default it allows localhost to talk itself.
//create folder
//add server file
//npm init === package.json and it finds our server file.
// npm install -S cors dotenv express

require('dotenv').config();
//run once and load all the environmental variable. IF they were declared in a file instead the terminal.


// ==== setup the application (server) ====
const app = express();
//create a server from the express library
app.use(cors());
//app.use loads middlewear - we are loading cors so that requests dont get blocked when they are local.

//Global Variable.
const PORT = process.env.PORT || 3111;
//all caps because it is a variable that future dev should not touch.
//magic variable(other things rely on these types of variable.s)



// Routes =============================
// as we type


app.get('/', (request, response) => {
  response.send('You have found the home page! ');
});










// localhost:3000/make-the-pizza?name=Detroit&quantity=3&toppings=pepperoni

// expect a key value pair of name:Detroit and quantity:3 and toppings=pepperoni

// send `Baking Detroit perrperoni Baking Detroit perrperoni Baking Detroit perrperoni`

// this lives with all the client data, in the `request (req)` parameter

// inside request will always live a property
// I need to expect a query: { name: 'Detroit', quantity: '3', toppings: 'pepperoni' },

app.get('/make-the-pizza', (req,res) => {
  //In order to trigger the route the correct path has to be visited. That triggers the call back function.
  res.send('pizza time pizza time');
  // console.log(req);
  // console.log(req.query);
  // console.log(req.query.name);
  // console.log(req.query.quantity);
  // let str = '';
  // // for(let i = 0; i < req.query.quantity; i++){
  // //   res.send(`Baking ${req.query.name} ${req.query.toppings}`);
  // // }
  // for(let i = 0; i < req.query.quantity; i++){
  //   str += `Baking ${req.query.name} ${req.query.toppings} </br>`;
  // }
  // res.send(str);
});





//In the letter anology we have the url on the front of the card.
//we have text on the outside of the envelope.
//for lab we will not be building any URL's today we will hard code gps data back , tomorrow we will read it and log so that we can see the dynamic portion
// any information the the front it will live in req.query. so to choose coordinates or restaurants that we need to react to will live in the query, we are only concerned with the back end side.




///////////
// we will look at the City- Explorer Lite.
// and we are going take this  server and talk to that app.
// we will both apps to heroku.
////////////////////////////////////////////////



//Another example.

// localhost:3000/baked-goods?pie=apple&muffin=blueberry&price=$13.12
app.get('/baked-goods', (req, res) => {
  const pieTheyWant = req.query.pie; //?pie=apple === apple
  const muffin = req.query.muffin; // === 'blueberry';
  const price = req.query.price; // === '$13.12';
  console.log(pieTheyWant, muffin, price);
  res.send(pieTheyWant + muffin + price);
});








app.get('/location', (req,res) => {

  const theDataArrayFromTheLocationJson = require('./data/location.json');

  const theDataObjFromJson = theDataArrayFromTheLocationJson[0];

  // console.log('req.query', req.query);

  const searchedCity = req.query.city;

  const newLocation = new Location(
    searchedCity,
    theDataObjFromJson.display_name,
    theDataObjFromJson.lat,
    theDataObjFromJson.lon
  );


  res.send(newLocation);

});


app.get('/restaurants', (req, res) => {
  const data = require('./data/restaurants.json');
  const arr = [];
  data.nearby_restaurants.forEach(jsonObj => {
    const restaurant = new Restaurant(jsonObj);
    arr.push(restaurant);
  });

  res.send(arr);
});













//helper functions. 

function Location(search_query, formatted_query, latitude, longitude){
  this.search_query = search_query;
  this.formatted_query = formatted_query;
  this.longitude = longitude;
  this.latitude = latitude;
}







function Restaurant(jsonObj){
  this.restaurant = jsonObj.restaurant.name;
  this.locality = jsonObj.restaurant.location.locality_verbose;
  this.cuisines = jsonObj.restaurant.cuisines;
}



// Steps for heroku
// 1 create app
// 2. upload your code to github
// 3. connect github to heroku on heroku
// 4. load the server by clicking deploy branch
// 5. click open app in the top right to get the live url
// 6. paste the url into the front end site and test it (remove the trailing /)





















//====== Start the Server =========/
app.listen(PORT, () => console.log(`we are on PORT ${PORT}`));
//- This is a server being built and now we only need to add the routes.
//- we will deal with the hard coded port in a minute, but this is the end goal in building servers.
//- got to local host 3000 and see the error coming from the express app.
//- Now lets make it better.
