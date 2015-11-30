//this program is used to generate fake data for our project

var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');

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
		//TODO: add/remove crimes, take out sexual assault?
    ];


var buildings = [
	//Academic/Administrative
	{name:"2022 Campus Drive", type:"Academic/Administrative", campus:"West", lat:36.000378, lon:-78.929905},
	{name:"218 Alexander", type:"Academic/Administrative", campus:"Central", lat:36.004661, lon:-78.927861},
	{name:"705 Broad St", type:"Academic/Administrative", campus:"East", lat:36.007891, lon:-78.920217},
	{name:"Allen Building", type:"Academic/Administrative", campus:"West", lat:36.001104, lon:-78.937502},
	{name:"Art Building", type:"Academic/Administrative", campus:"East", lat:36.009333, lon:-78.917134},
	{name:"Bevan Building", type:"Academic/Administrative", campus:"East", lat:36.001822, lon:-78.912823},
	{name:"Biddle Music Building", type:"Academic/Administrative", campus:"East", lat:36.009140, lon:-78.915895},
	{name:"Biological Sciences Building", type:"Academic/Administrative", campus:"West", lat:36.002259, lon:-78.943160},
	{name:"Biological Sciences Greenhouses", type:"Academic/Administrative", campus:"West", lat:36.002566, lon:-78.944293},
	{name:"Bivans Building", type:"Academic/Administrative", campus:"East", lat:36.008860, lon:-78.917469},
	{name:"Carr Building", type:"Academic/Administrative", campus:"East", lat:36.006486, lon:-78.915283},
	{name:"Center for Documentary Studies", type:"Academic/Administrative", campus:"East", lat:36.004117, lon:-78.918105},
	{name:"Center for Muslim Life", type:"Academic/Administrative", campus:"Central", lat:36.001885, lon:-78.922477},
	{name:"Childcare Facility", type:"Academic/Administrative", campus:"Central", lat:36.001202, lon:-78.926832},
	{name:"Crowell Building", type:"Academic/Administrative", campus:"East", lat:36.006445, lon:-78.913647},
	{name:"Divinity School", type:"Academic/Administrative", campus:"West", lat:36.002293, lon:-78.939436},
	{name:"Doris Duke Center", type:"Academic/Administrative", campus:"West", lat:36.002075, lon:-78.931468},
	{name:"East Duke Building", type:"Academic/Administrative", campus:"East", lat:36.004939, lon:-78.914147},
	{name:"Environment Hall", type:"Academic/Administrative", campus:"West", lat:36.004862, lon:-78.942137},
	{name:"Episcopal Center", type:"Academic/Administrative", campus:"Central", lat:36.001849, lon:-78.927025},
	{name:"Faculty Club", type:"Academic/Administrative", campus:"East", lat:35.996625, lon:-78.950737},
	{name:"Fitzpatrick Center for Interdisciplinary Engineering, Medicine, and Applied Sciences", type:"Academic/Administrative", campus:"West", lat:36.003600, lon:-78.939557},
	{name:"Flowers Building", type:"Academic/Administrative", campus:"West", lat:36.001382, lon:-78.939753},
	{name:"Freeman Center for Jewish Life", type:"Academic/Administrative", campus:"East", lat:36.000408, lon:-78.922261},
	{name:"French Family Science Center", type:"Academic/Administrative", campus:"West", lat:36.002814, lon:-78.943504},
	{name:"Friedl Building", type:"Academic/Administrative", campus:"East", lat:36.006471, lon:-78.914176},
	{name:"Fuqua School of Business", type:"Academic/Administrative", campus:"West", lat:35.999096, lon:-78.947368},
	{name:"Gross Hall", type:"Academic/Administrative", campus:"West", lat:36.001316, lon:-78.944754},
	{name:"Hart House", type:"Academic/Administrative", campus:"West", lat:35.992623, lon:-78.940655},
	{name:"Hudson Hall Engineering Building", type:"Academic/Administrative", campus:"West", lat:36.003999, lon:-78.940297},
	{name:"International House", type:"Academic/Administrative", campus:"Central", lat:36.005003, lon:-78.926632},
	{name:"Languages Building", type:"Academic/Administrative", campus:"West", lat:36.002305, lon:-78.938090},
	{name:"Law School Building", type:"Academic/Administrative", campus:"West", lat:35.999594, lon:-78.945179},
	{name:"Levine Science Research Center", type:"Academic/Administrative", campus:"West", lat:36.004749, lon:-78.941494},
	{name:"Marketplace (East Campus Union)", type:"Academic/Administrative", campus:"East", lat:36.007701, lon:-78.914130},
	{name:"Nicholas Institute", type:"Academic/Administrative", campus:"West", lat:36.004502, lon:-78.941916},
	{name:"North Building", type:"Academic/Administrative", campus:"West", lat:36.005493, lon:-78.940902},
	{name:"OIT-Telecommunications Building", type:"Academic/Administrative", campus:"West", lat:36.003576, lon:-78.938762},
	{name:"Old Chemistry Building", type:"Academic/Administrative", campus:"West", lat:36.002767, lon:-78.937733},
	{name:"Physics Building", type:"Academic/Administrative", campus:"West", lat:36.003399, lon:-78.942314},
	{name:"Sanford School of Public Policy", type:"Academic/Administrative", campus:"West", lat:35.999123, lon:-78.943052},
	{name:"School of Nursing", type:"Academic/Administrative", campus:"West", lat:36.006234, lon:-78.935142},
	{name:"Smith Warehouse", type:"Academic/Administrative", campus:"East", lat:36.002036, lon:-78.914827},
	{name:"Social Sciences Building", type:"Academic/Administrative", campus:"West", lat:36.001780, lon:-78.937478},
	{name:"Sociology-Psychology", type:"Academic/Administrative", campus:"West", lat:36.002551, lon:-78.937063},
	{name:"Student Health Center", type:"Academic/Administrative", campus:"West", lat:36.003333, lon:-78.935558},
	{name:"Teer Building", type:"Academic/Administrative", campus:"West", lat:36.004064, lon:-78.941097},
	{name:"The Plaza", type:"Academic/Administrative", campus:"West", lat:36.000803, lon:-78.940002},
	{name:"Trent Drive Hall", type:"Academic/Administrative", campus:"West", lat:36.007172, lon:-78.933803},
	{name:"Undergraduate Admissions", type:"Academic/Administrative", campus:"West", lat:35.999895, lon:-78.933184},
	{name:"West Duke Building", type:"Academic/Administrative", campus:"East", lat:36.004955, lon:-78.915396},
	{name:"White Lecture Hall", type:"Academic/Administrative", campus:"East", lat:36.005264, lon:-78.913910},
	//TODO: Housing, Dining, Athletics, Performance
	//Athletics
	{name:"Ambler Tennis Stadium", type:"Athletics", campus:"West", lat:35.997974, lon:-78.940171},
	{name:"Brodie Recreation Center", type:"Athletics", campus:"East", lat:36.007640, lon:-78.917079},
	{name:"Brooks Football Building", type:"Athletics", campus:"West", lat:35.993236, lon:-78.941129},
	{name:"Cameron Indoor Stadium", type:"Athletics", campus:"West", lat:35.997794, lon:-78.942284},
	{name:"Card Gymnasium", type:"Athletics", campus:"West", lat:35.997433, lon:-78.941306},
	{name:"Intramural Building", type:"Athletics", campus:"West", lat:35.996635, lon:-78.939927},
	{name:"Jack Coombs Field Baseball Stadium", type:"Athletics", campus:"West", lat:35.998014, lon:-78.944256},
	{name:"Koskinen Stadium", type:"Athletics", campus:"West", lat:35.995792, lon:-78.943999},
	{name:"Krzyzewski Center for Athletic Excellence", type:"Athletics", campus:"West", lat:35.997945, lon:-78.942926},
	{name:"Murray Building", type:"Athletics", campus:"West", lat:35.996316, lon:-78.942899},
	{name:"Pascal Field House", type:"Athletics", campus:"West", lat:35.993566, lon:-78.942009},
	{name:"Schwartz-Butters Athletic Center", type:"Athletics", campus:"West", lat:35.998262, lon:-78.942234},
	{name:"Sheffield Tennis Center", type:"Athletics", campus:"West", lat:35.997059, lon:-78.939477},
	{name:"Taishoff Aquatic Pavillion", type:"Athletics", campus:"West", lat:35.996820, lon:-78.941129},
	{name:"Village Gym", type:"Athletics", campus:"Central", lat:36.004842, lon:-78.929590},
	{name:"Wallace Wade Stadium", type:"Athletics", campus:"West", lat:35.995358, lon:-78.941789},
	{name:"Williams Field", type:"Athletics", campus:"East", lat:36.007891, lon:-78.918829},
	{name:"Wilson Recreation Center", type:"Athletics", campus:"West", lat:35.997007, lon:-78.940866},
	{name:"Yoh Football Center", type:"Athletics", campus:"West", lat:35.996695, lon:-78.941638},

	//Performance
	{name:"Arts Annex", type:"Performance", campus:"East", lat:35.999755, lon:-78.918850},
	{name:"Baldwin Auditorium", type:"Performance", campus:"East", lat:36.009020, lon:-78.914623},
	{name:"Bone Hall", type:"Performance", campus:"East", lat:36.009072, lon:-78.915889},
	{name:"Brody Theater", type:"Performance", campus:"East", lat:36.009546, lon:-78.916479},
	{name:"Brown Gallery", type:"Performance", campus:"West", lat:36.001118, lon:-78.941681},
	{name:"Bryan Center Box Office", type:"Performance", campus:"West", lat:36.000953, lon:-78.940845},
	{name:"Duke Chapel", type:"Performance", campus:"West", lat:36.000528, lon:--78.938935},
	{name:"Duke CoffeeHouse", type:"Performance", campus:"East", lat:36.006773, lon:-78.913330},
	{name:"Frederic Jameson Gallery", type:"Performance", campus:"West", lat:36.006522, lon:-78.914108},
	{name:"Griffith Film Theater", type:"Performance", campus:"West", lat:36.001398, lon:-78.941590},
	{name:"Mary Lou WIlliams Center for Black Culture", type:"Performance", campus:"West", lat:36.001398, lon:-78.941590},
	{name:"Nasher Art Museum", type:"Performance", campus:"West", lat:35.999113, lon:-78.928957},
	{name:"Nelson Music Room", type:"Performance", campus:"West", lat:36.004911, lon:-78.914280},
	{name:"Page Auditorium", type:"Performance", campus:"West", lat:36.001147, lon:-78.940061},
	{name:"Reynolds Theater", type:"Performance", campus:"West", lat:36.001803, lon:-78.942073},
	{name:"Sarah P. Duke Gardens", type:"Performance", campus:"West", lat:36.001325, lon:-78.941885},
	{name:"Sheafer Lab Theater", type:"Performance", campus:"West", lat:36.001325, lon:-78.941885},
	{name:"The Ark", type:"Performance", campus:"West", lat:36.007176, lon:-78.913497},
	{name:"Trent Gallery", type:"Performance", campus:"West", lat:36.006977, lon:-78.933624},




	//Dining
	{name:"Au Bon Pain", type:"Dining", campus:"West", lat:36.000849, lon:-78.940845},
	{name:"Bella Union", type:"Dining", campus:"West", lat:35.999260, lon:-78.936982},
	{name:"Blue Express", type:"Dining", campus:"West", lat:36.004321, lon:-78.941714},
	{name:"Cafe at Smith Warehouse", type:"Dining", campus:"East", lat:36.001902, lon:-78.914559},
	{name:"Divinity Cafe", type:"Dining", campus:"West", lat:36.002288, lon:-78.939729},
	{name:"Dolce Vita", type:"Dining", campus:"West", lat:36.002914, lon:-78.943360},
	{name:"Devil's Bistro", type:"Dining", campus:"Central", lat:36.004277, lon:-78.92901},
	{name:"Freeman Center", type:"Dining", campus:"Central", lat:36.000163, lon:-78.922241},
	{name:"Grace's Cafe", type:"Dining", campus:"West", lat:36.007075, lon:-78.933570},
	{name:"Joe Van Gogh", type:"Dining", campus:"West", lat:36.000932, lon:-78.940673},
	{name:"Marketplace", type:"Dining", campus:"East", lat:36.007689, lon:-78.914092},
	{name:"McDonald's", type:"Dining", campus:"West", lat:36.001326, lon:-78.941467},
	{name:"NOSH", type:"Dining", campus:"West", lat:36.005779, lon:-78.937765},
	{name:"Nasher Museum Cafe", type:"Dining", campus:"Central", lat:35.999333, lon:-78.929300},
	{name:"Panda Express", type:"Dining", campus:"West", lat:36.001153, lon:-78.940791},
	{name:"Penn Pavillion", type:"Dining", campus:"West", lat:36.000111, lon:-78.940845},
	{name:"Pitchfork Provisions", type:"Dining", campus:"West", lat:35.999147, lon:-78.936843},
	{name:"Quenchers", type:"Dining", campus:"West", lat:35.997082, lon:-78.941027},
	{name:"Red Mango", type:"Dining", campus:"West", lat:36.001153, lon:-78.941166},
	{name:"Saladelia Cafe @ Sanford", type:"Dining", campus:"West", lat:35.998965, lon:-78.942990},
	{name:"Saladelia at the Perk", type:"Dining", campus:"West", lat:36.002290, lon:-78.938441},
	{name:"Terrace Cafe", type:"Dining", campus:"Central", lat:36.001239, lon:-78.934697},
	{name:"Trinity Cafe", type:"Dining", campus:"East", lat:36.007506, lon:-78.914162},
	{name:"Twinnie's", type:"Dining", campus:"West", lat:36.003340, lon:-78.939664},
	//Housing
	//east
	{name:"Alspaugh Residence Hall", type:"Housing", campus:"East", lat:36.008148, lon:-78.915128},
	{name:"Basset Residence Hall", type:"Housing", campus:"East", lat:36.008695, lon:-78.914183},
	{name:"Bell Tower Residence Hall", type:"Housing", campus:"East", lat:36.007002, lon:-78.917896},
	{name:"Blackwell Residence Hall", type:"Housing", campus:"East", lat:36.006456, lon:-78.916340},
	{name:"Brown Residence Hall", type:"Housing", campus:"East", lat:36.008148, lon:-78.914173},
	{name:"East Residence Hall", type:"Housing", campus:"East", lat:36.006421, lon:-78.914248},
	{name:"Epworth Residence Hall", type:"Housing", campus:"East", lat:36.006022, lon:-78.913218},
	{name:"Gilbert-Addoms Residence Hall", type:"Housing", campus:"East", lat:36.005588, lon:-78.916909},
	{name:"Giles Residence Hall", type:"Housing", campus:"East", lat:36.006559, lon:-78.915176},
	{name:"Jarvis Residence Hall", type:"Housing", campus:"East", lat:36.006025, lon:-78.915380},
	{name:"Pegram Residence Hall", type:"Housing", campus:"East", lat:36.008764, lon:-78.915095},
	{name:"Randolph Residence Hall", type:"Housing", campus:"East", lat:36.006855, lon:-78.917134},
	{name:"Southgate Residence Hall", type:"Housing", campus:"East", lat:36.005909, lon:-78.918035},
	{name:"Wilson Residence Hall", type:"Housing", campus:"East", lat:36.007037, lon:-78.914258},
	//west
	{name:"Wannamaker 1", type:"Housing", campus:"West", lat:35.998513, lon:-78.939283},
	{name:"Wannamaker 2", type:"Housing", campus:"West", lat:35.998679, lon:-78.939171},
	{name:"Wannamaker 3", type:"Housing", campus:"West", lat:35.998888, lon:-78.939074},
	{name:"Wannamaker 4", type:"Housing", campus:"West", lat:35.998992, lon:-78.938967},
	{name:"Kilgo House I", type:"Housing", campus:"West", lat:35.999618, lon:-78.939954},
	{name:"Kilgo House J", type:"Housing", campus:"West", lat:35.999765, lon:-78.939831},
	{name:"Kilgo House K", type:"Housing", campus:"West", lat:35.999815, lon:-78.940104},
	{name:"Kilgo House L", type:"Housing", campus:"West", lat:35.999931, lon:-78.940319},
	{name:"Kilgo House M", type:"Housing", campus:"West", lat:36.000146, lon:-78.940190},
	{name:"Kilgo House N", type:"Housing", campus:"West", lat:36.000306, lon:-78.940067},
	{name:"Kilgo House O", type:"Housing", campus:"West", lat:36.000011, lon:-78.939697},
	{name:"Kilgo House P", type:"Housing", campus:"West", lat:36.000220, lon:-78.939541},
	{name:"Keohane House 4A", type:"Housing", campus:"West", lat:35.998783, lon:-78.938141},
	{name:"Keohane House 4B", type:"Housing", campus:"West", lat:35.999299, lon:-78.937846},
	{name:"Keohane House 4D", type:"Housing", campus:"West", lat:35.999461, lon:-78.937299},
	{name:"Keohane House 4E", type:"Housing", campus:"West", lat:35.998994, lon:-78.937269},
	{name:"Few House FF", type:"Housing", campus:"West", lat:36.000535, lon:-78.938433},
	{name:"Few House GG", type:"Housing", campus:"West", lat:36.000311, lon:-78.937843},
	{name:"Few House HH", type:"Housing", campus:"West", lat:35.999915, lon:-78.937749},
	{name:"Edens House 1A", type:"Housing", campus:"West", lat:35.998580, lon:-78.936781},
	{name:"Edens House 1B", type:"Housing", campus:"West", lat:35.998390, lon:-78.936566},
	{name:"Edens House 1C", type:"Housing", campus:"West", lat:35.998933, lon:-78.936636},
	{name:"Edens House 2A", type:"Housing", campus:"West", lat:35.999006, lon:-78.935866},
	{name:"Edens House 2C", type:"Housing", campus:"West", lat:35.998985, lon:-78.936215},
	{name:"Edens House 3A (Decker Tower)", type:"Housing", campus:"West", lat:35.998611, lon:-78.935534},
	{name:"Edens House 3B (Mitchell Tower)", type:"Housing", campus:"West", lat:35.998408, lon:-78.935169},
	{name:"Crowell House BB", type:"Housing", campus:"West", lat:35.998973, lon:-78.939635},
	{name:"Crowell House CC", type:"Housing", campus:"West", lat:35.998770, lon:-78.939756},
	{name:"Crowell House DD", type:"Housing", campus:"West", lat:35.998927, lon:-78.940330},
	{name:"Crowell House EE", type:"Housing", campus:"West", lat:35.999184, lon:-78.940190},
	{name:"Crowell House G", type:"Housing", campus:"West", lat:35.999307, lon:-78.939959},
	{name:"Crowell House H", type:"Housing", campus:"West", lat:35.999175, lon:-78.939680},
	{name:"Craven House A", type:"Housing", campus:"West", lat:36.000077, lon:-78.938484},
	{name:"Craven House AA", type:"Housing", campus:"West", lat:35.999356, lon:-78.939133},
	{name:"Craven House B", type:"Housing", campus:"West", lat:36.000117, lon:-78.938683},
	{name:"Craven House C", type:"Housing", campus:"West", lat:35.999985, lon:-78.938809},
	{name:"Craven House D", type:"Housing", campus:"West", lat:35.999878, lon:-78.938887},
	{name:"Craven House E", type:"Housing", campus:"West", lat:35.999611, lon:-78.939117},
	{name:"Craven House F", type:"Housing", campus:"West", lat:35.999243, lon:-78.939367},
	{name:"Craven House R", type:"Housing", campus:"West", lat:35.999678, lon:-78.938817},
	{name:"Craven House S", type:"Housing", campus:"West", lat:35.999586, lon:-78.938650},
	{name:"Craven House T", type:"Housing", campus:"West", lat:35.999774, lon:-78.938363},
	{name:"Craven House U", type:"Housing", campus:"West", lat:35.999436, lon:-78.938602},
	{name:"Craven House V0 & v00", type:"Housing", campus:"West", lat:35.999553, lon:-78.938508},
	{name:"Craven House W/Y", type:"Housing", campus:"West", lat:35.999181, lon:-78.938782},
	{name:"Craven House X", type:"Housing", campus:"West", lat:35.999335, lon:-78.938707},
	{name:"Craven House Z", type:"Housing", campus:"West", lat:35.999286, lon:-78.938967},
	//central
	{name:"1700 Pace", type:"Housing", campus:"Central", lat:36.004034, lon:-78.925320},
	{name:"1706 Pace", type:"Housing", campus:"Central", lat:36.004095, lon:-78.925685},
	{name:"1708 Pace", type:"Housing", campus:"Central", lat:36.004546, lon:-78.925760},
	{name:"1712 Pace", type:"Housing", campus:"Central", lat:36.004216, lon:-78.926189},
	{name:"1809 Erwin", type:"Housing", campus:"Central", lat:36.005501, lon:-78.927047},
	{name:"1901 Erwin", type:"Housing", campus:"Central", lat:36.005657, lon:-78.927562},
	{name:"1905 Erwin", type:"Housing", campus:"Central", lat:36.005327, lon:-78.927777},
	{name:"1907 Erwin", type:"Housing", campus:"Central", lat:36.005683, lon:-78.927991},
	{name:"1909 Erwin", type:"Housing", campus:"Central", lat:36.005770, lon:-78.928356},
	{name:"1911 Erwin", type:"Housing", campus:"Central", lat:36.005570, lon:-78.928506},
	{name:"1913 Erwin", type:"Housing", campus:"Central", lat:36.005909, lon:-78.928560},
	{name:"1915 Erwin", type:"Housing", campus:"Central", lat:36.005518, lon:-78.928860},
	{name:"1909 Yearby", type:"Housing", campus:"Central", lat:36.004971, lon:-78.928270},
	{name:"1911 Yearby", type:"Housing", campus:"Central", lat:36.004633, lon:-78.928388},
	{name:"1915 Yearby", type:"Housing", campus:"Central", lat:36.004867, lon:-78.928785},
	{name:"2011 Yearby", type:"Housing", campus:"Central", lat:36.004998, lon:-78.930974},
	{name:"2015 Yearby", type:"Housing", campus:"Central", lat:36.004581, lon:-78.931264},
	{name:"2017 Yearby", type:"Housing", campus:"Central", lat:36.004937, lon:-78.931382},
	{name:"1914 Lewis", type:"Housing", campus:"Central", lat:36.004147, lon:-78.931350},
	{name:"201 Alexander", type:"Housing", campus:"Central", lat:36.005171, lon:-78.925663},
	{name:"202 Alexander", type:"Housing", campus:"Central", lat:36.005353, lon:-78.926543},
	{name:"204 Alexander", type:"Housing", campus:"Central", lat:36.005206, lon:-78.926800},
	{name:"205 Alexander", type:"Housing", campus:"Central", lat:36.005214, lon:-78.925985},
	{name:"206 Alexander", type:"Housing", campus:"Central", lat:36.005327, lon:-78.927294},
	{name:"208 Alexander", type:"Housing", campus:"Central", lat:36.004954, lon:-78.926607},
	{name:"209 Alexander", type:"Housing", campus:"Central", lat:36.004876, lon:-78.925942},
	{name:"210 Alexander", type:"Housing", campus:"Central", lat:36.004989, lon:-78.927798},
	{name:"215 Alexander", type:"Housing", campus:"Central", lat:36.004616, lon:-78.926135},
	{name:"220 Alexander", type:"Housing", campus:"Central", lat:36.004251, lon:-78.926929},
	{name:"205 Oregon", type:"Housing", campus:"Central", lat:36.004650, lon:-78.924494},
	{name:"206 Oregon", type:"Housing", campus:"Central", lat:36.004902, lon:-78.925084},
	{name:"301 Oregon", type:"Housing", campus:"Central", lat:36.003548, lon:-78.924912},
	{name:"302 Oregon", type:"Housing", campus:"Central", lat:36.003505, lon:-78.925470},
	{name:"209 Anderson", type:"Housing", campus:"Central", lat:36.006082, lon:-78.928978},
	{name:"215 Anderson", type:"Housing", campus:"Central", lat:36.005900, lon:-78.929440},
	{name:"221 Anderson", type:"Housing", campus:"Central", lat:36.005466, lon:-78.929386},
	{name:"302 Anderson", type:"Housing", campus:"Central", lat:36.005006, lon:-78.930362},
	{name:"304 Anderson", type:"Housing", campus:"Central", lat:36.004772, lon:-78.930652},
	{name:"312 Anderson", type:"Housing", campus:"Central", lat:36.004407, lon:-78.930309},
	{name:"314 Anderson", type:"Housing", campus:"Central", lat:36.004156, lon:-78.930770},
	{name:"301 Swift", type:"Housing", campus:"Central", lat:36.002697, lon:-78.921050},
	{name:"Devil's Den", type:"Housing", campus:"Central", lat:36.002810, lon:-78.925105},
	{name:"Mill Village", type:"Housing", campus:"Central", lat:36.004954, lon:-78.929311},
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


var out = [];

for(i=0;i<12;i++){ //generate data for each month
	var month = i + 1;
	if(month < 10){
		month = "0" + month;
	}
	var max;
	if([3,5,8,10].indexOf(i) != -1){
		max = 30;
	} else if(i == 1){
		max = 28;
	} else max = 31;
	// console.log(month + ", " + max);
	for(j=0;j<100;j++){	//generate 100 crimes per month, will change this later
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
		var ind = Math.floor(Math.random() * (crime_types.length));
		var crime = crime_types[ind];
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

		//TODO: Replace the next two lines with a way to write to an SQL db, not just make a json file
			var out_line = {date: "2015-" + month + "-" + day, time: hour + ":" + minute, crime: crime, building: building.name, disposition: disposition, inside: indoor};
			out.push(out_line);
		//END DELETE

	}
}

//write data to database
db.serialize(function() {

	db.run('DROP TABLE Building');
	db.run('DROP TABLE Crime');
	db.run('CREATE TABLE Building (Name VARCHAR(256) NOT NULL PRIMARY KEY, Type VARCHAR(256) NOT NULL, Campus VARCHAR(256) NOT NULL, Lat INTEGER NOT NULL, Lon INTEGER NOT NULL)');
	db.run('CREATE TABLE Crime(ID INTEGER NOT NULL PRIMARY KEY, Type VARCHAR(256) NOT NULL, Tags TEXT[], Date DATE NOT NULL, Time TIME NOT NULL, Disposition VARCHAR(256) NOT NULL, Area_Name VARCHAR(256) NOT NULL, Exterior VARCHAR(256) NOT NULL)');


	for (var i = 0; i < buildings.length; i++) {
		var temp = buildings[i];
		db.run("INSERT INTO Building (Name, Type, Campus, Lat, Lon) VALUES (" + JSON.stringify(temp.name) + ", " + JSON.stringify(temp.type) + ", " + JSON.stringify(temp.campus) + ", " + JSON.stringify(temp.lat) + ", " + JSON.stringify(temp.lon) + ")", function(err, result){
			if(err){
				console.log(err);
			}
		});
	}

	for (var i = 0; i < out.length; i++) {
		var temp2 = out[i];
		console.log
		//console.log("INSERT INTO Crime (ID, Type, Tags, Date, Time, Disposition, Area_Name, Exterior) VALUES (" + i + ", " + JSON.stringify(temp2.crime.name)+ ", '" + temp2.crime.tags + "', " + JSON.stringify(temp2.date) + ", " + JSON.stringify(temp2.time) + ", " + JSON.stringify(temp2.disposition) + ", " + JSON.stringify(temp2.building) + ", " + JSON.stringify(temp2.inside) + ")");
		db.run("INSERT INTO Crime (ID, Type, Tags, Date, Time, Disposition, Area_Name, Exterior) VALUES (" + i + ", " + JSON.stringify(temp2.crime.name)+ ", '" + temp2.crime.tags + "', " + JSON.stringify(temp2.date) + ", " + JSON.stringify(temp2.time) + ", " + JSON.stringify(temp2.disposition) + ", " + JSON.stringify(temp2.building) + ", " + JSON.stringify(temp2.inside) + ")", function(err, result){
			if(err){
				// console.log("error 2: " + err);
			}
		});
	}

//Test queries

 //  	db.each("SELECT rowid AS id, Name FROM Building WHERE Type='Academic/Administrative'", function(err, row) {
 //    	console.log(row.id + ": " + row.Name);
 //  	});

	// db.each("SELECT  Type, Date, Time, Tags FROM Crime WHERE Type='Fraud'", function(err, row) {
 //  		console.log(row.Type + ", " + JSON.stringify(row.Tags) + ", " + row.Date + ", " + row.Time);
 //  	});

});

db.close();
