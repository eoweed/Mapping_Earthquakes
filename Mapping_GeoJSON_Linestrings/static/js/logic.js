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
let torontoData = "https://raw.githubusercontent.com/<GitHub_name>/Mapping_Earthquakes/main/torontoRoutes.json";
//---------------------------------------------------------------



//---------------------------------------------------------------
// Grabbing our GeoJSON data.
//---------------------------------------------------------------
d3.json(torontoData, function(data) {
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



