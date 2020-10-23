let mysql = require("mysql");
let express = require("express");
let checkUsers = require("./checkUsers"); 
let Trie = require("./users");
const bcrypt = require('bcrypt');
const saltRounds = 10;
let router = express.Router;

let userDB = new Trie(); 
let emailDB = new Trie(); 

/* Connection authenticated with mysql_native_password
and does not use the new 8.0 connection. */ 
const dbconfig = {
    host: 'us-cdbr-east-02.cleardb.com',
    user : 'b9e53a433b254b',
    password : '68a2c4f6',
    database : 'heroku_7dbefc7a764d487',
}

let connection;
function connectionLoop(){
    connection = mysql.createConnection(dbconfig); 
    connection.connect(function(err){
        if (err){ 
            console.log(err.stack);
            setTimeout(handleDisconnect, 2000);
        }
        else console.log("Connected to MySQL Database");
    });
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
          handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
          throw err;                                  // server variable configures this)
        }
    });
}
connectionLoop()



let columns = [`username`, `email`];

// Add all usernames to a Trie
// ?? prevents MySQL Injections 
connection.query("SELECT ?? from ??", [columns, `users`], function(err, results, fields){
    if (err) {
        console.log(err.stack);
        return;
    }
    console.log(results);
    if (!results) return;

    for (let i = 0; i < results.length; i++){
        userDB.insert(results[i].username);
        emailDB.insert(results[i].email); 
        // console.log(results[i].username + " " + results[i].email);
    } // for
    
});   

exports.login = async function(req, res){
    
};

exports.register = async function(req, res){
    // console.log(req.body);
    // console.log(req.method);
    // console.log(req.get("Content-Type"));

    // Response content type
    res.setHeader("Content-Type", "text/plain;charset=utf-8");

    // ensure that username is not already taken 
    if (userDB.contains(req.body.username)){
        res.status(406);
        res.send("Username is already taken. Please try another one.");
        return;
    } // if 

    // ensure that email is not already taken 
    if (emailDB.contains(req.body.email)){
        res.status(406);
        res.send("Email is already taken. Please try another one.");
        return;
    }

    // when form data is validated, insert new user into MySQL database 
    connection.query(`INSERT INTO users SET username = ?, email = ?, password = ?, 
    gender = ?, description = ?`, [req.body.username, req.body.email, req.body.password, req.body.gender
    , req.body.description], function(err, results, fields){
        if (err) console.log(err.stack); 
    }); 
   
    // res.set("url", "http://localhost:4000/register"); // tells client side that CORS is working. 
    res.send("Nothing went wrong.");
};

exports.getCardImages = async function(req, res){
    let cardLinks = [];
    connection.query('SELECT * from ??', ['fugitives'], function(err, results, fields){
        if (err) {
            console.log(err.stack);
            return;
        }
        if (!results) return;
        // Store all images
        for (let i = 0; i < results.length; i++){
            cardLinks.push(results[i]);
        }        
        res.send(cardLinks);
    }); 

}; 

