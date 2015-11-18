//this program is used to generate fake data for our project

var fs = require('fs');

var crime_types = [
		//violent
		{name:"Arson", tags:["violent"]},
		{name:"Injury to personal property", tags:["violent"]},
		{name:"Weapon Possession", tags:["violent"]},
		{name:"Assault", tags:["violent"]},
		{name:"Moving Violation", tags:["driving"]},
		{name:"Driving while Intoxicated", tags:["driving", "alcohol/drugs"]},
		{name:"Indecent exposure", tags:["sex-related"]},
		{name:"Sexual assault", tags:["violent", "sex-related"]},
		{name:"Stalking", tags:["sex-related"]},
		{name:"Drug Possession", tags:["alcohol/drugs"]},
		{name:"Alcohol violation", tags:["alcohol/drugs"]},
		{name:"Underage Possession of Alcohol", tags:["alcohol/drugs"]},
		{name:"Fraud", tags:["theft, etc."]},
		{name:"Forgery and Uttering", tags:["theft, etc."]},
		{name:"Theft", tags:["theft, etc."]},
		{name:"Larceny", tags:["theft, etc."]},
		{name:"Burglary", tags:["theft, etc."]},
		{name:"Robbery", tags:["theft, etc."]},
		{name:"Armed Robbery", tags:["violent", "theft, etc."]},
		{name:"Breaking and Entering", tags:["trespassing, etc."]},
		{name:"Trespassing", tags:["trespassing, etc."]},
		{name:"Resist/Delay/Obstruction of justice", tags:["other"]}
    ];


