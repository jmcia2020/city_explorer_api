'use strict';

require('dotenv').config();

//Application Dependencies
const express = require('express');

// Application Setup
const PORT = process.env.PORT || 3333;
const app = express();

// Start the Server
app.listen(PORT, () => console.log(`we are on ${PORT}`));
// This is the server being built. Now we need the routes.

// Routes

app.get('/', (request,response) => {
  response.send('Welcome to the Home Page!');
});

// Functions
function Location(search_query, formatted_query, lat, lon) {
    this.search_query = search_query;
    this.formatted_query = formatted_query;
    this.lat = lat;
    this.lon = lon;
}

function Weather(search_query, formatted_query, city_name, lat, lon) {
    this.search_query = search_query;
    this.formatted_query = formatted_query;
    this.city_name = city_name
    this.lat = lat;
    this.lon = lon;
}