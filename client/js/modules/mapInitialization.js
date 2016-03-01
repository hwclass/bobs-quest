/**
* @author hwclass
* @filename mapInitialization.js
*/

var MapInitialization = (function () {

  var publicApi = {

    initMap : function (latitude, longitude) {
      var mapDiv = document.getElementById('map');
      publicApi.setMapLoadingStatus(true);
      var map = cachedMap = new google.maps.Map(mapDiv, {
        center: {lat: 44.540, lng: -78.546},
        zoom: 8
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