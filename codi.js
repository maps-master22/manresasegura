

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

let lat; 
let lng;

function placeMarker(location, map) {
    let marker;
  
    if (map === map2) {
      marker = marker2;
    } else if (map === map3) {
      marker = marker3;
    }
  
    if (marker == null) {
      marker = new google.maps.Marker({
        position: location,
        map: map,
      });
  
      if (map === map2) {
        marker2 = marker;
      } else if (map === map3) {
        marker3 = marker;
      }
    } else {
      marker.setPosition(location);
    }
  }

  function dadesFirebase(map) {

    google.maps.event.addListener(map, 'click', function(event) {
        
        placeMarker(event.latLng, map);

        const latLng = event.latLng;
        lat = latLng.lat(); // Assign a value to lat inside the function
        lng = latLng.lng();

        console.info(lat);
        console.info(lng);
    });

    var btnEnviar = map == map2 ? document.querySelector("#boto-zonaInsegura") : document.querySelector("#boto-zonaInsegura-2");
    btnEnviar.onclick = function() {
        console.log("Botó premut");
        const comentari = map == map2 ? document.querySelector(".comentari-formulari-text").value : document.querySelector(".comentari-formulari-text-2").value;
        const incidencia = map == map2 ? document.querySelector(".select-css").value : document.querySelector(".select-css-2").value;
        const hora = map == map2 ? document.querySelector(".input-time").value : document.querySelector(".input-time-2").value;
        const mapName = map === map2 ? "map2" : "map3";
        sendDataToFirebase(lat, lng, comentari, incidencia, hora, mapName);
        location.href= "index.html" ;
    };
   
};

function sendDataToFirebase(lat, lng, comentari, incidencia, hora, mapName) {
    if (lat && lng) { // Check if lat and lng have been defined
        database.ref("dades");
        var data = {
            lat: lat,
            lng: lng,
            comentari: comentari,
            incidencia: incidencia,
            hora: hora,
            mapName: mapName,
        };
        console.log("mapName: ", mapName);
        ref.push(data);
    } else {
        alert("Si us plau, selecciona la ubicació de la incidència al mapa abans d'enviar-la");
    }
}

  
function retrieveDataFromFirebaseAndPlaceMarkers(map) {

    var countMap2 = 0;
    var countMap3 = 0;
    
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
        var mapName = dada.mapName;
        var markerColor;
        if (mapName === "map2") {
        markerColor = "yellow";
        } else if (mapName === "map3") {
        if (incidencia === "Mirades sexuades no desitjades" || incidencia === "Xiulades o cops de clàxon" || incidencia === "Comentaris masclistes o crits invasius") {
            markerColor = "orange";
        } else {
            markerColor = "red";
        }
        }
        console.log(`Processing record with mapName: ${dada.mapName}`);


        if (mapName === "map2") {
            countMap2++;
          } else if (mapName === "map3") {
            countMap3++;
        }


  
        if (typeof lat === 'number' && !isNaN(lat) && typeof lng === 'number' && !isNaN(lng)) {
          var latLng = new google.maps.LatLng(lat, lng);
          var circle = new google.maps.Circle({
            strokeColor: '#black',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: markerColor,
            fillOpacity: 0.55,
            center: latLng, 
            map: map,
            radius: 25,
            comentari: comentari
          });
          
        console.log(`Number of entries with mapName "map2": ${countMap2}`);
        console.log(`Number of entries with mapName "map3": ${countMap3}`);

        document.getElementById('registresInseg').value = countMap2;
        document.getElementById('registresAssetj').value = countMap3;

          circle.infowindow = new google.maps.InfoWindow({
            content: `
              <div class="infowindow-content">
                <div><strong>Comentari:</strong> ${comentari}</div>
                <div><strong>Incidència:</strong> ${incidencia}</div>
                <div><strong>Hora:</strong> ${hora}</div>
              </div>
            `,
          });
  
          circle.addListener('mouseover', function() {
            this.infowindow.setPosition(this.getCenter());
            this.infowindow.open(map);
          });
  
          circle.addListener('mouseout', function() {
            this.infowindow.close();
          });
        }
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
    
    dadesFirebase(map2); 
       
    
    
    
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
            
            placeMarker(new google.maps.LatLng(position.coords.latitude, position.coords.longitude), map2);
            lat=position.coords.latitude;
            lng=position.coords.longitude;
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

    dadesFirebase(map3); 
 

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
            
            placeMarker(new google.maps.LatLng(position.coords.latitude, position.coords.longitude), map3);
            lat=position.coords.latitude;
            lng=position.coords.longitude;
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
    
    
    
    map4 = new google.maps.Map(document.getElementById('map-canvas-result'), mapOptions4);
  
    


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccessGeolocating4);
    }
 

    // Pintar les dades emmagatzemades a Firebase sobre el mapa de resultats
   
    retrieveDataFromFirebaseAndPlaceMarkers(map4, "map2");
    
  

    
    
    
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





