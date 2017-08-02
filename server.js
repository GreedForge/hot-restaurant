// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var activeTablesArray = [
    {"customerName": "Joe",
     "phoneNumber": "1234567",
     "customerEmail": "joe@joe.com",
     "customerID": "999999"
    },
   {"customerName": "Fred",
     "phoneNumber": "0987654",
     "customerEmail": "fred@fred.com",
     "customerID": "111111"
    },
    {"customerName": "Phil",
     "phoneNumber": "1230987",
     "customerEmail": "phil@phil.com",
     "customerID": "222222"
    }];
var waitListArray = [];


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
//server side handle for the tables.html runTableQuery ajax.get call
app.get("/api/tables", function(req, res){
  res.json(activeTablesArray);
});

app.get("/api/waitlist", function(req, res){
   res.json(waitListArray);
});

app.post("/api/clear", function(req, res){
  waitListArray = [];
  activeTablesArray = [];
});

app.post("/api/tables", function(req, res){
  var newReservation = req.body;
  if (activeTablesArray.length<5){
    //   console.log(req);
  activeTablesArray.push(newReservation);    
  return true;
  }
  else{
  waitListArray.push(newReservation);
  return false;
  }
});