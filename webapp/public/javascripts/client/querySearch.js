/**
 * Created by cam on 12/6/2015.
 */

function renderResults(data) {
    if (data.error != null){
        console.log(data.error);
        $("#query-search-error").text("ERROR: " + data.error.code);
        return;
    }else{
        $("#query-search-error").hide();
    }
    $("#results-table").html(data.result_html);

    var locations = [];
    for (var i = 0; i < data.results.length; i++){
        var r = data.results[i];
        var stuff1 = r.Type + ", " + r.Area_Name + ", " + r.Campus + " Campus";
        var stuff2 = r.Date + ", " + r.Time;
        var loc = {
            name: r.Type,
            lat: r.Lat,
            lon: r.Lon,
            html: '<p>' + stuff1 + '</p><p>' + stuff2 + '</p>'
        };
        locations.push(loc)
    };
    resultsMap.SetLocations(locations, true);
};

function executeQuerySearch(e){
    $("#results-text-error").show();
    var lower_time = $("#time_lower option:selected").val();
    var upper_time = $("#time_upper option:selected").val();

    var building_name = $("#building_name").val();
    var building_type = $("#building_type").val();
    var crime_type = $("#crime_type").val();
    var crime_exterior = $("#crime_exterior").val();
    var crime_disposition = $("#crime_disposition").val();
    var building_campus = $("#building_campus").val();
    var crime_tags = $("#crime_tags").val();

    var pkt = {
        crime_type: crime_type ? crime_type : "null",
        building_name: building_name ? building_name : "null",
        building_type: building_type ? building_type : "null",
        crime_exterior: crime_exterior ? crime_exterior : "null",
        crime_disposition: crime_disposition ? crime_disposition : "null",
        building_campus: building_campus ? building_campus : "null",
        crime_tags: crime_tags ? crime_tags : "null",
        lower_date: bounds.lower,
        upper_date: bounds.upper,
        lower_time: lower_time,
        upper_time: upper_time
    };
    console.log(pkt);
    var opts = {
        "url": "/api/query",
        "type": "post",
        "format":"json",
        methods: {
            before: function(el){
                return pkt;
            },
            after: function(data){
                renderResults(data)
            }
        }
    };
    remoteRequest(null, opts);
}

function executeQuerySearchRaw(e){
    var opts = {
        url: "/api/query_raw",
        type: "post",
        format: "json",
        methods: {
            before: function(el){
                return {query: $("#query-search-value").val()}
            },
            after: function(data){
                renderResults(data)
            }
        }
    };
    remoteRequest(null, opts);
}

function bindSearchButtons(){
    $("#search-btn").on("click", executeQuerySearch);
    $("#query-search-submit").on('click', executeQuerySearchRaw);
}