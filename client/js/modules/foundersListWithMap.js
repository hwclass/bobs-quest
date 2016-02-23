/**
* @author hwclass
* @filename foundersListWithMap.js
*/

// Register a module into the view instance
bobsQuest.register('foundersListWithMap', function (bobsQuest) {
  return {
    
    /**
     * init() is an initializer method for the module
     *
     * @noparam
    */
    init : function () {
      console.log('bobsQuest:init invoked.');
      this.bindEvents();
    },

    /**
     * bindEvents() is a method that binds the events with the current methods
     *
     * @noparam
    */
    bindEvents : function () {
      //config defaults
      var source = bobsQuest.defaults.source;
      //Elements cache
      var foundersListItems = document.getElementsByClassName('geo-item'),
          showAllButton = document.getElementById('showAll');
      this.messageOnServerSideEvents(source);
      //foundersListItems event decleration for click
      this.clickOnFoundersListItem(foundersListItems);
      //showAllButton event decleration for click
      this.clickOnShowAllButton(showAllButton);
    },

    /**
     * clickOnFoundersListItem() is event method for foundersListItem as geo-item
     *
     * @param {array} founderListItems
    */
    clickOnFoundersListItem : function (founderListItems) {
    	var self = this;
      for (var founderListItemsIndex = 0, len = founderListItems.length; founderListItemsIndex < len; founderListItemsIndex++) {
        founderListItems[founderListItemsIndex].addEventListener('click', function (evt) {
          var lat = evt.target.parentElement.attributes['data-lat'].nodeValue,
            long = evt.target.parentElement.attributes['data-long'].nodeValue;
          self.locateOnMarker(lat, long);
        }, false);
      }
    },

    /**
     * clickOnShowAllButton() is event method for showAllButton
     *
     * @param {object} showAllButton
    */
    clickOnShowAllButton : function (showAllButton) {
      showAllButton.addEventListener('click', function () {
        cachedMap.setZoom(1);
      });
    },

    /**
     * messageOnServerSideEvents() is event method for SSE events
     *
     * @param {object} source
    */
    messageOnServerSideEvents : function (source) {
      var defaults = bobsQuest.defaults,
          utils = bobsQuest.getService('utils'),
          self = this;
      source.addEventListener('message', function(e) {
        console.log((new Date()).toLocaleTimeString() + ' : message fetched.');
        founders = JSON.parse(e.data);
        var documentState = utils().getDocumentState();
        if(documentState === 'interactive' || documentState === 'complete') {
          if (!_.isEqual(defaults.cachedFounders.sort(), founders.sort())) {
            defaults.cachedFounders = founders;
            self.injectFoundersIntoDom(founders, function (founders) {
              if (utils().getMapLoadingStatus()) {
                self.updateMap(founders);
                self.setLatestUpdate((new Date()).toLocaleTimeString());
              }
            });
          }
        } else { setTimeout(arguments.callee, 200); }
      }, false);

      source.addEventListener('open', function(e) {
        console.log((new Date()).toLocaleTimeString() + ' : connection is now arrived.');
      }, false);

      source.addEventListener('error', function(e) {
        if (e.readyState == EventSource.CLOSED) {
          console.log((new Date()).toLocaleTimeString() + ' : connection is now closed.');
        }
      }, false);
    },

    /**
     * injectFoundersIntoDom() is method for putting data into the responsive table as rows
     *
     * @param {array} founders
     * @param {function} callback
    */
    injectFoundersIntoDom : function (founders, callback) {
      foundersList.innerHTML = '';
      for (var foundersIndex = 0, len = founders.length; foundersIndex < len; foundersIndex++) {
        foundersList.innerHTML += '<tr class="geo-item" data-lat="'+founders[foundersIndex]['Garage Latitude']+'" data-long="'+founders[foundersIndex]['Garage Longitude']+'"><td><img src="'+ founders[foundersIndex]['Photo'] +'"></td><td>' + founders[foundersIndex]['Founder'] + '</td><td>' + founders[foundersIndex]['City'] + '</td><td>' + founders[foundersIndex]['Country'] + '</td><td>' + founders[foundersIndex]['Postal Code'] + '</td><td>' + founders[foundersIndex]['City'] + '</td><td>' + founders[foundersIndex]['Street'] + '</td><td>' + founders[foundersIndex]['Home Page'] + '</td><td>' + founders[foundersIndex]['Garage Latitude'] + '</td><td>' + founders[foundersIndex]['Garage Longitude'] + '</td></tr>';
      }
      callback(founders);
    },

    /**
     * setLatestUpdate() is a method for setting the latest time of update
     *
     * @param {string} updateTime
    */
    setLatestUpdate : function (updateTime) {
      var latestUpdateTimeText = document.getElementById('latestUpdateTimeText');
      latestUpdateTime = updateTime;
      latestUpdateTimeText.innerHTML = updateTime;
    },

    /**
     * updateMap() is a method for updating the table and the pins with centering and zooming
     *
     * @param {array} founders
     * @param {float} selectedLat
     * @param {float} selectedLong
    */
    updateMap : function (founders, selectedLat, selectedLong) {
      var mapDiv = document.getElementById('map');
      if (_.isUndefined(selectedLat) && _.isUndefined(selectedLong)) {
        this.createMarkers(cachedMap, google, founders);
        cachedMap.setCenter({lat: (!_.isUndefined(selectedLat)?parseFloat(selectedLat):founders[0]['Garage Latitude']), lng: (!_.isUndefined(selectedLong)?parseFloat(selectedLong):founders[0]['Garage Longitude'])});
        cachedMap.setZoom(8);
      } else {
        cachedMap.setCenter({lat: parseFloat(selectedLat), lng: parseFloat(selectedLong)});
        cachedMap.setZoom(8);
      }
    },

    /**
     * createMarkers() is a method for creating pins over the map
     *
     * @param {object} map
     * @param {object} google
     * @param {array} founders
    */
    createMarkers : function (map, google, founders) {
      for (var foundersIndex = 0, len = founders.length; foundersIndex < len; foundersIndex++) {
        var marker = new google.maps.Marker({
          position: {lat: founders[foundersIndex]['Garage Latitude'], lng: founders[foundersIndex]['Garage Longitude']},
          map: map
        });
      }
      this.bindEvents();
    },

    /**
     * locateOnMarker() is a method for locating the map orientation into the center of the map
     *
     * @param {float} lat
     * @param {float} long
    */
    locateOnMarker : function (lat, long) {
      var defaults = bobsQuest.defaults;
      this.updateMap(defaults.cachedFounders, lat, long);
    }

  }
});