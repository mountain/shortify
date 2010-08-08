exports.app = function(env) {
  var problem = env.templates['problem'],
      cache = env.cache,
      admin = env.admin;


  return function(req, res, lang, title) {
    var pageId = parseInt(title.toLowerCase(), 36),
        host = lang + '.wikipedia.org';

    var url = cache?cache.getItem(lang + ':' + pageId):undefined;

    if(url) {
      res.redirect(url);
    } else {
      var http = require('http'),
          wp = http.createClient(80, host),
          request = wp.request('GET',
            '/w/api.php?action=query&prop=info&inprop=url&format=json&callback=?&pageids=' + pageId,
            {
              'host': host,
              'User-Agent': 'WikipediaShorturl/' + admin
            }
          );
      request.end();

      request.on('response', function (response) {
        response.setEncoding('utf-8');
        response.on('data', function (chunk) {
          try {
            chunk = chunk.toString('utf8');
            chunk = chunk.substring(1, chunk.length - 1);
            var data = JSON.parse(chunk);
            for(var pageId in data.query.pages) {
              if(pageId > 0) {
                var page = data.query.pages[pageId];
                url = page.fullurl;
                break;
              }
            }
          } catch (e) {
            require('sys').puts("error when parsing json: " + e);
          }
          if(url) {
            cache.setItem(lang + ':' + pageId, url);
            res.redirect(url);
          } else {
            var html = problem({});
            res.simpleHtml(200, html);
          }
        });
      });
    }

  };
}


