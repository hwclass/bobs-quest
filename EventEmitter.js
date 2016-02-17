/*
var EventEmitter = require('events').EventEmitter;
exports.eventEmitter = new EventEmitter();
*/

var events = require('events');

module.exports = {
	EventEmitter : new events.EventEmitter()
}