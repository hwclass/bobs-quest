var express = require('express'),
    fs = require('fs'),
    redis = require('redis'),
    bolt = require('bolt'),
    app = express();
    config = {
      redis : {
        port : 6379,
        host : '127.0.0.1'
      }
    },
    cachedFounders = null; 

app.use('/client', express.static(__dirname + '/client'));

function connectRedis (port, host) {
  return redis.createClient(port, host);
}

redisClient = connectRedis(config.redis.port, config.redis.host);

redisClient.on('connect', function() {
  console.log('redis connected');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/founders', function(req, res){
  console.log('1.5');
  getValue(redisClient, 'founders', function (founders) {
    console.log('Express Server: Data has been sent to the client-side...');
    cachedFounders = JSON.stringify(founders);
    res.writeHead(200, {
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache',
      'connection': 'keep-alive'
    });
    console.dir(JSON.stringify(founders));
    res.write('id: ' + (new Date()).toLocaleTimeString() + '\n');
    res.write("data: " + JSON.stringify(founders) + '\n\n');
    res.end();
  });
});

app.use(function(err, req, res, next) {
  if (err) {
    console.log(err.message);
    res.status(500).send(err);
  }
});

function getValue (redisClient, key, callback) {
  redisClient.get(key, function (err, reply) {
    callback(JSON.parse(reply));
  });
}

var bolt = require('bolt');

var mesh = new bolt.Node();

mesh.start();

mesh.on('event_founders_updated', function (data) {
  cachedFounders = data;
});

app.listen(3000);

console.log('Server running on 3000...');