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

    var table_opts = {
        url: "/api/render_table",
        type: "post",
        format: "html",
        methods: {
            before: function (el) {
                return data;
            }
        }
    };
    remoteRequest("#results-table", table_opts);

    var locations = [];
    for (var i = 0; i < data.results.length; i++){
        var r = data.results[i];
        var loc = {
            name: r.Type,
            lat: r.Lat,
            lon: r.Lon
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

    var pkt = {
        crime_type: crime_type ? crime_type : "null",
        building_name: building_name ? building_name : "null",
        building_type: building_type ? building_type : "null",
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