var buildings = [
	//academic & administrative
	{name:"2022 Campus Drive", type:"Academic & Administrative", campus:"West", lat:36.000378, lon:-78.929905},
	{name:"218 Alexander", type:"Academic & Administrative", campus:"Central", lat:36.004661, lon:-78.927861},
	{name:"705 Broad St", type:"Academic & Administrative", campus:"East", lat:36.007891, lon:-78.920217},
	{name:"Allen Building", type:"Academic & Administrative", campus:"West", lat:36.001104, lon:-78.937502},
	{name:"Art Building", type:"Academic & Administrative", campus:"East", lat:36.009333, lon:-78.917134},
	{name:"Bevan Building", type:"Academic & Administrative", campus:"East", lat:36.001822, lon:-78.912823},
	{name:"Biddle Music Building", type:"Academic & Administrative", campus:"East", lat:36.009140, lon:-78.915895},
	{name:"Biological Sciences Building", type:"Academic & Administrative", campus:"West", lat:36.002259, lon:-78.943160},
	{name:"Biological Sciences Greenhouses", type:"Academic & Administrative", campus:"West", lat:36.002566, lon:-78.944293},
	{name:"Bivans Building", type:"Academic & Administrative", campus:"East", lat:36.008860, lon:-78.917469},
	{name:"Carr Building", type:"Academic & Administrative", campus:"East", lat:36.006486, lon:-78.915283},
	{name:"Center for Documentary Studies", type:"Academic & Administrative", campus:"East", lat:36.004117, lon:-78.918105},
	{name:"Center for Muslim Life", type:"Academic & Administrative", campus:"Central", lat:36.001885, lon:-78.922477},
	{name:"Childcare Facility", type:"Academic & Administrative", campus:"Central", lat:36.001202, lon:-78.926832},
	{name:"Crowell Building", type:"Academic & Administrative", campus:"East", lat:36.006445, lon:-78.913647},
	{name:"Divinity School", type:"Academic & Administrative", campus:"West", lat:36.002293, lon:-78.939436},
	{name:"Doris Duke Center", type:"Academic & Administrative", campus:"West", lat:36.002075, lon:-78.931468},
	{name:"East Duke Building", type:"Academic & Administrative", campus:"East", lat:36.004939, lon:-78.914147},
	{name:"Environment Hall", type:"Academic & Administrative", campus:"West", lat:36.004862, lon:-78.942137},
	{name:"Episcopal Center", type:"Academic & Administrative", campus:"Central", lat:36.001849, lon:-78.927025},
	{name:"Faculty Club", type:"Academic & Administrative", campus:"East", lat:35.996625, lon:-78.950737},
	{name:"Fitzpatrick Center for Interdisciplinary Engineering, Medicine, and Applied Sciences", type:"Academic & Administrative", campus:"West", lat:36.003600, lon:-78.939557},
	{name:"Flowers Building", type:"Academic & Administrative", campus:"West", lat:36.001382, lon:-78.939753},
	{name:"Freeman Center for Jewish Life", type:"Academic & Administrative", campus:"East", lat:36.000408, lon:-78.922261},
	{name:"French Family Science Center", type:"Academic & Administrative", campus:"West", lat:36.002814, lon:-78.943504},
	{name:"Friedl Building", type:"Academic & Administrative", campus:"East", lat:36.006471, lon:-78.914176},
	{name:"Fuqua School of Business", type:"Academic & Administrative", campus:"West", lat:35.999096, lon:-78.947368},
	{name:"Gross Hall", type:"Academic & Administrative", campus:"West", lat:36.001316, lon:-78.944754},
	{name:"Hart House", type:"Academic & Administrative", campus:"West", lat:35.992623, lon:-78.940655},
	{name:"Hudson Hall Engineering Building", type:"Academic & Administrative", campus:"West", lat:36.003999, lon:-78.940297},
	{name:"International House", type:"Academic & Administrative", campus:"Central", lat:36.005003, lon:-78.926632},
	{name:"Languages Building", type:"Academic & Administrative", campus:"West", lat:36.002305, lon:-78.938090},
	{name:"Law School Building", type:"Academic & Administrative", campus:"West", lat:35.999594, lon:-78.945179},
	{name:"Levine Science Research Center", type:"Academic & Administrative", campus:"West", lat:36.004749, lon:-78.941494},
	{name:"Marketplace (East Campus Union)", type:"Academic & Administrative", campus:"East", lat:36.007701, lon:-78.914130},
	{name:"Nicholas Institute", type:"Academic & Administrative", campus:"West", lat:36.004502, lon:-78.941916},
	{name:"North Building", type:"Academic & Administrative", campus:"West", lat:36.005493, lon:-78.940902},
	{name:"OIT-Telecommunications Building", type:"Academic & Administrative", campus:"West", lat:36.003576, lon:-78.938762},
	{name:"Old Chemistry Building", type:"Academic & Administrative", campus:"West", lat:36.002767, lon:-78.937733},
	{name:"Physics Building", type:"Academic & Administrative", campus:"West", lat:36.003399, lon:-78.942314},
	{name:"Sanford School of Public Policy", type:"Academic & Administrative", campus:"West", lat:35.999123, lon:-78.943052},
	{name:"School of Nursing", type:"Academic & Administrative", campus:"West", lat:36.006234, lon:-78.935142},
	{name:"Smith Warehouse", type:"Academic & Administrative", campus:"East", lat:36.002036, lon:-78.914827},
	{name:"Social Sciences Building", type:"Academic & Administrative", campus:"West", lat:36.001780, lon:-78.937478},
	{name:"Sociology-Psychology", type:"Academic & Administrative", campus:"West", lat:36.002551, lon:-78.937063},
	{name:"Student Health Center", type:"Academic & Administrative", campus:"West", lat:36.003333, lon:-78.935558},
	{name:"Teer Building", type:"Academic & Administrative", campus:"West", lat:36.004064, lon:-78.941097},
	{name:"The Plaza", type:"Academic & Administrative", campus:"West", lat:36.000803, lon:-78.940002},
	{name:"Trent Drive Hall", type:"Academic & Administrative", campus:"West", lat:36.007172, lon:-78.933803},
	{name:"Undergraduate Admissions", type:"Academic & Administrative", campus:"West", lat:35.999895, lon:-78.933184},
	{name:"West Duke Building", type:"Academic & Administrative", campus:"East", lat:36.004955, lon:-78.915396},
	{name:"White Lecture Hall", type:"Academic & Administrative", campus:"East", lat:36.005264, lon:-78.913910},
	//TODO: Housing, Dining, Athletics, Performance
	//parking
	{name:"Allen Lot", type:"Parking", campus: "West", lat:36.001760, lon: -78.936692},
	{name:"Biddle Music Lot", type:"Parking", campus: "East", lat:36.009326, lon: -78.915372},
	{name:"Blue Zone Lot", type:"Parking", campus: "West", lat: 35.996298, lon: -78.938656},
	{name:"Brown Lot", type:"Parking", campus: "East", lat: 36.008425, lon: -78.913738},
	{name:"Brian Center Lot", type:"Parking", campus: "West", lat: 36.002018, lon: -78.941392},
	{name:"Brian Center Parking Garage", type:"Parking", campus: "West", lat: 36.001785, lon: -78.942175},
	{name:"Wilson Lot", type:"Parking", campus: "West", lat: 35.998219, lon: -78.940893},
	{name:"Central Housing Lot 1", type:"Parking", campus: "Central", lat: 36.003898, lon: -78.930416},
	{name:"Central Housing Lot 2", type:"Parking", campus: "Central", lat: 36.004430, lon: -78.928560},
	{name:"Central Housing Lot 3", type:"Parking", campus: "Central", lat: 36.004037, lon: -78.926007},
	{name:"Duke Police Lot", type:"Parking", campus: "Central", lat: 36.001877, lon: -78.926463},
	{name:"Edens B Lot", type:"Parking", campus: "West", lat: 35.997887, lon: -78.938039},
	{name:"Edens C Lot", type:"Parking", campus: "West", lat: 35.997513, lon: -78.936912},
	{name:"Edens D Lot", type:"Parking", campus: "West", lat: 35.998839, lon: -78.934928},
	{name:"Epworth Lot", type:"Parking", campus: "East", lat: 36.005942, lon: -78.912773},
	{name:"H Lot", type:"Parking", campus: "Central", lat: 36.006167, lon: -78.931285},
	{name:"IM Lot", type:"Parking", campus: "West", lat: 35.996126, lon: -78.939461},
	{name:"Law School Lot", type:"Parking", campus: "West", lat: 35.999857, lon: -78.946391},
	{name:"Public Policy Lot", type:"Parking", campus: "West", lat: 35.998562, lon: -78.942727},
	{name:"Smith Warehouse Lot N", type:"Parking", campus: "East", lat: 36.002742, lon: -78.914956},
	{name:"Smith Warehouse Lot S", type:"Parking", campus: "East", lat: 36.001760, lon: -78.915707},
	{name:"Southgate Lot", type:"Parking", campus: "East", lat: 36.006322, lon: -78.918335},
	//medical
	{name:"Davidson Building", type:"Medical", campus: "West", lat: 36.003114, lon: -78.936918},
	{name:"Duke Children's Hospital", type:"Medical", campus: "West", lat: 36.007402, lon: -78.937293},
	{name:"Duke Hospital", type:"Medical", campus: "West", lat: 36.006811, lon: -78.937476},
	{name:"Duke Student Health", type:"Medical", campus: "West", lat: 36.003244, lon: -78.935663},
	{name:"Duke VA Medical Center", type:"Medical", campus: "West", lat: 36.008981, lon: -78.938409},
	{name:"Global Health Research Building", type:"Medical", campus: "West", lat: 36.008027, lon: -78.943398},
	{name:"Snyderman Genome Science Research Building", type:"Medical", campus: "West", lat: 36.007254, lon: -78.944589},
	//library
	{name:"Bostock Library", type:"Library", campus:"West", lat: 36.003135, lon: -78.938318},
	{name:"Perkins Library", type: "Library", campus: "West", lat: 36.002542, lon: -78.938575},
	{name:"Rubenstein Rare Books Library", type: "Library", campus: "West", lat: 36.001992, lon: -78.938503},
	{name:"Goodson Law Library", type: "Library", campus: "West", lat: 35.999894, lon: -78.945152},
	{name:"Lilly Library", type: "Library", campus: "East", lat: 36.007732, lon: -78.915347},
	//store
	{name:"Bryan Center Lobby Shop", type:"Store", campus:"West", lat: 36.000977, lon: -78.940812},
	{name:"East Campus Store", type:"Store", campus: "East", lat: 36.007646, lon: -78.914092},
	{name:"Gothic Bookshop", type:"Store", campus: "West", lat: 36.000795, lon: -78.940643}

];



