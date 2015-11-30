/**
 * Created by cam on 11/5/2015.
 */
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("out.sqlite");

module.exports = {
    template: "locations_select",
    run: function(req, next){
        //db.serialize(function(){
        //    var query = "SELECT id, name FROM buildings";
        //    db.all(query, function(err, rows){
                //db.close()
                //next({results: rows})
            //})
        //})
        next({
            results: [
                {id: -1, name: "Select a location"},
                {id: 1, name:"Wannamaker Firelane"},
                {id: 2, name:"Edens"},
                {id: 3, name:"Brown Dormitory"},
                {id: 4, name:"Wilson Gym"}
            ]
        })
    },
    cookies: {
        track: false,
        set: function(req, result, next){
            next({})
        },
        del: function(req, result, next){
            next({})
        }
    }
}