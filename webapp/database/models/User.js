module.exports = function(db){
    return db.define('users', {
        id:            {type: "serial", key: true},
        name:          {type: "text"},
        password_hash: {type: "text"},
        password_salt: {type: "text"},
        permission:    {type: "text"},
        active:        {type: "number"},
        cookie:        {type: "text"}
    },{
        methods: {
            isLoggedIn: function(cookie){
                //return this.active == 1 ? "pause" : "play";
                return true;
            }
        }
    },{
        cache: false,
        autoSave:true
    })
}
