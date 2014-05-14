var nano = require('nano');
var fs = require('fs');
var ConfigLoader = require('./config_loader');

var configLoader = ConfigLoader(fs, JSON);
var config = configLoader.loadConfig();
var nanoDB = nano(config.couchDBURL).db;
var lookoutDBName = config.couchDBDatabase;

nanoDB.destroy(lookoutDBName, function(err, body) {
    if(err) console.log(err);
    nanoDB.create(lookoutDBName, function(err, body) {
        var lookoutCouch = nanoDB.use(lookoutDBName);
        var eventsDesignDoc = {
            "_id": "_design/events",
            "language": "javascript",
            "views": {
                "ips_by_app_sha": {
                    //TODO: Add a show to eliminate unnecessary JSON values
                    //TODO: Reduce to unique IPs or an IP count
                    "map": function(doc) {
                        emit(doc.appSha256, doc.ip);
                    }.toString()
                }
            }
        }
        lookoutCouch.insert(eventsDesignDoc, function(err, result) {
            console.log(err);
            console.log(result);
        });
    });
});