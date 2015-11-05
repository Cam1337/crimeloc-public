/**
 * Created by cam on 11/5/2015.
 */
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("out.sqlite");

module.exports = {
    template: "query_results",
    run: function(req, next){
        db.serialize(function(){
            db.all("SELECT * FROM crimes;", function(err, rows){
                console.log(rows)
                next({results: rows})
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