/**
 * Created by cam on 12/6/2015.
 */

function renderResults(data) {
    if (data.error != null){
        $("#query-search-error").text("ERROR: " + data.error.code);
        return;
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
    var locations = $("#location_selection_select").val();
    var c_tags = $("#crime_tag").val();


    if ((c_tags != null) && (c_tags[0] == "")){
        c_tags.splice(0,1);
    }
    var pkt = {
        locations: ((locations) && (locations.length != 0)) ? locations : "null",
        tags: ((c_tags) && (c_tags.length != 0)) ? c_tags : "null",
        lower_date: bounds.lower,
        upper_date: bounds.upper,
        lower_time: lower_time,
        upper_time: upper_time,
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