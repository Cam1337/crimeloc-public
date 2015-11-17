/**
 * Created by cam on 8/10/2015.
 */
module.exports = {
    app: {

    },
    db: {
        getConnectionURL: function(){
            return "mysql://root:root@localhost:3306/node_example"
        }
    }
}