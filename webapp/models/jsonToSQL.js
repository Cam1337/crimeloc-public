/**
 * Created by cam on 12/5/2015.
 */

module.exports.convert = function(jsobj){
    return "SELECT Crime.Disposition, Crime.Type, Crime.Date, Crime.Time, Crime.Area_Name, Building.Lat, Building.Lon FROM Crime, Building WHERE Building.Name==Crime.Area_Name LIMIT 25";
}