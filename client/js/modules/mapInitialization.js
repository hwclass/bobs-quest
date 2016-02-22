/**
* @author hwclass
* @filename mapInitialization.js
*/

var MapInitialization = (function () {

  function initMap (latitude, longitude) {
    var mapDiv = document.getElementById('map');
    setMapLoadingStatus(true);
    var map = cachedMap = new google.maps.Map(mapDiv, {
      center: {lat: 44.540, lng: -78.546},
      zoom: 8
    });
  }
  
  function setMapLoadingStatus (state) {
    mapLoaded = state;
  }

  return {
    init : initMap
  }

}());