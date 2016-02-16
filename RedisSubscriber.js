var redis = require('redis'),
    config = {
      redis : {
        port : 6379,
        host : '127.0.0.1'
      }
    }

function connectRedis (port, host) {
  return redis.createClient(port, host);
}

redisClient = connectRedis(config.redis.port, config.redis.host);

redisClient.on('connect', function() {
  console.log('RedisSubscriber connected');
});

redisClient.subscribe("event_founders_updated");

redisClient.on("message", function(channel, message) {
  console.log("Message '" + message + "' on channel '" + channel + "' arrived!")
});