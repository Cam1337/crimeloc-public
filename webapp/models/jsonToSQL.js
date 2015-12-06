/**
 * Created by cam on 12/5/2015.
 */

module.exports.convert = function(jsobj){
    console.log(jsobj);
    
    var prefix = "SELECT Crime.Disposition, Crime.Type, Crime.Date, Crime.Time, Crime.Area_Name, Building.Lat, Building.Lon FROM Crime, Building WHERE Building.Name==Crime.Area_Name";
    var data = "";
    var suffix = " LIMIT 50";
    
    // dummy json object for testing
    var j = {
        s_time: "00:00", // 24 hour (string)
        s_date: "mm-dd-yyyy", // (string)
        e_time: "00:00", // 24 hour (string)
        e_date: "mm-dd-yyyy", // (string)
        tags: [], // list of strings
        desc: "Robbery", // string
        loc: "Wilson" // string
    }
    
    return prefix + data + suffix;
    
}