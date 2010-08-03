var _ = require('../lib/underscore')._;

exports.app = function(env) {
  var supported = env.i18n.supported;
  var msg = env.i18n.msg;
  var baseUrl = env.baseUrl();
  var shorturl = env.templates['shorturl'];
  var unsupported = env.templates['unsupported'];

  return function(req, res, lang) {
    var html = undefined;
    if(_.indexOf(supported, lang) > -1) {
      html = shorturl({baseUrl: baseUrl, lang: lang, msg: msg});
    } else {
      html = unsupported({lang: lang, msg: msg});
    }
    res.simpleHtml(200, html);
    return;
  }
};


