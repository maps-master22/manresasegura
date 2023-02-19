const firebaseConfig = {
    apiKey: "AIzaSyA6U_V4E1JqqEYru110RTZn7xG_1ezTTKk",
    authDomain: "manresa-segura.firebaseapp.com",
    databaseURL: "https://manresa-segura-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "manresa-segura",
    storageBucket: "manresa-segura.appspot.com",
    messagingSenderId: "209493940672",
    appId: "1:209493940672:web:3ddb7ca50ac434ab1b9025",
    measurementId: "G-H7E89YV9T9"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var ref = database.ref('dades');

let lat; // Define the lat variable outside of the event listener functions
let lng;


function dadesFirebase() {
    
    
    google.maps.event.addListener(map2, 'click', function(event) {
        function placeMarker(location) {
            if (marker2 == null) {
                marker2 = new google.maps.Marker({
                position: location,
                map: map2
                }); 
            } else {
                marker2.setPosition(location); 
            } 
        }

        placeMarker(event.latLng);

        const latLng = event.latLng;
        lat = latLng.lat(); // Assign a value to lat inside the function
        lng = latLng.lng();

        console.info(lat);
        console.info(lng);
    });

    

        var btnEnviar = document.querySelector("#boto-zonaInsegura");
        btnEnviar.onclick = function() {
            console.log("Button clicked");
            const comentari = document.querySelector(".comentari-formulari-text").value;
            const incidencia = document.querySelector(".select-css").value;
            const hora = document.querySelector(".input-time").value;
            sendDataToFirebase(lat, lng, comentari, incidencia, hora);
        };


        database.ref("dades").push({
        comentari: comentari,
        incidencia: incidencia,
        hora: hora,
        lat: lat, // Use the lat variable here
        lng: lng
        }).then(() => {
        console.log("Dades enviades correctament a Firebase");
        }).catch((error) => {
        console.error("Error en enviar les dades a Firebase:", error);
        });

        console.info(comentari);
    };
    /*
    var latitud;
    var longitud;
    ref.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        var latitud = childData.lat;
        var longitud = childData.lng;
        // Use the lat and lng data to create a circle marker on the map
    });
    });  

    var circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: map4,
        center: new google.maps.LatLng(latitud, longitud),
        radius: 100 // set the radius of the circle in meters
    });
    */





function sendDataToFirebase(lat, lng, comentari, incidencia, hora) {
    database.ref("dades").push({
      comentari: comentari,
      incidencia: incidencia,
      hora: hora,
      lat: lat,
      lng: lng
    }).then(() => {
      console.log("Dades enviades correctament a Firebase");
    }).catch((error) => {
      console.error("Error en enviar les dades a Firebase:", error);
    });
  }


  function retrieveDataFromFirebaseAndPlaceMarkers(map) {
    var ref = database.ref('dades');
    ref.on('value', function(data) {
      var dades = data.val();
      var keys = Object.keys(dades);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var dada = dades[key];
        var lat = dada.lat;
        var lng = dada.lng;
        var comentari = dada.comentari;
        var incidencia = dada.incidencia;
        var hora = dada.hora;
        var latLng = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: comentari
        });
      }
    });
  }






// Mapa index Zona Insegura

var map2;
var marker2;

