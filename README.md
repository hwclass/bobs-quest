# bobs-quest
A practical thing to experiment transactional processes 

###Setup

####Install 
* [Node.js](https://nodejs.org/en/download/)
* [Redis](http://redis.io/download)

###Initializing

* Start Redis Server

<pre>
<code>
redis-server
</code>
</pre>

* Start our CSV file watcher for changes

<pre>
<code>
node CsvNotifier.js
</code>
</pre>

* Start our Redis watcher

<pre>
<code>
node RedisSubscriber.js
</code>
</pre>

###Usage

* Add a new row into our sample.csv file
* Keep the changes in the client-side
* Enjoy :)