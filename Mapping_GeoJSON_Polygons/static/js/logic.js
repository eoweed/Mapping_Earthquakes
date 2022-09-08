//---------------------------------------------------------------
//create tile layers
//---------------------------------------------------------------
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
accessToken: API_KEY
});


let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/satellite-streets-v11',
accessToken: API_KEY
});

// // create variable to hold tile layer options
// var baseMaps = {
//     "Street": streetmap,
//     "Dark": dark
// }
// Create a base layer that holds both maps.
let baseMaps = {
    Streets: streets,
    Sattelite: satelliteStreets
};
//---------------------------------------------------------------


//---------------------------------------------------------------
// create map object with center and zoom level
// ---------------------------------------------------------------
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 10,
    layers: [satelliteStreets]
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
let torontoHoods = "https://raw.githubusercontent.com/eoweed/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/Mapping_GeoJSON_Polygons/static/data/torontoNeighborhoods.json"
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
  color: "blue",
  fillColor: "yellow",
  weight: 1
}

d3.json(torontoHoods, function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(features, layer) {
        layer.bindPopup("<h2>AREA_S_CD: "+features.properties.AREA_S_CD+"</h2>"+
        "<h3>AREA_NAME: "+features.properties.AREA_NAME+"</h3>")
    }
  })
  .addTo(map);
});


//---------------------------------------------------------------


