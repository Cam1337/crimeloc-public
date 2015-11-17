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





var buildings = [
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
	{name:"White Lecture Hall", type:"Academic & Administrative", campus:"East", lat:36.005264, lon:-78.913910}




]; //format: {name:"Crowell", type:"Dorm", campus: "West", lat:123.3, long: 1234123.1234}
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
