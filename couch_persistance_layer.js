module.exports = function(eventsToQueueBeforeUploadToCouch, lookoutCouch, numberOfNewRecordsBeforeViewRecomputation, uniqueFilter) {
    var queuedEvents = []
    var numMessages = 0;
    return {
        persistEvent: function(eventJSON) {
            numMessages++;
            queuedEvents.push(eventJSON);
            if(queuedEvents.length==eventsToQueueBeforeUploadToCouch) {
                var bulkRequest = {
                    allOrNothing: true,
                    docs: queuedEvents
                }
                lookoutCouch.bulk(bulkRequest, function(err, body) {
                    if(err) throw new Error("problem sending data to couch: "+err);
                });
                while(queuedEvents.length > 0) {
                    queuedEvents.pop();
                }
            }
            if(++numMessages % numberOfNewRecordsBeforeViewRecomputation == 0) lookoutCouch.view('events', 'ips_by_app_sha');
        },
        getIPsForSHA: function(shaKey, onComplete, onError) {
            lookoutCouch.view('events', 'ips_by_app_sha', {keys: [shaKey]}, function(error, response) {
                if(error) return onError(error);
                var ipsAsNumbers = response.rows.map(function(event) { return event.value; });
                var uniqueIpNumbers = uniqueFilter.filter(ipsAsNumbers);
                onComplete(uniqueIpNumbers);
            });
        }
    }
}