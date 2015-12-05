/**
 * Created by cam on 11/5/2015.
 */
var sqlite3 = require("sqlite3").verbose();
var path = require('path');
var db = new sqlite3.Database(path.join(__dirname, "db.sqlite"));


module.exports = {
    template: null,
    run: function(req, next){
        db.serialize(function() {
            var query = req.body.query;
            db.all(query, function(err, rows){
                //console.log(rows)
                next({results: rows, error: err, sql_query: query})
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