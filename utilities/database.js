const mysql = require("mysql")
    env = require("../config/config")


/* Connection authenticated with mysql_native_password
and does not use the new 8.0 connection. */ 
console.log(env)
const DB_CONFIG = JSON.parse(env.DB_CONFIG)

let connection;
function connectionLoop(){
    connection = mysql.createConnection(DB_CONFIG);
    connection.connect(function(err){
        if (err){ 
            console.log(err.stack);
            setTimeout(connectionLoop, 2000);
        }
        else console.log("Connected to MySQL Database");
    });
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
          connectionLoop();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
          throw err;                                  // server variable configures this)
        }
    });
}
connectionLoop()

module.exports = connection;