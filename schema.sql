
DROP TABLE IF EXISTS location_search;

CREATE TABLE location_search(
    Id SERIAL PRIMARY KEY,
    search_query VARCHAR(255),
    formatted_query VARCHAR(255),
    latitude NUMERIC(10,7),
    longitude NUMERIC(10, 7)
);