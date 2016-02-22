'use strict';

/**
* @author hwclass
* @filename utils.js
*/

bobsQuest.createService('utils', function () {
  return {
    getDocumentState : function () {
      return document.readyState;
    },
    getStringAsFloat : function (val) {
      return parseFloat(val);
    },
    setMapLoadingStatus : function (state) {
      mapLoaded = state;
    },
    getMapLoadingStatus : function () {
      return !!mapLoaded;
    }
  }
});