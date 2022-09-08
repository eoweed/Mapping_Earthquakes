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
    Satellite: satelliteStreets
};
//---------------------------------------------------------------


//---------------------------------------------------------------
// create map object with center and zoom level
// ---------------------------------------------------------------
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
})
// ---------------------------------------------------------------


//---------------------------------------------------------------
// Use L.control.layers() to add baseMaps options
//---------------------------------------------------------------
L.control.layers(baseMaps).addTo(map);
//---------------------------------------------------------------


//---------------------------------------------------------------
// access earthquake data
//---------------------------------------------------------------
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
//---------------------------------------------------------------


//---------------------------------------------------------------
// Use variable to hold style attiributes and then grb GeoJSON data
//---------------------------------------------------------------
let myStyle = {
  color: "blue",
  fillColor: "yellow",
  weight: 1
}

d3.json(earthquakeData, function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(features, layer) {
        layer.bindPopup("<h2>Location: "+features.properties.place+"</h2>"+
        "<h3>Magnitude: "+features.properties.mag+"</h3>")
    }
  })
  .addTo(map);
});


//---------------------------------------------------------------


