# bobs-quest
A practical thing to experiment transactional processes with Node.js and Redis Pub/Sub Events.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

###Technical Spec
* [Node.js](www.nodejs.org) / as Javascript hero
* [Babel (ES6)](babel.io) / as ES6 dialect
* [Express](http://expressjs.com) / as middleware for server-side and client-side
* [Redis](redis.io) / as key-value hulk
* [Bolt](https://github.com/ecto/bolt) / as common event system
* [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) / as events sending from server-side
* [Booklet](https://www.npmjs.com/package/booklet.js) / as client-side view  and functionality controls
* [Google Maps API](https://developers.google.com/maps/documentation/javascript/) / as map provider
* [Grunt](http://gruntjs.com/) / as paranoid android 
* [Less](http://lesscss.org/) / as more for CSS
* [Karma](https://karma-runner.github.io/0.13/index.html) / as spectacular goal

<img src="http://oi65.tinypic.com/idy4g9.jpg" style="width: 100%;" border="0">

###Setup

####Install
* [Node.js](https://nodejs.org/en/download/)
* Babel : ```npm install babel -g```
* [Redis](http://redis.io/download)
* Grunt : ```npm install grunt-cli -g```
* Node Dependencies : ```npm install```

###Initializing

* Start Redis Server

```javascript
npm run start-redis
```

* Start our CSV file watcher for changes

```javascript
npm run start-csv-notifier
```

* Start our Redis watcher

```javascript
npm run start-redis-subscriber
```

* Start our Server instance

```javascript
npm run start-server
```

* Open the browser and hit the following:

```javascript
http://localhost:3000/
```

###Usage

* See the client-side comes onto the browser screen
* Add a new row into our sample.csv file
```javascript
4,Ev,Barış Güler,İstanbul,TR,WA 34540,Bağcılar,https://pbs.twimg.com/profile_images/564347684136701952/it2qZsOR.jpeg,http://hwclass.in,41.038660,28.829092
```

* Keep the changes in the client-side
* Enjoy :)

###Technical Story

* CvsNotifier, keeps eye on the sample data (data/sample.csv) and notifies that there is a change when the file is edited (row adding/removing/updating)
* RedisSubscriber, tracks the traces of Redis instance if the event is fired or not. When new update comes, it makes Bolt informed over its mesh instance.
* When the event with name 'event_founders_updated' triggered, the server-side file of Express, server.js sends its event to the client side.
* In the client-side, our listener for Server-Side Events instance catches the data and refresh the list of the founders.

###Possible improvements

* Put a mediator for the whole process into the middle managing the application
* CouchDB & PouchDB integration for supporting offline data and synchronization
* Celery for jobs with asynchronism
* React / Flux / Redux integration for more decoupled code base and management
* Using Heroku or any other cloud service to see the demo online

[twitter](https://www.twitter.com/hwclass) / [blog](https://www.hwclass.in)
