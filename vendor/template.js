var sys = require('sys'),
    _   = require('../lib/underscore')._;

exports.load = function(env) {
  env.templates = {};

  var fs = require('fs');
  fs.readdir('./app/templates', function(err, files) {
    if (err) {
      sys.puts('No template found (' + err + ').');
    } else {
      _(files).chain().select(function(file) { return file.match(/.+\.erb$/); } ).each(
        function(file) {
          fs.readFile('./app/templates/' + file, function(err, data) {
            if(!err) try {
              var tmpl = file.substring(0, file.length - 4);
              env.templates[tmpl] = _.template(
                data.toString('utf8', 0, data.length)
              );
            } catch (e) {
              sys.puts('Error parsing template: ' + e);
            }
          });
        }
      );
    }
  });
}

