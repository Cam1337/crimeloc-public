var express = require('express');

var cfenv = require('cfenv');

var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');

// create a new express server
var app = express();


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
	var time1 = req.query.time1;
	var time2 = req.query.time2;
	var campus = JSON.parse('[' + req.query.campus + ']')[0];
	var locs = [];

	//TODO: Finish SQL DB Queries here
	db.serialize(function() {
	  	var query_params = "";
	  	if(date1 != ""){
	  		query_params = query_params + " and Crime.Date >= '" + date1 + "'";
	  	}
	  	if(date2 != ""){
	  		query_params = query_params + " and Crime.Date <= '" + date2 + "'";
	  	}
	  	if(time1 != ""){
	  		query_params = query_params + " and Crime.Time >= '" + time1 + "'";
	  	}
	  	if(time2 != ""){
	  		query_params = query_params + " and Crime.Time <= '" + time2 + "'";
	  	}

	  	if(crime[0] != "" || crime.length > 1){
	  		query_params = query_params + " and (Crime.Type == '" + crime[0] + "'";
	  		for(i=1; i< crime.length; i++){
	  			var temp_crime = crime[i];
	  			query_params = query_params + " or Crime.Type == '" + temp_crime + "'";
	  		}
	  		query_params = query_params + ")";
	  	}

	  	if(building[0] != "" || building.length > 1){
	  		query_params = query_params + " and (Building.Type == '" + building[0] + "'";
	  		for(i=1; i< building.length; i++){
	  			var temp_building = building[i];
	  			query_params = query_params + " or Building.Type == '" + temp_building + "'";
	  		}
	  		query_params = query_params + ")";
	  	}

	  	if(campus.length > 0){
	  		query_params = query_params + " and (Building.Campus == '" + campus[0] + "'";
	  		if(campus.length > 1){
		  		for(i=1; i < campus.length; i++){
		  			var temp_campus = campus[i];
		  			query_params = query_params + " or Building.Campus == '" + temp_campus + "'";
		  		}
	  		}
	  		query_params = query_params + ")";
	  	}

	  	console.log(query_params);
	  	//TODO add params
	  	db.each("SELECT * FROM Building, Crime WHERE Crime.Area_Name == Building.Name" + query_params + " LIMIT 200", function(err, row) {
 	   		if(err){
 	   			console.log(err);
 	   		} else{
	 	   		// console.log(row);
	 	   		locs.push({time: row.Time, date: row.Date, lat:row.Lat, lon:row.Lon, crime: row.Type, disposition: row.Disposition, exterior: row.Exterior, loc: {building: row.Name, campus: row.Campus}});
 	   		}
	  	});

	  	db.each("", function(){ //by serializing, waits for all data before sending locs
			res.send(locs);
	  	});

	});

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
