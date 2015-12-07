function toMultiSelect(e_id, first){
    $(e_id).multiselect({nonSelectedText: first, maxHeight: 300});
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
}