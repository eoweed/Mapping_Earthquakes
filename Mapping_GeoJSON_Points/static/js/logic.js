// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.5, -122.5], 10);

// Create the tile layer that will be the background of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);


// -------------------------------------------------
// ------------ Mapping Multiple Points ------------
// -------------------------------------------------

// //Create variable to reference cities.js
// var citiesData = cities

// citiesData.forEach(function(city) {
//     console.log("city: ", city);
//     L.circleMarker(city.location, {
//         radius: city.population/100000
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population: " + city.population.toLocaleString() + "</h3>")
//     .addTo(map);
// })



// -------------------------------------------------
// ------------ Mapping GeoJSON Points ------------
// -------------------------------------------------

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
    "geometry":{
        "type":"Point",
        "coordinates":[-122.375,37.61899948120117]}}
        // NOTE: coordinates are in reverse order!!
        // NEED TO BE IN THE FORM OF (x,y) OR (longitude, latitude)
]};


// // Add geoJSON layer with L.geoJSON()
// L.geoJSON(sanFranAirport).addTo(map);


// // Use pointToLayer function to edit markers
// L.geoJson(sanFranAirport, {
//     // turn each feature into a marker
//     pointToLayer: function(feature, latlng) {
//         console.log("feature", feature)
//         return L.marker(latlng).bindPopup(feature.properties.city)
//     }
// }).addTo(map);

// Use onEachFeature function to edit markers
L.geoJSON(sanFranAirport, {
    onEachFeature: function(feature, layer) {
        console.log("layer", layer);
        layer.bindPopup(
            "<h1>"+feature.properties.name+"</h1>"+
            "<h4>"+feature.properties.city+","+feature.properties.country+"</h4>"
        );
    }
}).addTo(map)




