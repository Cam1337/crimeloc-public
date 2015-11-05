/**
 * Created by cam on 8/9/2015.
 */
module.exports = {
    template: "index",
    run: function(req, next){
        next({})
    },
    cookies: {
        track: true,
        set: function(req, result, next){
            next({})
        },
        del: function(req, result, next){
            next({})
        }
    }
}