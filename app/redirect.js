exports.app = function(env) {
  var problem = env.templates['problem'];

  return function(req, res, lang, title) {
    var pageId = parseInt(title.toLowerCase(), 36),
        host = lang + '.wikipedia.org';

    var http = require('http'),
        wp = http.createClient(80, host),
        request = wp.request('GET',
          '/w/api.php?action=query&prop=info&inprop=url&format=json&callback=?&pageids=' + pageId,
          {
            'host': host,
            'User-Agent': 'WikipediaShorturl/me@mingli-yuan.info'
          }
        );
    request.end();

    request.on('response', function (response) {
      response.setEncoding('utf-8');
      response.on('data', function (chunk) {
        var url = undefined;
        try {
          chunk = chunk.toString('utf8');
          chunk = chunk.substring(1, chunk.length - 1);
          require('sys').puts(chunk);
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
          res.redirect(url);
        } else {
          var html = problem({});
          res.simpleHtml(200, html);
        }
      });
    });
  };
}


