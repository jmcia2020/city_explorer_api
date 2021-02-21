'use strict';

require('dotenv').config();

//Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

// Application Setup
const PORT = process.env.PORT || 3333;
const app = express();
app.use(cors()); //Middleware


// Start the Server
app.listen(PORT, () => console.log(`we are on ${PORT}`));
// This is the server being built. Now we need the routes.


// Routes

app.get('/', (request, response) => {
  response.send('Welcome to the Home Page!');
});

app.get('/location', locationHandler);

function locationHandler(request, response) {
  const url = 'https://us1.locationiq.com/v1/search.php';
  const city = request.query.city;
  superagent.get(url)
    .query({
      key: process.env.GEO_KEY,
      q: city,
      format: 'json'
    })
    .then(locationResponse => {
      let locationData = locationResponse.body;
      console.log(locationResponse.body);

      const locationResult = new Location(city, locationData);
      response.send(locationResult);
    })
    .catch(err => {
      console.log(err);
      errorHandler(err, request, response);
    });
}

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const lat = request.query.latitude;
  const lon = request.query.longitude;
  // console.log(request[0].lon);
  const url = 'http://api.weatherbit.io/v2.0/forecast/daily';
  superagent.get(url)
    .query({
      key: process.env.WEATHER_KEY,
      lat: lat,
      lon: lon,
    })
    .then(weatherResponse => {
      let weatherData = weatherResponse.body;
      console.log(weatherResponse.body);

      const forecast = weatherData.data.map(dailyWeather => {
        return new Weather(dailyWeather);
      });
      response.send(forecast);
      console.log(forecast);
    }).catch(err => {
      console.log(err);
      errorHandler(err, request, response);
    });
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