var dispositions = [
		"Arrest",
		"Cleared by Referral",
		"Closed",
		"Closed-SC",
		"Exceptionally Cleared",
		"Pending",
		"Unfounded"
	];


//GENERATE DATA HERE


// var months = ["January", "February", "March", "April", "May", "June",
// 		"July", "August", "September", "October", "November", "December"];

var out = [];
var id = -2;

for(i=0;i<12;i++){ //generate data for each month
	id ++;
	var month = i + 1;
	var max;
	if([3,5,8,10].indexOf(i) != -1){
		max = 30;
	} else if(i == 1){
		max = 28;
	} else max = 31;
	// console.log(month + ", " + max);

	for(j=0;j<10;j++){	//generate 10k crimes per month 
		id ++;
		//generate day, time of day
		var day = Math.floor((Math.random() * max) + 1); //day of month
		var hour = Math.floor((Math.random() * 24)); //hour of day
		hour = "" + hour;
		if(hour < 10){
			hour = "0" + hour;
		}
		var minute = Math.floor((Math.random() * 60)); //minute of hour
		minute = "" + minute;
		if(minute < 10){
			minute = "0" + minute;
		}
		// console.log(month + " " + day + ", time = " + hour + ":" + minute);


		//generate crime here
		var ind = Math.floor((Math.random() * (crime_types.length-1)));
		var crime = crime_types[ind];
		crime.id = id;
		// console.log(JSON.stringify(crime));


		//generate building (include building type, campus)
		var ind2 = Math.floor((Math.random() * (buildings.length-1)));
		var building = buildings[ind2];

		//generate indoor/outdoor
		var indoor;
		var prob1 = Math.random();

		if(crime.tags.indexOf("driving") == -1 && building.type != "Parking" && (crime.name == "Breaking and Entering" || prob1 > 0.7)){ //driving crimes cannot occur inside
			indoor = "inside";
		} else{
			indoor = "outside";
		}
		// console.log(indoor);


		//generate disposition
		var disposition;

		var prob2 = Math.random();
		if(crime.tags.indexOf("violent") != -1 && prob2 > 0.9){ //arrest 90% of all violent offenders
			disposition = "Arrest";
		} else{
			disposition = dispositions[Math.floor((Math.random() * dispositions.length-1) + 1)];
		}

		// console.log(month + " " + day + ", " + hour + ":" + minute);
		// console.log(crime);
		// console.log(building);
		// console.log(indoor);
		// console.log(disposition);

		//TODO: add crime instance to database
		// if(i<11 || j < 10){
		// 	out += {date: month + "/" + day + "/15, time: " + hour + ":" + minute + ", crime: "+ JSON.stringify(crime) + ", building: " + JSON.stringify(building) + ", disposition: " + disposition + ", inside: " + indoor};
		// } else{
			var out_line = {date: month + "/" + day + "/15", time: hour + ":" + minute, crime: crime, building: building, disposition: disposition, inside: indoor};
			out.push(out_line);
		// }
		
	}
}



fs.writeFile('data.json', JSON.stringify(out), function (err) {
  	if (err){
  		throw err;
  	} else{
  		console.log('done.');
  	}
});



