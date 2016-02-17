var express = require('express'),
    bodyParser = require('body-parser');
    redis = require('redis'),
    bolt = require('bolt'),
    app = express();
    _ = require('lodash'),
    config = {
      redis : {
        port : 6379,
        host : '127.0.0.1'
      }
    },
    founders = []; 

function connectRedis (port, host) {
  return redis.createClient(port, host);
}

redisClient = connectRedis(config.redis.port, config.redis.host);

redisClient.on('connect', function() {
  console.log('redis connected');
});

app.get('/founders', function(req, res){
  getValue(redisClient, 'founders', function (founders) {
    res.json(founders);
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
  console.dir(data);
});

app.listen(3000);

console.log('Server running on 3000...');