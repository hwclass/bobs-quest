var fs = require("fs"),
		CsvToJsonConverter = require('csvtojson').Converter,
		lines = 0,
		latestCsvData = [],
		config = {
			data : {
				path : './data/',
				fileName : 'sample.csv'
			},
			redis : {
				port : 6379,
				host : '127.0.0.1'
			}
		}

var redis = require('redis'); 

function connectRedis (port, host) {
	return redis.createClient(port, host);
}

function setKey (redisClient, key, val) {
	redisClient.set(key, val, function(err, reply) {
	  if (err) {
	  	console.dir(err);
	  } else {
	  	console.log('Key: ' + key + ' saved');
	  }
	});
}

function publish (redisClient, eventName, data) {
	redisClient.publish(eventName, data);
}

fs.watchFile(config.data.path + config.data.fileName, function (event, fileName) {
	var converterIns = new CsvToJsonConverter({});
	fs.createReadStream(config.data.path + config.data.fileName).pipe(converterIns);
	converterIns.on('end_parsed', function (jsonArr) {
		console.log('Detected a csv change...');
		redisClient = connectRedis(config.redis.port, config.redis.host);
		redisClient.on('connect', function() {
			console.log('CsvNotifier connected');
		});
		setKey(redisClient, 'founders', JSON.stringify(jsonArr));
		publish(redisClient, 'event_founders_updated', JSON.stringify(jsonArr));
	});
});