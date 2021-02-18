'use strict';

require('dotenv').config();

//Application Dependencies
const express = require('express');
const cors = require('cors');

// Application Setup
const PORT = process.env.PORT || 3333;
const app = express();

app.use(cors()); //Middleware
app.use(errorHandler);

// Start the Server
app.listen(PORT, () => console.log(`we are on ${PORT}`));
// This is the server being built. Now we need the routes.

// Routes

app.get('/', (request,response) => {
  response.send('Welcome to the Home Page!');
});

app.get('/location', (request, response) => {
  response.send(new Location('Atlanta', 'Atlanta, GA, USA', '17.3', '-120'));
});

app.get('/bad', (request, response) => {
  throw new Error('Yikes, that is not good!');
});

// Functions
function Location(search_query, formatted_query, lat, lon) {
  this.search_query = search_query;
  this.formatted_query = formatted_query;
  this.latitude = lat;
  this.longitude = lon;
}

function Weather(search_query, formatted_query, city_name, lat, lon) {
    this.search_query = search_query;
    this.formatted_query = formatted_query;
    this.city_name = city_name
    this.lat = lat;
    this.lon = lon;
}

function errorHandler(error, request, response, next) {
  response.json({
    error: true,
    message: error.message,
  });
}
