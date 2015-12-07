function toMultiSelect(e_id, first){
    $(e_id).multiselect({nonSelectedText: first, maxHeight: 300});
    $(e_id).on('reset', function(e){
        $(e_id).children("option:selected").each(function(){
            $(this).prop("selected",false)
        });
        $(e_id).multiselect("refresh");
    })
}

function remoteCreateMultiSelect(table, column, first, id){
    var opts = {
        url: "/api/get_distinct",
        type: "post",
        format: "html",
        methods: {
            before: function(el){
                return {table: table, column: column};
            }
        }
    };
    remoteRequest(id, opts, function(){ toMultiSelect(id, first); })
}

function remoteLoadLocations(){
    var location_select_opts = {
        url: "/api/locations",
        type: "get",
        format: "html",
        methods: {
            before: function(el){
                return {
                    table: "Building",
                    column: "Name"
                }
            }
        }
    };
    remoteRequest("#location_selection_select", location_select_opts, function(){
        createMultiselect("#location_selection_select");
    });
}

function loadAllMultiSelects(){
    remoteCreateMultiSelect("Building","Name","Select a location","#building_name");
    remoteCreateMultiSelect("Crime","Type","Select crime type","#crime_type");
    remoteCreateMultiSelect("Building","Type","Select building type","#building_type");
    remoteCreateMultiSelect("Building","Campus","Select building campus","#building_campus");
    remoteCreateMultiSelect("Crime","Exterior","Inside/Outside","#crime_exterior");
    remoteCreateMultiSelect("Crime","Disposition","Select a resolution","#crime_disposition");
    remoteCreateMultiSelect("Crime","Tags","Select crime tags","#crime_tags");

    $("#clear-search").on('click', function(e){
        var arr = ["#building_name","#crime_type","#building_type","#building_campus","#crime_exterior","#crime_disposition","#crime_tags"];
        for (var i = 0; i < arr.length; i++){
            $(arr[i]).trigger("reset");
        }
        $("#time_upper").children("option:selected").each(function(){$(this).prop("selected",false);});
        $("#time_lower").children("option:selected").each(function(){$(this).prop("selected",false);});

        $("#date_upper").text("Upper Date Bound");
        $("#date_lower").text("Lower Date Bound");

        bounds.upper = "null";
        bounds.lower = "null";
    })
}