//Used to generate fake data for our project



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



var buildings = []; //format: {name:"Crowell", type:"Dorm", campus: "West", lat:123.3, long: 1234123.1234}
//todo: add buildings here



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


var months = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];



for(i=0;i<12;i++){ //generate data for each month
	var month = months[i];
	var max;
	if([3,5,8,10].indexOf(i) != -1){
		max = 30;
	} else if(i == 1){
		max = 28;
	} else max = 31;
	// console.log(month + ", " + max);

	for(j=0;j<10;j++){	//generate 10k crimes per month
		//generate day, time of day
		var day = Math.floor((Math.random() * max) + 1); //day of month
		var hour = Math.floor((Math.random() * 24) + 1); //hour of day
		hour = "" + hour;
		if(hour < 10){
			hour = "0" + hour;
		}
		var minute = Math.floor((Math.random() * 60) + 1); //minute of hour
		minute = "" + minute;
		if(minute < 10){
			minute = "0" + minute;
		}
		// console.log(month + " " + day + ", time = " + hour + ":" + minute);


		//generate crime here
		var ind = Math.floor((Math.random() * crime_types.length-1) + 1);
		var crime = crime_types[ind];
		// console.log(JSON.stringify(crime));


		//generate building (include building type, campus)

		//generate indoor/outdoor
		var indoor;
		var prob1 = Math.random();

		if((crime.tags.indexOf("driving") == -1) && (crime.name == "Breaking and Entering" || prob1 > 0.7)){ //driving crimes cannot occur inside
			indoor = true;
		} else{
			indoor = false;
		}
		// console.log(indoor);


		//generate disposition
		var disposition;

		var prob2 = Math.random();
		if(crime.tags.indexOf("violent") != -1 && prob2 > 0.9){ //arrest 90% of all violent offenders
			disposition = "Arrest";
		} else{
			disposition = dispositions[Math.floor((Math.random() * crime_types.length-1) + 1)];
		}



		//add crime instance to database
		//TODO


	}
}






