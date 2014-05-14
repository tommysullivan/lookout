var http = require('http');
var fs = require('fs');
var Schema = require('protobuf').Schema;
var dgram = require('dgram');
var nano = require('nano');
var ConfigLoader = require('./config_loader');
var HttpServer = require('./http_server');
var UDPServerUsesCouchDB = require('./udp_server');
var CouchPersistanceLayer = require('./couch_persistance_layer');
var MemoryPersistanceLayer = require('./memory_persistance_layer');
var IPAnalyzer = require('./ip_analyzer');
var UniqueFilter = require('./unique_filter');

var configLoader = ConfigLoader(fs, JSON);
var config = configLoader.loadConfig();

var nanoDB = nano(config.couchDBURL).db;
var lookoutCouch = nanoDB.use(config.couchDBDatabase);
var nodeUDPServer = dgram.createSocket('udp4');

var ipEventProto = fs.readFileSync(config.ipEventProtoDescPath);
var schema = new Schema(ipEventProto);
var IpEvent = schema[config.ipEventSchemaFullyQualifiedName];

var uniqueFilter = UniqueFilter();
var persistanceLayer = config.persistanceType.toLowerCase()=='memory'
    ? MemoryPersistanceLayer({}, console)
    : CouchPersistanceLayer(config.eventsToQueueBeforeUploadToCouch, lookoutCouch, config.numberOfNewRecordsBeforeViewRecomputation, uniqueFilter);
var ipAnalyzer = IPAnalyzer(config.blockSize);
var httpServer = HttpServer(lookoutCouch, persistanceLayer, ipAnalyzer, console);
var udpServer = UDPServerUsesCouchDB(nodeUDPServer, config.udpPort, config.udpHost, persistanceLayer, IpEvent);

http.createServer(httpServer.handleHTTPRequest).listen(config.httpPort);
udpServer.beginListening();