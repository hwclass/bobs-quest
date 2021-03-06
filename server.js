/**
* @author hwclass
* @filename server.js
*/

const messages = require('./messages'), 
      express = require('express'),
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

const connectRedis = function (port, host) {
  return redis.createClient(port, host);
}

redisClient = connectRedis(config.redis.port, config.redis.host);

redisClient.on('connect', () => {
  console.log(messages.REDIS_CONNECTED);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/founders', (req, res) => {
  getValue(redisClient, 'founders', (founders) => {
    console.log(messages.DATA_SENT_TO_THE_CLIENT_SIDE);
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

app.use((err, req, res, next) => {
  if (err) {
    console.log(err.message);
    res.status(500).send(err);
  }
});

const getValue = function (redisClient, key, callback) {
  redisClient.get(key, (err, reply) => {
    callback(JSON.parse(reply));
  });
}

const mesh = new bolt.Node();

mesh.start();

mesh.on('event_founders_updated', (data) => {
  cachedFounders = data;
});

app.listen(3000);

console.log(messages.SERVER_STARTED);