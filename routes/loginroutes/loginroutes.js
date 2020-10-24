const express = require("express"),
    env = require("../../config/config")
    app = express(),
    session = require("express-session"),
    MySQLStore = require("express-mysql-session")(session),
    bcrypt = require('bcrypt'),
    saltRounds = 10;


let checkUsers = require("./checkUsers")
let Trie = require("./users")
let connection = require("../../utilities/database")
let registerRouter = express.Router()
let loginRouter = express.Router()
let sessionStore = new MySQLStore(JSON.parse(env.DB_CONFIG))

app.use(session({
    key: "fugitives.sid",
    secret: env.SECRET_KEY,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

/****************************************************************
 * 
 * @Description THE LOGIN ROUTER
 *  
 ****************************************************************/
loginRouter.get("/", function (req, res){
    let sess = req.session;
    if (req.body.username && req.body.password){
        connection.query("SELECT ??, ?? from ?? where username=??", [[`username`, `password`], `users`, req.body.username], function(err, results, fields){
            if (!results.length){
                res.status(406).send("Username/password does not exist!")
            } else {
                let { dbUsername, dbPassword } = dbFields[0]; 
                bcrypt.compare(req.body.password, dbPassword, function(err, result){
                    if (result){
                        res.session.loggedIn = true;
                        res.session.username = dbUsername;
                        res.redirect("../");
                    } else {
                        res.status(406).send("Password does not exist!");
                    }
                })
            }
        });
    }
    
});


loginRouter.get("/goHome", function (req, res, next){
    if (res.session.loggedIn){
        
    }
});
/* prevents MySQL Injections */
exports.login = async function(req, res){
    let sess = req.session;
    console.log(sess);
};


/****************************************************************
 * 
 * @Description THE REGISTER ROUTER
 *  
 ****************************************************************/
registerRouter.get("/",  function(req, res){
    let userDB = new Trie(); 
    let emailDB = new Trie(); 
    connection.query("SELECT ?? from ??", [[`username`, `email`], `users`], function(err, results, fields){
        if (err) {
            console.log(err.stack);
            return;
        }
        if (!results) return;
    
        for (let i = 0; i < results.length; i++){
            userDB.insert(results[i].username);
            emailDB.insert(results[i].email); 
            // console.log(results[i].username + " " + results[i].email);
        } // for
    });   
    res.setHeader("Content-Type", "text/plain;charset=utf-8");
    if (req.sessionID) 
        res.status(406).send("Login first!")
    
    // ensure that username is not already taken 
    if (userDB.contains(req.body.username))
        res.status(406).send("Username is already taken. Please try another one.");
     
    // ensure that email is not already taken 
    if (emailDB.contains(req.body.email))
        res.status(406).send("Email is already taken. Please try another one.");

    // Insert hashed password!!! YAS
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {  
            // when fom data is validated, insert new user into MySQL database 
            connection.query(`INSERT INTO users SET session_id = ?, username = ?, email = ?, password = ?, 
            gender = ?, description = ?`, [req.session.id, req.body.username, req.body.email, req.body.password, req.body.gender
            , req.body.description], function(err, results, fields){
                if (err) console.log(err.stack); 
            }); 
        });
    });
   
    // res.set("url", "http://localhost:4000/register"); // tells client side that CORS is working. 
    res.send("Nothing went wrong.");
});
exports.register = registerRouter;

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

