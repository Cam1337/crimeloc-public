var express = require('express');

var cfenv = require('cfenv');

// create a new express server
var app = express();


//handler for client-side ajax GET request
app.get('/query',function(req, res){
	console.log(req.query);
	var building = req.query.building
	var crime = req.query.crime
	var date = req.query.date
	var campus = req.query.campus

	var locs;
	//TODO: query database for information here


	//hard-coded data for 2 locations
	// locs = [{lat:"36.0011", lon:"-78.9387", crime:"larceny",loc:{building:"", campus:""}}, {lat:"36.0017", lon:"-78.9391", crime:"alcohol violation",loc:{building:"", campus:""}}];

	//hard-coded data for 3 locations
	locs = [{lat:"36.0011", lon:"-78.9387", crime:"larceny",loc:{building:"", campus:""}}, {lat:"36.0017", lon:"-78.9391", crime:"alcohol violation",loc:{building:"", campus:""}}, {lat:"36.0201", lon:"-78.9400", crime:"vandalism",loc:{building:"", campus:""}}];


	res.send(locs);



});




// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
