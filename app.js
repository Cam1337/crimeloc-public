var express = require('express');

var cfenv = require('cfenv');

var fs = require('fs');

// create a new express server
var app = express();

//TODO: Remove this once SQL DB Queries Implemented
var dat;
fs.readFile('data.json', 'utf8', function (err, data) {
  	if (err){
  		throw err;
	} else{

  		dat = JSON.parse(data);
	}
});
//END DELETE


//handler for client-side ajax GET request
app.get('/query',function(req, res){
	console.log(req.query);
	var building = JSON.parse('[' + req.query.building + ']')[0];
	if(building[0] === null){
		building[0] = '';
	}
	var crime = JSON.parse('[' + req.query.crime + ']')[0];
	if(crime[0] === null){
		crime[0] = '';
	}
	var date1 = req.query.date1;
	var date2 = req.query.date2;
	var time1 = req.query.time1.split(":");
	var time2 = req.query.time2.split(":");
	time1[0] = parseInt(time1[0]);
	time1[1] = parseInt(time1[1]);
	time2[0] = parseInt(time2[0]);
	time2[1] = parseInt(time2[1]);
	var campus = JSON.parse('[' + req.query.campus + ']')[0];

	var locs = [];

	//TODO: DELETE THIS, REPLACE WITH SQL QUERIES
	for(i=0; i<dat.length; i++){
		var temp = dat[i];
		var t = temp.time.split(":");
		t[0] = parseInt(t[0]);
		t[1] = parseInt(t[1]);
		// console.log(temp.date);
		if((building.indexOf(temp.building.type) != -1 || building[0] === '') &&
			(date1 <= temp.date || date1 === '') &&
			(date2 >= temp.date || date2 === '') &&
			((time1[0] < t[0]) || (time1[0] === t[0] && time1[1] <= t[1]) || String(time1[0]) === "NaN") &&
			((time2[0] > t[0]) || (time2[0] === t[0] && time2[1] >= t[1]) || String(time2[0]) === "NaN") &&
			(campus.indexOf(temp.building.campus) != -1 || campus.length === 0)
		){
			var crime_match;
			if(crime[0] === ''){
				crime_match = true;
			} else{
				crime_match = false;
				for(x=0; x<temp.crime.tags.length; x++){
					var c = temp.crime.tags[x];
					if(crime.indexOf(c) != -1){
						crime_match = true;
						break;
					}
				}
			}
			if(crime_match){
				locs.push({lat:temp.building.lat, lon:temp.building.lon, crime: temp.crime.name, loc: {building: temp.building.name, campus: temp.building.campus}});
			}
		}
	}
	//TODO: STOP DELETE HERE

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
