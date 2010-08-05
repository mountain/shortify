var _    = require('../lib/underscore')._,
    util = require('../vendor/util');

exports.app = function(env) {
  var supported = env.i18n.supported;
  var msg = env.i18n.msg;
  var baseUrl = env.baseUrl();
  var shorturl = env.templates['shorturl'];
  var unsupported = env.templates['unsupported'];

  return function(req, res, lang) {
    var html = undefined;
    var lang = lang || 'en';
    if(_.indexOf(supported, lang) > -1) {
      var dir = util.htmlDir(env, lang);
      html = shorturl({baseUrl: baseUrl, lang: lang, msg: msg, dir: dir, supported: supported});
    } else {
      html = unsupported({lang: lang, msg: msg});
    }
    res.simpleHtml(200, html);
    return;
  }
};


