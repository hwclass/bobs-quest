# bobs-quest
A practical thing to experiment transactional processes 

###Technical Spec
* [Node.js](www.nodejs.org)
* [Babel (ES6)](babel.io)
* [Express](http://expressjs.com)
* [Redis](redis.io)
* [Bolt](https://github.com/ecto/bolt)
* [Booklet](https://www.npmjs.com/package/booklet.js)
* [Grunt](http://gruntjs.com/)
* [Less](http://lesscss.org/)
* [Karma](https://karma-runner.github.io/0.13/index.html)

###Setup

####Install 
* [Node.js](https://nodejs.org/en/download/)
* Babel : ```javascript npm install babel -g``
* [Redis](http://redis.io/download)
* Grunt : ```javascript npm install grunt-cli -g``

###Initializing

* Start Redis Server

<pre>
<code>
npm run start-redis-server
</code>
</pre>

* Start our CSV file watcher for changes

<pre>
<code>
npm run start-csv-notifier
</code>
</pre>

* Start our Redis watcher

<pre>
<code>
npm run start-redis-subscriber
</code>
</pre>

* Start our Server instance

<pre>
<code>
npm run start-server
</code>
</pre>

* Open the browser and hit localhost

<pre>
<code>
http://localhost:3000/
</code>
</pre>

###Usage

* See the client-side comes onto the browser screen
* Add a new row into our sample.csv file
<pre>
<code>
4,Ev,Barış Güler,İstanbul,TR,WA 34540,Bağcılar,https://pbs.twimg.com/profile_images/564347684136701952/it2qZsOR.jpeg,http://hwclass.in,41.038660,28.829092
</code>
</pre>

* Keep the changes in the client-side
* Enjoy :)

###Technical Story

1) CvsNotifier, keeps eye the sample data (data/sample.csv) on and notifies that there is a change when the file is edited (row adding/removing/updating)
2) RedisSubscriber, tracks the traces of Redis instance if the event is fired or not. When new update comes, it makes Bolt informed over its mesh instance.
3) When the event with name 'event_founders_updated' triggered, the server-side file of Express, server.js sends its event to the client side.
4) In the client-side, our listener for Server-Side Events instance catches the data and refresh the list of the founders.

[twitter](www.twitter.com/hwclass)[blog](www.hwclass.in)

