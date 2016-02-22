/**
* @author hwclass
* @filename bobsQuest.js
*/

/*
 *bobsQuest is an object wrapper for the defaults
 *@type {object}
 */
var bobsQuest = app.createView('bobsQuest', {
  founders : null,
  cachedMap : null,
  mapLoaded : false,
  cachedFounders : [] ,
  foundersList : document.getElementById('foundersList'),
  source : new EventSource('/founders'),
  latestUpdateTime : null
});