function initialize2() {

    google.maps.controlStyle = 'azteca';
    var mapOptions2 = {
        zoom: 15,
        minZoom: 12,
        maxZoom:19,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: "greedy",

        center: new google.maps.LatLng(41.727751, 1.827424),
        restriction: {
            latLngBounds: {
              north: 41.753,
              south: 41.715,
              east: 1.857,
              west: 1.806,
            },
          },
        
        styles: [{ // VISIBLE BARS RESTAURANTS
            featureType: "poi",
            stylers: [{ visibility: "on" }],
        }, {
            featureType: "poi.park",
            stylers: [{ visibility: "on" }],
        }, {
            featureType: "poi.park",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
        }, {
            featureType: "transit",
            stylers: [{ visibility: "off" }],
        }],
        disableDoubleClickZoom:true,
        clickableIcons: false
    };
    
    
    
    map2 = new google.maps.Map(document.getElementById('map-canvas-inseg'), mapOptions2);
  

    




    // Geocodificació inversa
    const geocoder = new google.maps.Geocoder(); 
    const infowindow = new google.maps.InfoWindow();

    document.getElementById("geocodif-inv").addEventListener("click", () => {
        geocodeLatLng(geocoder, map2, infowindow);
    });

    function geocodeLatLng(geocoder, map2, infowindow) {
        const input = document.getElementById("latlng").value;
        const latlngStr = input.split(",", 2);
        const latlng = {
          lat: parseFloat(latlngStr[0]),
          lng: parseFloat(latlngStr[1]),
        };
    
        geocoder
        .geocode({ location: latlng })
        .then((response) => {
          if (response.results[0]) {
            map2.setZoom(11);
    
            const marker = new google.maps.Marker({
              position: latlng,
              map: map2,
            });
    
            infowindow.setContent(response.results[0].formatted_address);
            infowindow.open(map2, marker);
          } else {
            window.alert("No results found");
          }
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));
    }



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccessGeolocating);
    }
 

    // FIREBASE
    
    dadesFirebase(); 
       
    
    
    
    function onSuccessGeolocating(position) {

        var circleBigOpt = {
            center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude), 
            map: map2,
            radius: position.coords.accuracy,
            fillColor:"#4285f4",
            fillOpacity:0.1,
            strokeWeight:0
        };
    
        var circleBig = new google.maps.Circle(circleBigOpt);

        var positionMarkerOptions = {
            position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
              icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: '#4285f4',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 1
              },
              map: map2

             
        }; 
  
          var marker = new google.maps.Marker(positionMarkerOptions);
  
        
        map2.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
       
        
        
    
        // Function that adds marker on the user's current location, when button "boto-marcarMapa" is clicked
        

    
        document.getElementById("boto-marcarMapa").addEventListener("click", function( event ) {
            
            placeMarker(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
            var bounds = map2.getBounds();
            if (bounds.contains(marker.getPosition()) == false) {
                alert("Actualment no et trobes a Manresa");
            }

        });

        
    
    }

    



}
window.addEventListener('load', initialize2);




// 02: Mapa zonaAssetjament.html

var map3;
var marker3;
function initialize3() {

    google.maps.controlStyle = 'azteca';
    var mapOptions3 = {
        zoom: 15,
        minZoom: 12,
        maxZoom:19,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: "greedy",

        center: new google.maps.LatLng(41.727751, 1.827424),
        restriction: {
            latLngBounds: {
              north: 41.753,
              south: 41.715,
              east: 1.857,
              west: 1.806,
            },
          },
        
        styles: [{ // VISIBLE BARS RESTAURANTS
            featureType: "poi",
            stylers: [{ visibility: "on" }],
        }, {
            featureType: "poi.park",
            stylers: [{ visibility: "on" }],
        }, {
            featureType: "poi.park",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
        }, {
            featureType: "transit",
            stylers: [{ visibility: "off" }],
        }],
        disableDoubleClickZoom:true,
        clickableIcons: false
    };
    
    
    
    map3 = new google.maps.Map(document.getElementById('map-canvas-assetj'), mapOptions3);
  



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccessGeolocating3);
    }
 

// Add marker when map is clicked (and overwrite when it is clicked again)
   
var coord3;
    google.maps.event.addListener(map3, 'click', function(event) {
        placeMarker3(event.latLng);
        coord3 = event.latLng;
        console.info(coord3.lat());
        console.info(coord3.lng());
    });

    function placeMarker3(location) {
        if (marker3 == null)
        {
            marker3 = new google.maps.Marker({
                position: location,
                map: map3
            }); 
        } 
        else
        {
            marker3.setPosition(location); 
        } 

    }

    
    
    
    function onSuccessGeolocating3(position) {

        var circleBigOpt3 = {
            center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude), 
            map: map3,
            radius: position.coords.accuracy,
            fillColor:"#4285f4",
            fillOpacity:0.1,
            strokeWeight:0
        };
    
        var circleBig3 = new google.maps.Circle(circleBigOpt3);

        var positionMarkerOptions3 = {
            position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
              icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: '#4285f4',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 1
              },
              map: map3

             
        }; 
  
          var marker3 = new google.maps.Marker(positionMarkerOptions3);
  
        
        map3.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
       
        
        
    
        // Function that adds marker on the user's current location, when button "boto-marcarMapa" is clicked
        

    
        document.getElementById("boto-marcarMapa3").addEventListener("click", function( event ) {
            
            placeMarker3(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
            var bounds3 = map3.getBounds();
            if (bounds3.contains(marker3.getPosition()) == false) {
                alert("Actualment no et trobes a Manresa");
            }

        });

        
    
    }

    



}
window.addEventListener('load', initialize3);


