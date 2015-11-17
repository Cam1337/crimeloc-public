/**
 * Created by cam on 8/9/2015.
 */
function modelCookies(model, req, res, result, next){
    if (model.cookies.track !== undefined && model.cookies.track === true){
        res.cookie('last-visited', req.originalUrl)
    }
    if (model.cookies !== undefined
        && typeof model.cookies.del == "function"
        && typeof model.cookies.set == "function"
    ) {
        model.cookies.del(req, result, function (to_delete) {
            for (var ckey in to_delete) {
                res.clearCookie(ckey)
            }
            model.cookies.set(req, result, function (to_set) {
                for (var ckey in to_set) {
                    res.cookie(ckey, to_set[ckey])
                }
                next(to_set, to_delete)
            })
        })
    } else{
        next({}, {})
    }
}

function modelResponse(model, req, res, result, next){
    if (model.template !== null && model.template !== undefined){
        res.render(model.template, result)
    }else{
        if (model.redirect !== null && model.redirect !== undefined){
            if (typeof model.redirect === "function"){
                res.redirect(model.redirect(req, result))
                res.end()
            }else{
                res.redirect(model.redirect)
                res.end()
            }

        }else{
            res.send(JSON.stringify(result))
        }
    }

    if (model.after !== undefined && model.after !== null){
        model.after(result)
    }

    if (next !== undefined){
        next(result)
    }
}

function modelExecute(model, req, res, next){
    model.run(req, function(result){
        next(result)
    })
}

module.exports = function(model, req, res, next){
    modelExecute(model, req, res, function(result){
        modelCookies(model, req, res, result, function(cookies_set, cookies_deleted){
            modelResponse(model, req, res, result, function(result){
                if (typeof next === "function"){
                    next(result, cookies_set, cookies_deleted) // chaining past the model is optional
                }
            })
        })
    })

}
