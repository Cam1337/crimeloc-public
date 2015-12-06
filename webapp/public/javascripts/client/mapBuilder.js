/**
 * Created by cam on 12/6/2015.
 */
function loadMap(){
    var resultsMap = new Maplace({
        locations: [{lat:36.001271, lon:-78.9289, title:"Duke", zoom:15}],
        map_div: "#results-map",
        controls_title: "Choose a location",
        map_options: {
            scrollwheel: false
        }
    });
    resultsMap.Load();
}