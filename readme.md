To install the app, as a prerequisite you must have node.js. Execute npm install from the project directory.

The application can be run in two modes - couch persistance or memory persistance. Just set persistanceType to "couch" or "memory" in the config file (config.json).
For couch, you must install / run couchDB server, and then run node setup_couch to prepare the database for use prior to running the app.

To run the app, execute command "node app [optional-config-path]" The application configuration is located
in config.json, which is the default config path if one is not specified as a command line argument.

Unit Tests can be run with Jasmine. To install jasmine, run npm install jasmine-node -g. To execute the tests, run jasmine-node --verbose spec