// 04: Mapa resultats.html

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
    
    
    
    map4 = new google.maps.Map(document.getElementById('map-canvas-result'), mapOptions4);
  



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccessGeolocating4);
    }
 

// Add marker when map is clicked (and overwrite when it is clicked again)
   
var coord4;
    google.maps.event.addListener(map3, 'click', function(event) {
        placeMarker4(event.latLng);
        //coord4 = event.latLng;
        //console.info(coord4.lat());
        //console.info(coord4.lng());
    });

    function placeMarker4(location) {
        if (marker4 == null)
        {
            marker4 = new google.maps.Marker({
                position: location,
                map: map4
            }); 
        } 
        else
        {
            marker4.setPosition(location); 
        } 

    }

    
    
    
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