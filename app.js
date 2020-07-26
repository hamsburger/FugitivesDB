let express = require("express"); 
let app = express();
let bodyParser = require("body-parser");
let cors = require("cors"); 
var multer = require('multer');
var upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array()); // form parser 
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  next();
});

//route to handle user registration
let database = require("./routes/loginroutes/loginroutes"); 
app.use('/register', database.register);
app.use('/getCards', database.getCardImages);

let port = 4000;
app.listen(port, function(err){
  if (err) console.log("Listening failed");
  console.log("Connection Successful to " + port);
}); 