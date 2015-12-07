/**
 * Created by cam on 12/5/2015.
 */

var constants = require("./constants.js");

module.exports.convert = function(jsobj){
    console.log(jsobj);
    
    

    var prefix = "SELECT Crime.Disposition, Crime.Type, Crime.Date, Crime.Time, Crime.Area_Name, Building.Campus, Building.Lat, Building.Lon FROM Crime, Building WHERE Building.Name==Crime.Area_Name";
    var suffix = " LIMIT 150";

    var locs = convertToWhereIn("Crime.Area_Name", jsobj.building_name, constants.building_name);
    var c_type = convertToWhereIn("Crime.Type", jsobj.crime_type, constants.crime_type);
    var types = convertToWhereIn("Building.Type", jsobj.building_type, constants.building_type);
    var ext = convertToWhereIn("Crime.Exterior", jsobj.crime_exterior, constants.crime_exterior);
    var tags = convertToWhereIn("Crime.Tags", jsobj.crime_tags, constants.crime_tags);
    var campus = convertToWhereIn("Building.Campus", jsobj.building_campus, constants.building_campus);
    var disp = convertToWhereIn("Crime.Disposition", jsobj.crime_disposition, constants.crime_disposition);
    var date = convertDateTime("Crime.Date", jsobj.lower_date, jsobj.upper_date);
    var time = convertDateTime("Crime.Time", jsobj.lower_time, jsobj.upper_time);
    
    var data = conjunctStatements(locs, c_type, types, date, time, ext, tags, campus, disp);
    
    console.log(prefix + data + suffix);
    return prefix + data + suffix;
    
}

function checkContains(list, vals) {
    if (vals === "null"){return true;}
    if(list === undefined || list == null) {
        return false;
    }
    
    for(var i = 0; i < list.length; i++) {
        for (var j = 0; j < vals.length; j++){
            if (vals[j] === list[i].col){
                return true;
            }
        }
    }
    
    return false;
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


function convertToWhereIn(column, list, container) {
    
    var statement = "";
    
    if(list === undefined || list === "null" || !checkContains(container, list)) {
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
    
    if(start !== undefined && start !== "null") {
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
    
    if(end !== undefined && end !== "null") {
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
        
        if(start !== undefined && start !== "null") {
            statement += " AND ";
        }
        statement += column + " < " + "'" + end + "'";
    }
    
    return statement;
}


function conjunctStatements(location, c_type, types, date, time, ext, tags, campus, disp) {
    
    var arr = [location,c_type,types,date,time,ext,tags,campus,disp];
    arr = arr.filter(function(e){
        return e !== "";
    })
    var statement = arr.join(" AND ");
    if (statement !== ""){
        return " AND " + statement;
    }
    return statement;
    
    // var statement = "";
    
    // if(location !== "") {
    //     statement += " AND " + location;
    // }
    
    // if(tag !== "") {
    //     statement += " AND " + tag;
    // }
    
    // if(types !== "") {
    //     statement += " AND " + types;
    // }
    
    // if(date !== "") {
    //     statement += " AND " + date;
    // }
    
    // if(time !== "") {
    //     statement += " AND " + time;
    // }
    
    // return statement;
}