/**
* @author hwclass
* @filename mapInitialization.js
*/

var MapInitialization = (function () {

  var options = {
    lat : 44.540,
    lng : -78.546,
    zoom : 9
  }

  var publicApi = {

    initMap : function (latitude, longitude) {
      var mapDiv = document.getElementById('map');
      publicApi.setMapLoadingStatus(true);
      var map = cachedMap = new google.maps.Map(mapDiv, {
        center: {lat: options.lat, lng: options.lng},
        zoom: options.zoom
      });
    },
    
    setMapLoadingStatus : function (state) {
      mapLoaded = state;
    }

  }

  return {
    init : publicApi.initMap
  }

}());