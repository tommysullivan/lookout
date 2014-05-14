module.exports = function(nodeUDPServer, udpPort, udpHost, persistanceLayer, IpEvent) {
    return {
        beginListening: function() {
            nodeUDPServer.on('listening', function () {
                var address = nodeUDPServer.address();
                console.log('UDP Server listening on ' + address.address + ":" + address.port);
            });
            nodeUDPServer.on('message', function (message, remote) {
                var event = IpEvent.parse(message);
                event.ip = parseInt(event.ip); //this was not properly converted to int by the proto parser
                persistanceLayer.persistEvent(event);
            });
            nodeUDPServer.bind(udpPort, udpHost);
        }
    }
}