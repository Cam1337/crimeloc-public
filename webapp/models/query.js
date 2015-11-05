/**
 * Created by cam on 11/5/2015.
 */
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("out.sqlite");

module.exports = {
    template: "query_results",
    run: function(req, next){
        db.serialize(function(){  
            var base_query = "SELECT * FROM crimes";
            var b = req.body;
            var conditions = [];
            //if (b.lower_date != '' || b.upper_date != '' || b.lower_time != NaN || b.upperTime != NaN){
            //    base_query += " WHERE"
            //}
            if (b.lower_date != ''){
                conditions.push(" reported > '" + b.lower_date + " 00:00:00' ")
            }if (b.upper_date != ''){
                conditions.push(" reported < '" + b.upper_date + " 00:00:00' ")
            }if (!isNaN(b.lower_time)){
                conditions.push(" time(reported) > '" + b.lower_time + "' ")
            }if (!isNaN(b.upper_time)){
                conditions.push(" time(reported) < '" + b.upper_time + "' ")
            }
            if (conditions.length > 0){
                base_query += " WHERE" + conditions.join("AND")
            }
            console.log(base_query)
            db.all(base_query, function(err, rows){
                //db.close()
                next({results: rows, query: base_query})
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