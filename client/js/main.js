var founders = null,
		cachedMap = null,
		mapLoaded = false,
		cachedFounders =[] ,
		foundersList = document.getElementById('foundersList'),
		source = new EventSource('/founders'),
		latestUpdateTime = null;

source.addEventListener('message', function(e) {
  console.log((new Date()).toLocaleTimeString() + ' : message fetched.');
  founders = JSON.parse(e.data);
  var documentState = getDocumentState();
  if(documentState === 'interactive' || documentState === 'complete') {
    if (!_.isEqual(cachedFounders.sort(), founders.sort())) {
    	cachedFounders = founders;
    	injectFoundersIntoDom(founders, function (founders) {
    		if (getMapLoadingStatus()) {
    			updateMap(founders);
    			setLatestUpdate((new Date()).toLocaleTimeString());
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

function getDocumentState () {
	return document.readyState;
}

function injectFoundersIntoDom (founders, callback) {
	foundersList.innerHTML = '';
	for (var foundersIndex = 0, len = founders.length; foundersIndex < len; foundersIndex++) {
		foundersList.innerHTML += '<tr class="geo-item" data-lat="'+founders[foundersIndex]['Garage Latitude']+'" data-long="'+founders[foundersIndex]['Garage Longitude']+'"><td><img src="'+ founders[foundersIndex]['Photo'] +'"></td><td>' + founders[foundersIndex]['Founder'] + '</td><td>' + founders[foundersIndex]['City'] + '</td><td>' + founders[foundersIndex]['Country'] + '</td><td>' + founders[foundersIndex]['Postal Code'] + '</td><td>' + founders[foundersIndex]['City'] + '</td><td>' + founders[foundersIndex]['Street'] + '</td><td>' + founders[foundersIndex]['Home Page'] + '</td><td>' + founders[foundersIndex]['Garage Latitude'] + '</td><td>' + founders[foundersIndex]['Garage Longitude'] + '</td></tr>';
	}
	callback(founders);
}

function setLatestUpdate (updateTime) {
	var latestUpdateTimeText = document.getElementById('latestUpdateTimeText');
	latestUpdateTime = updateTime;
	latestUpdateTimeText.innerHTML = updateTime;
}

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

function getMapLoadingStatus () {
	return !!mapLoaded;
}

function updateMap (founders, selectedLat, selectedLong) {
	var mapDiv = document.getElementById('map');
	if (_.isUndefined(selectedLat) && _.isUndefined(selectedLong)) {
	  createMarkers(cachedMap, google, founders);
	  cachedMap.setCenter({lat: (!_.isUndefined(selectedLat)?parseFloat(selectedLat):founders[0]['Garage Latitude']), lng: (!_.isUndefined(selectedLong)?parseFloat(selectedLong):founders[0]['Garage Longitude'])});
	} else {
		console.log('cached map to center');
		cachedMap.setCenter({lat: parseFloat(selectedLat), lng: parseFloat(selectedLong)});
	}
}

function getStringAsFloat (val) {
	return parseFloat(val);
}

function createMarkers (map, google, founders) {
	for (var foundersIndex = 0, len = founders.length; foundersIndex < len; foundersIndex++) {
		var marker = new google.maps.Marker({
      position: {lat: founders[foundersIndex]['Garage Latitude'], lng: founders[foundersIndex]['Garage Longitude']},
      map: map
    });
	}
	bindEvents();
}

function locateOnMarker (lat, long) {
	updateMap(cachedFounders, lat, long);
}

function bindEvents () {
	var founderListItems = document.getElementsByClassName('geo-item'),
			showAllButton = document.getElementById('showAll');
	for (var founderListItemsIndex = 0, len = founderListItems.length; founderListItemsIndex < len; founderListItemsIndex++) {
		founderListItems[founderListItemsIndex].addEventListener('click', function (evt) {
			var lat = evt.target.parentElement.attributes['data-lat'].nodeValue,
				long = evt.target.parentElement.attributes['data-long'].nodeValue;
			locateOnMarker(lat, long);
		}, false);
	}
	showAllButton.addEventListener('click', function () {
		cachedMap.setZoom(1);
	});
}

window.onload = function () {
	bindEvents();
	updateMap(cachedFounders);
}