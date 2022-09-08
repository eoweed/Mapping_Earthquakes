//---------------------------------------------------------------
//create tile layers
//---------------------------------------------------------------
let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/light-v10',
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
    Light: light,
    Dark: dark
};
//---------------------------------------------------------------


//---------------------------------------------------------------
// create map object with center and zoom level
// ---------------------------------------------------------------
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [light]
})
// ---------------------------------------------------------------


//---------------------------------------------------------------
// Use L.control.layers() to add baseMaps options
//---------------------------------------------------------------
L.control.layers(baseMaps).addTo(map);
//---------------------------------------------------------------


//---------------------------------------------------------------
// access toronto airport data
//---------------------------------------------------------------
let torontoData = "https://raw.githubusercontent.com/eoweed/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/Mapping_GeoJSON_Linestrings/static/data/torontoRoutes.json"
//---------------------------------------------------------------



//---------------------------------------------------------------
// Grabbing our GeoJSON data.
//---------------------------------------------------------------
// d3.json(torontoData, function(data) {
//     console.log(data);
//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJSON(data, {
//     color: "yellow",
//     weight: 2,
//     onEachFeature: function(features, layer) {
//         layer.bindPopup("<h2>Airline: "+features.properties.airline+"</h2>"+
//         "<h3>Destination: "+features.properties.dst+"</h3>")
//     }
//   })
//   .addTo(map);
// });
//---------------------------------------------------------------


//---------------------------------------------------------------
// Use variable to hold style attiributes and then grb GeoJSON data
//---------------------------------------------------------------
let myStyle = {
  color: "yellow",
  weight: 2
}

d3.json(torontoData, function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(features, layer) {
        layer.bindPopup("<h2>Airline: "+features.properties.airline+"</h2>"+
        "<h3>Destination: "+features.properties.dst+"</h3>")
    }
  })
  .addTo(map);
});


//---------------------------------------------------------------


