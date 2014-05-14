To install the app, as a prerequisite you must have node.js. Execute npm install from the project directory.

The application can be run in two modes - couch persistance or memory persistance. Just set persistanceType to "couch" or "memory" in the config file (config.json).
For couch, you must install / run couchDB server, and then run node setup_couch to prepare the database for use prior to running the app.

To run the app, execute command "node app [optional-config-path]" The application configuration is located
in config.json, which is the default config path if one is not specified as a command line argument.

Unit Tests can be run with Jasmine. To install jasmine, run npm install jasmine-node -g. To execute the tests, run jasmine-node --verbose spec

Here is the client output. It always complains about dropping too many packets although the output JSON looks fine:

tsullivan-mbp:backend-coding-questions thomas.sullivan$ ./bin/lookout_backend_coding_q1_client --host 0.0.0.0  --tcp 3004 --udp 33333
/Users/thomas.sullivan/.rvm/gems/ruby-2.1.1/gems/forgery-0.6.0/lib/forgery/forgery/credit_card.rb:37: warning: shadowing outer local variable - card
Received {"count"=>22, "good_ips"=>["63070733", "475465420", "483007065", "3377432850", "3377432851", "3377432852", "3377432853", "3377432854", "3377432855", "3377432856", "3377432857", "3377432858", "3377432859", "3377432860", "3377432861", "3377432862"], "bad_ips"=>["1514983499", "2231113109", "2249017008", "2536454522", "3144865860", "3377432849"]}
/Users/thomas.sullivan/2014/Personal/Tommy/CodingExercise/backend-coding-questions/lib/lookout/backend_coding_questions/q1/client.rb:98:in `validate_response': Dropped too many packets: 22 out of 8797676 (RuntimeError)
	from /Users/thomas.sullivan/2014/Personal/Tommy/CodingExercise/backend-coding-questions/lib/lookout/backend_coding_questions/q1/client.rb:27:in `run'
	from ./bin/lookout_backend_coding_q1_client:35:in `<main>'