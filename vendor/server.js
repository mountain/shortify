var _ = require('../lib/underscore')._,
    router = require('./node-router'),
    i18n = require('../config/i18n').i18n,
    routers = require('../config/routers').routers;

var env = {
  host: 'localhost',
  port: 8080,
  baseUrl: function() {
    if(this.port===80)
      return 'http://' + this.host;
    else
      return 'http://' + this.host + ':' + this.port;
  },
  i18n: i18n,
  routers: routers
};

exports.start = function(settings) {

  _.extend(env, settings);

  var server = router.getServer();

  _(routers).chain().keys().each(function(key) {
      server.get(routers[key], require('../app/' + key).app(env));
  });

  server.get(new RegExp("^/(.+)$"), router.staticDirHandler('./public'));

  server.listen(env.port);

}


