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
// access toronto airport data
//---------------------------------------------------------------
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
//---------------------------------------------------------------


//---------------------------------------------------------------
// Grab earthquake GeoJSON data
//---------------------------------------------------------------
d3.json(earthquakeData, function(data) {
  console.log(data);

  // create function to declare style features
  function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: "#ffae42",
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
  }

  //create function for getRadius()
  // earthquakes with radius = 0 will be plotted as 1
  function getRadius(magnitude) {
      if (magnitude === 0) {
        return 1;
      }
      return magnitude *4;
  }


  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {

    // turn each feature into a circleMarker
    pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },

    // add style by referencing the styleInfo function
    style: styleInfo

  }).addTo(map);
});


//---------------------------------------------------------------


