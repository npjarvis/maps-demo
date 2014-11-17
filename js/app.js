/* app.js -- our application code */

"use strict";

// UW coordinates:
// lat: 47.655
// lng: -122.3080


$(document).ready(function() {
   function createMap (center, zoom){
       var mapElem = document.getElementById('map');
       var map = new google.maps.Map(mapElem, {
           center: center,
           zoom: zoom
       });

       var marker = new google.maps.Marker({
           position: center,
           map: map,
           animation: google.maps.Animation.DROP
       });

       //catch click event on marker
       var infoWindow = new google.maps.InfoWindow();
       // put img element in here in place of h2 for the challenge
       infoWindow.setContent('<p>Here I am!!</p>');

       google.maps.event.addListener(marker, 'click', function() {
          console.log('marker clicked!');
           infoWindow.open(map, marker);
           map.panTo(marker.getPosition());
       });

    } // createMap()

    function onGeoSuccess(position) {
        var center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        createMap(center, 14);
    }

    function onGeoError (error) {
        console.log(error);
    }

    var uwCoords = {
        lat: 47.655,
        lng: -122.3080
    };

    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, {
            // switches on gps
            enableHighAccuracy: true
        });
    }
    else{
        createMap(uwCoords, 14)
    }

});