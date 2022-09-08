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
//---------------------------------------------------------------


//---------------------------------------------------------------
// Create a base layer that holds both maps.
//---------------------------------------------------------------
let baseMaps = {
    Streets: streets,
    Satellite: satelliteStreets
};
//---------------------------------------------------------------


//---------------------------------------------------------------
// Create overlay to hold earthquake markers
//---------------------------------------------------------------
let earthquakes = new L.layerGroup();

let overlays = {
  Earthquakes: earthquakes
}
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
L.control.layers(baseMaps, overlays).addTo(map);
//---------------------------------------------------------------


//---------------------------------------------------------------
// Access earthquake data
//---------------------------------------------------------------
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
//---------------------------------------------------------------


//---------------------------------------------------------------
// Grab earthquake GeoJSON data and put it on the map
//---------------------------------------------------------------
d3.json(earthquakeData, function(data) {
  console.log(data);

// ----- create function to declare style features -----
  function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
  };

// ----- create function to change marker size based on magnitude -----
  function getRadius(magnitude) {
    // earthquakes with radius = 0 will be plotted as 1  
    if (magnitude === 0) {
        return 1;
      }
      return magnitude *4;
  };

// ----- create function to change marker color based on magnitude -----
  function getColor(magnitude) {
    if (magnitude > 5) {return "#ea2c2c";}
    if (magnitude > 4) {return "#ea822c";}
    if (magnitude > 3) {return "#ee9c00";}
    if (magnitude > 2) {return "#eecc00";}
    if (magnitude > 1) {return "#d4ee00";}
    {return "#98ee00";}
  };


  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {

    // turn each feature into a circleMarker
    pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },

    // add style by referencing the styleInfo function
    style: styleInfo,
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + 
        "<br>Location: " + feature.properties.place);
      }
  
  // add L.geoJSON output to the overlay variable 'earthquakes'
  }).addTo(earthquakes);

  // then add the 'earthquakes' overlay variable to the map
  earthquakes.addTo(map);
});

//---------------------------------------------------------------


