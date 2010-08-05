exports.app = function(env) {
  var baseUrl = env.baseUrl();

  return function(req, res) {
    res.redirect(baseUrl + '/s/');
    return;
  }
};


