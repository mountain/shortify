var indexOf = function(array, elt) {
  var len = array.length;
  for (var ind = 0; ind < len; ind++) {
    if (ind in array && array[ind] === elt)
      return ind;
  }
  return -1;
};

exports.app = function(env) {
  var supported = env.i18n.supported;
  var msg = env.i18n.msg;
  var baseUrl = env.baseUrl();

  return function(req, res, lang) {
    var html = '';
    html += '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
    if(indexOf(supported, lang) > -1) {
      html += '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="' + lang + '" lang="' + lang + '">';
      html +=     '<head>';
      html +=        '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
      html +=         '<title>' + msg[lang]['title'] + '</title>';
      html +=         '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript" charset="utf-8"></script>';
      html +=         '<script type="text/javascript" charset="utf-8">var lang="' + lang + '", host = "' + baseUrl + '";</script>';
      html +=         '<script src="/javascripts/application.js" type="text/javascript" charset="utf-8"></script>';
      html +=         '<link rel="stylesheet" href="/styles/style.css" type="text/css" media="screen" charset="utf-8" />';
      html +=     '</head>';
      html +=     '<body>';
      html +=         '<h2 id="title">' + msg[lang]['title'] + '</h2>';
      html +=         '<div id="querybox">' + msg[lang]['lable'] + '&nbsp;';
      html +=         '<input id="query" type=text value="' + msg[lang]['wiki'] + '">';
      html +=         '<input id="submit" type=submit value="' + msg[lang]['shortit'] + '"></div>';
      html +=         '<div id="result"></div>';
      html +=         '<p id="copy">by Mingli Yuan</p>';
      html +=         '<script type="text/javascript" charset="utf-8">$(app);</script>';
    } else {
      html += '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">';
      html +=     '<head>';
      html +=        '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
      html +=         '<title>Unsupported Language</title>';
      html +=         '<link rel="stylesheet" href="/styles/style.css" type="text/css" media="screen" charset="utf-8" />';
      html +=     '</head>';
      html +=     '<body>';
      html +=         '<h2 id="title">Unsupported Language ' + lang + '</h2>';
      html +=         '<p id="copy">by Mingli Yuan</p>';
    }
    html +=     '</body>';
    html += '</html>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    res.simpleHtml(200, html);
    return;
  }
};


