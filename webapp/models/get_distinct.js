/**
 * Created by cam on 11/5/2015.
 */
var sqlite3 = require("sqlite3").verbose();
var path = require('path');
var db = new sqlite3.Database(path.join(__dirname, "db.sqlite"));

module.exports = {
    template: "distinct_select",
    run: function(req, next){
        db.serialize(function(){
            var table = req.body.table;
            var col = req.body.column;
            var query = "SELECT DISTINCT " + col + " FROM " + table;
            db.all(query, function(err, rows){
                results = [];
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