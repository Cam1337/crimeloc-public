/**
 * Created by cam on 11/5/2015.
 */
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./models/db.sqlite");

function JSONToSQLQuery(jsobj){
    return "SELECT Crime.Disposition, Crime.Type, Crime.Date, Crime.Time, Crime.Area_Name, Building.Lat, Building.Lon FROM Crime, Building WHERE Building.Name==Crime.Area_Name LIMIT 25";
}

module.exports = {
    template: null,
    run: function(req, next){
        db.serialize(function() {
            var query = JSONToSQLQuery(req.body);
            db.all(query, function(err, rows){
                //console.log(rows)

                next({results: rows, error: err, sql_query: query})
            })
        })

        //db.serialize(function(){
        //    var base_query = "SELECT * FROM crimes";
        //    var b = req.body;
        //    var conditions = [];
        //    //if (b.lower_date != '' || b.upper_date != '' || b.lower_time != NaN || b.upperTime != NaN){
        //    //    base_query += " WHERE"
        //    //}
        //    if (b.lower_date == "24"){
        //        b.lower_date = "00"
        //    }
        //    if (b.lower_date != ''){
        //        conditions.push(" reported > '" + b.lower_date + " 00:00:00' ")
        //    }if (b.upper_date != ''){
        //        conditions.push(" reported < '" + b.upper_date + " 00:00:00' ")
        //    }if (!isNaN(b.lower_time) && b.lower_time != ''){
        //        conditions.push(" time(reported) > '" + b.lower_time + ":00:00' ")
        //    }if (!isNaN(b.upper_time) && b.upper_time != ''){
        //        conditions.push(" time(reported) < '" + b.upper_time + ":00:00' ")
        //    }
        //    if (conditions.length > 0){
        //        base_query += " WHERE" + conditions.join("AND")
        //    }
        //    console.log(base_query)
        //    db.all(base_query, function(err, rows){
        //        //db.close()
        //        next({results: rows, query: base_query})
        //    })
        //})
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