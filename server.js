'use strict';

require('dotenv').config();

//Application Dependencies
const express = require('express');
const cors = require('cors');

// Application Setup
const PORT = process.env.PORT || 3333;
const app = express();
app.use(cors()); //Middleware


// Start the Server
app.listen(PORT, () => console.log(`we are on ${PORT}`));
// This is the server being built. Now we need the routes.


// Routes


// How to use SuperAgent to make a request:
// https://learn.vonage.com/blog/2020/09/23/5-ways-to-make-http-requests-in-node-js-2020-edition/#super-agent

// const superagent = require('superagent');

// (async () => {
//   try {
//     const queryArguments = {
//       api_key: 'MY_KEY'
//     }

//     const response = await superagent.get('https://the-one-api.dev/v2/book').query(queryArguments)
//     console.log(response.body.name);
//   } catch (error) {
//     console.log(error.response.body);
//   }
// })();

app.get('/', (request, response) => {
  response.send('Welcome to the Home Page!');
});

app.get('/location', locationHandler);

function locationHandler(request, response) {
  const locationData = require('./json/location.json');
  const city = request.query.city;
  const locationResult = new Location(city, locationData);
  response.send(locationResult);
  console.log(locationResult);
}


app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const weatherData = require('./json/weather.json');
  const forecast = weatherData.data.map(dailyWeather => {
    return new Weather(dailyWeather);
  });
  response.send(forecast);
  console.log(forecast);
}

// app.get('/bad', (request, response) => {
//   throw new Error('Yikes, that is not good!');
// });

// Has to happen after the error may have occurred
app.use(notFoundHandler);
app.use(errorHandler);


// Functions
function Location(searchQuery, locationObject) {
  this.search_query = searchQuery;
  this.formatted_query = locationObject[0].formatted_query;
  this.latitude = locationObject[0].lat;
  this.longitude = locationObject[0].lon;
}

function Weather(weatherData) {
  this.forecast = weatherData.weather.description;
  this.time = weatherData.valid_date;
}

// Can design if change from .json to a 404 (html) page
function errorHandler(error, request, response, next) {
  console.log(error);
  response.status(500).json({
    error: true,
    message: error.message,
  });
}

function notFoundHandler(request, response) {
  response.status(404).json({
    notFound: true,
  });
}