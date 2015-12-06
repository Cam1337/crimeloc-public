function createMultiselect(e_id){
    $(e_id + " option:first").prop("selected",true).val("null");
    $(e_id).multiselect({
        onChange: function(option, checked, select){
            $(e_id + " option:first").prop("selected",false);
        }
    });
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

function remoteLoadCrimes(){
    createMultiselect("#crime_tag");
}

function loadAllMultiSelects(){
    remoteLoadLocations();
    remoteLoadCrimes();
}