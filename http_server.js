module.exports = function(lookoutCouch, persistanceLayer, ipAnalyzer, console) {
    return {
        handleHTTPRequest: function(req, res) {
            console.log('http request for '+req.url);
            if(req.url.indexOf('favicon.ico')!=-1) {
                res.writeHead(500);
                res.end();
            };

            var pathParts = req.url.split('/');
            var shaKey = pathParts[pathParts.length-1];

            function onComplete(uniqueIpNumbers) {
                var responseJSON = ipAnalyzer.analyzeIPs(uniqueIpNumbers);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(responseJSON));
            };

            function onError(error) {
                res.writeHead(500);
                res.end("Could not load events: app_sha = "+shaKey+'. Error Message: '+error.toString());
            }

            persistanceLayer.getIPsForSHA(shaKey, onComplete, onError);
        }
    }
}