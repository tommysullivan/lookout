module.exports = function(memoryHash, console) {
    return {
        persistEvent: function(eventJSON) {
            var shaKey = eventJSON.appSha256;
            if(!memoryHash.hasOwnProperty(shaKey)) {
                console.log('New SHA Key: '+shaKey);
                memoryHash[shaKey] = {}
            }
            var ipString = eventJSON.ip.toString();
            var shaHash = memoryHash[shaKey];
            if(!shaHash.hasOwnProperty(ipString)) shaHash[ipString] = 0;
            shaHash[ipString]++;
        },
        getIPsForSHA: function(shaKey, onComplete, onError) {
            if(!memoryHash.hasOwnProperty(shaKey)) return onError('Could not find shaKey in memory hash');
            var ips = []
            for(var ip in memoryHash[shaKey]) {
                ips.push(ip);
            }
            onComplete(ips);
        }
    }
}