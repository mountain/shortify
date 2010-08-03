exports.app = function(env) {
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
        var sandbox = {};
        var code = 'val = ' + chunk + ';'
        Script = process.binding('evals').Script;
        Script.runInNewContext(code, sandbox, '');
        if(sandbox.val) {
            var data = sandbox.val;
            var url = undefined;
            for(var pageId in data.query.pages) {
              if(pageId > 0) {
                var page = data.query.pages[pageId];
                url = page.fullurl;
                break;
              }
            }
            if(url) {
              res.redirect(url);
            } else {
              var html = '';
              html += '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
              html += '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">';
              html +=     '<head>';
              html +=        '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
              html +=         '<title>Unsupported Language</title>';
              html +=         '<link rel="stylesheet" href="/styles/style.css" type="text/css" media="screen" charset="utf-8" />';
              html +=     '</head>';
              html +=     '<body>';
              html +=         '<h2 id="title">Sorry, network problems!</h2>';
              html +=         '<p id="copy">by Mingli Yuan</p>';
              html +=     '</body>';
              html += '</html>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
              res.simpleHtml(200, html);
            }
        }
      });
    });
  };
}


