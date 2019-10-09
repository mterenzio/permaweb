var OpmlParser = require('opmlparser')
  , request = require('request')
  , index = {};

module.exports = {

  getOpml: (req, res, next) => {
    var result;
    var opmlreq = request(req.body.url, {timeout: 10000, pool: false})
    opmlreq.setMaxListeners(50);
    // Some feeds do not respond without user-agent and accept headers.
    opmlreq.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
    opmlreq.setHeader('accept', 'text/html,application/xhtml+xml');
    var opmlparser = new OpmlParser();
    opmlreq.on('error', function (error) {
      // handle any request errors
      console.log('error making opml request');
      res.json('error making opml request');
    });

    opmlreq.on('response', function (opmlres) {
      var stream = this; // `this` is `req`, which is a stream

      if (opmlres.statusCode !== 200) {
        this.emit('error', new Error('Bad status code'));
      }
      else {
        stream.pipe(opmlparser);
      }
    });

    opmlparser.on('error', function (error) {
      // always handle errors
      console.log('error parsing opml result');
      res.json('error parsing opml result');
    });

    opmlparser.on('readable', function () {
      // This is where the action is!
      var stream = this,
      meta = this.meta, // **NOTE** the "meta" is always available in the context of the opmlparser instance
      outline;

      while (outline = stream.read()) {
        console.log(outline);
        index[outline['#id']] = outline;
      }
    });
    opmlparser.on('end', function () {
      console.log('Here\'s my hierarchy.');

      var stack = Object.keys(index).reduce(function (stack, id) {
        var outline = index[id]
          , i
          , children;
        if (stack[0]['#id'] === outline['#parentid']) {
          stack[0].children || (stack[0].children = {});
          stack[0].children[id] = outline;
        }
        else if (stack[0].children && outline['#parentid'] in stack[0].children) {
          stack.unshift(stack[0].children[outline['#parentid']]);
          stack[0].children || (stack[0].children = {});
          stack[0].children[id] = outline;
        }
        else {
          // unwind the stack as much as needed
          for (i = stack.length - 1; i >= 0; i--) {
            children = stack.shift();
            stack[0].children[children['#id']] = children;
            if (stack[0]['#id'] === outline['#parentid']) {
              stack[0].children[id] = outline;
              break;
            }
          }
        }
        return stack;
      }, [ { 'text': 'root', '#id': 0, children: {} } ]);
      console.log('All done.');
      res.json(stack)
    });
  }

};
