/**
 * Created by cam on 8/10/2015.
 */
var orm = require("orm");
var config = require("../config.js");

module.exports = orm.express(config.db.getConnectionURL(), {
    define: function(db, models, next){
        if (process.env.ORM_DEBUG){orm.settings.set("connection.debug", true)} // ORM_DEBUG=1 && npm start
        db.settings.set("instance.cache", false)

        models.users = require('./models/User.js')(db)
        //models.queue = require('../database/models/postgres/Queue.js')(db)
        //models.writepath = require('../database/models/postgres/WritePath.js')(db)
        //models.user = require('./models/User.js')(db)

        //models.route.hasMany('queues', models.queue, {}, {reverse: "route", autoFetch: true, cache: false, autoSave: true, cascadeRemove: true})

        db.sync(function(err){ /* who cares.... */ console.log("MySQL DB Synchronized") })

        next()
    }
})