// 03: Mapa resultats.html


var map4;
var marker4;
function initialize4() {

    google.maps.controlStyle = 'azteca';
    var mapOptions4 = {
        zoom: 15,
        minZoom: 12,
        maxZoom:19,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: "greedy",

        center: new google.maps.LatLng(41.727751, 1.827424),
        restriction: {
            latLngBounds: {
              north: 41.753,
              south: 41.715,
              east: 1.857,
              west: 1.806,
            },
          },
        
        styles: [{ // VISIBLE BARS RESTAURANTS
            featureType: "poi",
            stylers: [{ visibility: "off" }],
        }, {
            featureType: "poi.park",
            stylers: [{ visibility: "off" }],
        }, {
            featureType: "poi.park",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
        }, {
            featureType: "transit",
            stylers: [{ visibility: "off" }],
        }],
        disableDoubleClickZoom:true,
        clickableIcons: false
    };
    
    
    
    map4 = new google.maps.Map(document.getElementById('map-canvas-result'), mapOptions4);
  
    


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccessGeolocating4);
    }
 

    // Add marker when map is clicked (and overwrite when it is clicked again)
   
    retrieveDataFromFirebaseAndPlaceMarkers(map4);
  

    
    
    
    function onSuccessGeolocating4(position) {

        var circleBigOpt4 = {
            center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude), 
            map: map4,
            radius: position.coords.accuracy,
            fillColor:"#4285f4",
            fillOpacity:0.1,
            strokeWeight:0
        };
    
        var circleBig4 = new google.maps.Circle(circleBigOpt4);

        var positionMarkerOptions4 = {
            position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
              icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: '#4285f4',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 1
              },
              map: map4

             
        }; 
  
          var marker4 = new google.maps.Marker(positionMarkerOptions4);
  
        
        map4.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
       
    

        var markerInseg = new google.maps.Marker({
            position: new google.maps.LatLng(41.7273, 1.827424),
            sName: "Zona Insegura",
            map: map4,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8.5,
                fillColor: "#F00",
                fillOpacity: 0.4,
                strokeWeight: 0.4
            },
        });

        markerInseg.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "yellow",
            fillOpacity: 0.5,
            strokeWeight: 1
        })

        var markerAssetj1 = new google.maps.Marker({
            position: new google.maps.LatLng(41.7243, 1.827424),
            sName: "Assetj1",
            map: map4,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8.5,
                fillColor: "#F00",
                fillOpacity: 0.4,
                strokeWeight: 0.4
            },
        });

        markerAssetj1.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "orange",
            fillOpacity: 0.5,
            strokeWeight: 1
        })

        var markerAssetj2 = new google.maps.Marker({
           //position: new google.maps.LatLng(coord3.lat(), coord3.lng()),
            position: new google.maps.LatLng(41.7243, 1.837424),
            sName: "Assetj2",
            map: map4,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8.5,
                fillColor: "#F00",
                fillOpacity: 0.4,
                strokeWeight: 0.4
            },
        });

        markerAssetj2.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "red",
            fillOpacity: 0.5,
            strokeWeight: 1
        })

       





        
    
    }

    



}
window.addEventListener('load', initialize4);










// Firebase attempt 2
/*
let app;
let db;

document.addEventListener("DOMContentLoaded", event => {

    app = firebase.app();

    db = firebase.firestore();

    const myPost = db.collection('posts').doc('firstpost');
});




const incidencia = document.querySelector(".select-css");
const comentari = document.querySelector(".comentari-formulari-text");
const hora = document.querySelector(".input-time");
*/












//function afegirPuntMapa(){


/*
    function getReverseGeocodingData(lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        // This is making the Geocode request
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status !== google.maps.GeocoderStatus.OK) {
                alert(status);
            }
            // This is checking to see if the Geocode Status is OK before proceeding
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results);
                var address = (results[0].formatted_address);
            }
        });
    }
*/





