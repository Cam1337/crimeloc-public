/**
 * Created by cam on 8/14/2015.
 */
var opts = {
    url: "/api/people",
    type: "post",
    format: "html",
    methods: {
        before: function(el){
            return {name: $(el).children().first().text().split(", ")[1]}
        },
        after: null
    },
    empty: true
};

function updatePerson(){
    remoteRequest("#person", opts)
}

$(document).ready(function(){
    setInterval(updatePerson, 2500);
    updatePerson();
})
