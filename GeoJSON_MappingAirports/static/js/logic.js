//---------------------------------------------------------------
//create tile layers
//---------------------------------------------------------------
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
accessToken: API_KEY
});


let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/dark-v10',
accessToken: API_KEY
});

// // create variable to hold tile layer options
// var baseMaps = {
//     "Street": streetmap,
//     "Dark": dark
// }
// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
};
//---------------------------------------------------------------


//---------------------------------------------------------------
// create map object with center and zoom level
// ---------------------------------------------------------------
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
})
// ---------------------------------------------------------------


//---------------------------------------------------------------
// Use L.control.layers() to add baseMaps options
//---------------------------------------------------------------
L.control.layers(baseMaps).addTo(map);
//---------------------------------------------------------------


//---------------------------------------------------------------
// access ariport data from majorAirports.json
//---------------------------------------------------------------
let airportData = "https://raw.githubusercontent.com/eoweed/Mapping_Earthquakes/Mapping_GeoJSON_Points/GeoJSON_MappingAirports/static/data/majorAirports.json"
//---------------------------------------------------------------



//---------------------------------------------------------------
// Grabbing our GeoJSON data.
//---------------------------------------------------------------
d3.json(airportData, function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    onEachFeature: function(features, layer) {
        layer.bindPopup("<h2>"+features.properties.name+"</h2>"+
        "<h3>ID: "+features.properties.id+"</h3>")
    }
  })
  
  .addTo(map);
});
//---------------------------------------------------------------



