/**
 * Created by cam on 11/5/2015.
 */
var sqlite3 = require("sqlite3").verbose();
var path = require('path');
var db = new sqlite3.Database(path.join(__dirname, "db.sqlite"));

module.exports = {
    template: "locations_select",
    run: function(req, next){
        db.serialize(function(){
            var query = "SELECT Name FROM Building";
            db.all(query, function(err, rows){
                results = [{Name: "Select a location"}]
                results.push.apply(results, rows)
                next({results: results})
            })
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