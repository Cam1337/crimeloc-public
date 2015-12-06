/**
 * Created by cam on 12/6/2015.
 */

function onDateChange(d){
    var da = new Date("20"+d);
    var bt = $(this).attr("id").split("_")[1];
    bounds[bt] = "20"+d;
    bt = bt.charAt(0).toUpperCase() + bt.slice(1);
    $(this).text(bt + " Date Bound: " + da.toDateString());
    return true
}
function onTimeChange(t){

}
var date_picker_opts = {
    format: 'y-m-d',
    flat: false,
    hide_on_select: true,
    change: onDateChange
};