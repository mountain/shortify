#!/usr/bin/env node

var fs = require('fs'),
server = require('./vendor/server'),
sys = require('sys');

var shortify = process.argv[1],
    len = shortify.length,
    path = shortify.substring(0, len - 11);

sys.puts("start shortify at " + path)

fs.readFile(process.argv[2] || path + 'settings.json', function(err, data) {
    var settings = {};

    if (err) {
        sys.puts('No settings.json found ('+err+'). Using default settings');
    } else {
        try {
            settings = JSON.parse(data.toString('utf8',0,data.length));
            settings.path = path;
        } catch (e) {
            sys.puts('Error parsing settings.json: '+e);
            process.exit(1);
        }
    }
    server.start(settings);
});

