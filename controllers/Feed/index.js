var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed

module.exports = {

  getFeed: (req, res, next) => {
    var result;
    var feedreq = request(req.body.url, {timeout: 10000, pool: false})
    feedreq.setMaxListeners(50);
    // Some feeds do not respond without user-agent and accept headers.
    feedreq.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
    feedreq.setHeader('accept', 'text/html,application/xhtml+xml');
    var feedparser = new FeedParser();
    feedreq.on('error', function (error) {
      // handle any request errors
      console.log('error making feed request');
      res.json('error making feed request');
    });

    feedreq.on('response', function (feedres) {
      var stream = this; // `this` is `req`, which is a stream

      if (feedres.statusCode !== 200) {
        this.emit('error', new Error('Bad status code'));
      }
      else {
        stream.pipe(feedparser);
      }
    });

    feedparser.on('error', function (error) {
      // always handle errors
      console.log('error parsing feed result');
      res.json('error parsing feed result');
    });

    feedparser.on('readable', function () {
      // This is where the action is!
      var stream = this; // `this` is `feedparser`, which is a stream
      var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
      var item;

      while (item = stream.read()) {
        console.log(item);
        result = item;
      }
    });
    feedparser.on('end', () => {
      res.json(result)
    });
  }

};
