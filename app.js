let express = require("express"); 
let app = express();
let bodyParser = require("body-parser");
let cors = require("cors"); 
var multer = require('multer');
var upload = multer();
var path = require("path");
var session = require("express-session");
var PORT = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, 'fugitives', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array()); // form parser 

//route to handle user registration
let database = require("./routes/loginroutes/loginroutes"); 
app.use('/register', database.register);
app.use('/login', database.login);
app.use('/getCards', database.getCardImages);
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname+"/fugitives/build/index.html"))
});

app.listen(PORT, function(err){
  if (err) console.log("Listening failed");
  console.log("Connection Successful to " + PORT);
}); 