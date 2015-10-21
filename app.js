var express = require('express');

var cfenv = require('cfenv');

// create a new express server
var app = express();



//attempt at retrieving data for database
// var data = '';
// var htmlparser = require('htmlparser');
// var superagent = require('superagent');

// var handler = new htmlparser.DefaultHandler(function(err, dom){
// 	if(err){
// 		console.log(err);
// 	} else{
// 		data = dom;
// 	}
// });

// superagent.get('http://police.duke.edu/news_stats/summaries/weekly/081615.html', function(err, res){
// 	if(err){
// 		console.log(err);
// 	} else{
// 		var dat = res.text;
// 		// console.log(dat);
// 		var parser = new htmlparser.Parser(handler);
// 		parser.parseComplete(dat);
// 		console.log(data[2]);
// 	}
// });

//handler for client-side ajax GET request
app.get('/query',function(req, res){
	console.log(req.query);
	var building = req.query.building
	var crime = req.query.crime
	var date = req.query.date
	var campus = req.query.campus
	//hard-coded data for client-side handler testing
	res.send([{lat:"36.0011", lon:"-78.9387", crime:"larceny",loc:{building:"", campus:""}}, {lat:"36.0017", lon:"-78.9391", crime:"alcohol violation",loc:{building:"", campus:""}}]);
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
