/**
 * Created by cam on 12/5/2015.
 */

module.exports.convert = function(jsobj){
    console.log(jsobj);
    
    var prefix = "SELECT Crime.Disposition, Crime.Type, Crime.Date, Crime.Time, Crime.Area_Name, Building.Lat, Building.Lon FROM Crime, Building WHERE Building.Name==Crime.Area_Name";
    var suffix = " LIMIT 500";
    
    var locs = convertToWhereIn("Crime.Area_Name", jsobj.building_name);
    var tags = convertToWhereIn("Crime.Type", jsobj.crime_type);
    var types = convertToWhereIn("Building.Type", jsobj.building_type);
    var date = convertDateTime("Crime.Date", jsobj.lower_date, jsobj.upper_date);
    var time = convertDateTime("Crime.Time", jsobj.lower_time, jsobj.upper_time);
    
    var data = conjunctStatements(locs, tags, types, date, time);
    
    console.log(prefix + data + suffix);
    return prefix + data + suffix;
    
}

function sanitaryDate(date) {
    var s = date.split('-');
    for(var i = 0; i < s.length; i++) {
        if(parseInt(s[i]) == NaN) {
            console.log("Bad date input (NaN)");
            return false;
        }
    }
    
    return true;
}

function sanitaryTime(time) {
    var s = time.split(':');
    for(var i = 0 ; i < s.length; i++) {
        if(parseInt(s[i]) == NaN) {
            console.log("Bad time input (NaN)");
            return false;
        }
    }
    
    return true;
}


function convertToWhereIn(column, list) {
    
    var statement = "";
    
    if(list === "null") {
         return statement;
    }
    
    statement += column + " IN (";
    
    for(var i = 0; i < list.length; i++) {
        statement += "'" + list[i] + "'";
        if(i != list.length - 1) {
           statement += ",";
        }
    }
    
    statement += ")";
    
    return statement;
}


function convertDateTime(column, start, end) {
    
    var statement = "";
    
    if(start !== "null") {
        if(!(start.length == 10 || start.length == 5)) {
            console.log("Bad date/time input (length of query)");
            return "";
        }
        else if(start.length == 5) {
            if(!sanitaryTime(start)) {
                return "";
            }
        }
        else {  // start.length == 10
            if(!sanitaryDate(start)) {
                return "";
            }
        }
        statement += column + " > " + "'" + start + "'";
    }
    
    if(end !== "null") {
        if(!(end.length == 10 || end.length == 5)) {
            console.log("Bad date/time input (length of query)");
            return "";
        }
        else if(end.length == 5) {
            if(!sanitaryTime(end)) {
                return "";
            }
        }
        else {  // end.length == 10
            if(!sanitaryDate(end)) {
                return "";
            }
        }
        
        if(start !== "null") {
            statement += " AND ";
        }
        statement += column + " < " + "'" + end + "'";
    }
    
    return statement;
}


function conjunctStatements(location, tag, types, date, time) {
    
    var statement = "";
    
    if(location !== "") {
        statement += " AND " + location;
    }
    
    if(tag !== "") {
        statement += " AND " + tag;
    }
    
    if(types !== "") {
        statement += " AND " + types;
    }
    
    if(date !== "") {
        statement += " AND " + date;
    }
    
    if(time !== "") {
        statement += " AND " + time;
    }
    
    return statement;
}