/* global google*/
let map, infoWindow, addy, latlng, formattedAddress;

function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}
function initMap() {
  var myLatlng = { lat: 0, lng: 0 };
  map = new google.maps.Map(document.getElementById("map"), {
    //center: { lat: 37.7749, lng: -122.4194 },
    center: myLatlng,
    zoom: 12
  });
  // geolocation code 11 - 41
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent("Is this your location?");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos, addy) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }
  // infoWindow for coords
  var infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: myLatlng
  });
  infoWindow.open(map);

  // Configure the click listener.
  map.addListener("click", function(mapsMouseEvent) {
    // Close the current InfoWindow.

    infoWindow.close();
    // Create a new InfoWindow.
    addy = mapsMouseEvent.latLng
    console.log(infoWindow);
    latlng = [mapsMouseEvent.latLng.lat(), mapsMouseEvent.latLng.lng()];
    findCoords();
    console.log("started");
    setTimeout(openInfoWindow,300);
    // infoWindow.setContent(formattedAddress);
    // infoWindow.open(map);
    
    console.log(infoWindow);
    
  });
}
document.body.onclick = function(){
  infoWindow.close();
}
function openInfoWindow(window){
  infoWindow = new google.maps.InfoWindow({
      position: addy
    });
  // <a href="https://www.google.com">link</a>
  let anchor = document.createElement("a");
  anchor.text = "You found" + " "+ formattedAddress;
  anchor.href = "https://www.google.com?g= + formattedAddress"; //https://www.google.com/search?q=airplane
  anchor.target = "_blank";
  
  infoWindow.setContent(anchor)
  infoWindow.open(map)
  console.log("ended");
}
function findCoords(arr) {
  const KEY = "AIzaSyBJnKEvah3-evYvgjDloOUM2mBzuW3DPEo";
  const LAT = latlng[0];
  const LNG = latlng[1];
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LNG}&key=${KEY}`;
  console.log(httpGetAsync(url, getAddress));
}

function getAddress(data) {
  let addyObject = JSON.parse(data);
  formattedAddress = addyObject.results[0].formatted_address;
}

function popUp(url) {
  
}
