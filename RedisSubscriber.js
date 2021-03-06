/**
* @author hwclass
* @filename RedisSubscriber.js
*/

require('./messages.js').default;

const messages = require('./messages'),
      redis = require('redis'),
      bolt = require('bolt'),
      config = {
        redis : {
          port : 6379,
          host : '127.0.0.1'
        }
      };

const mesh = new bolt.Node();

mesh.start();

const connectRedis = function (port, host) {
  return redis.createClient(port, host);
}

redisClient = connectRedis(config.redis.port, config.redis.host);

redisClient.on('connect', () => {
  console.log(messages.REDIS_SUBSCRIBER_CONNECTED);
});

redisClient.subscribe("event_founders_updated");

redisClient.on("message", (channel, message) => {
  console.log("Message '" + message + "' on channel '" + channel + "' arrived!");
  mesh.emit('event_founders_updated', message);
});