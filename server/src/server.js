// Implement your server in this file.
// We should be able to run your server with node src/server.js
var bodyParser    = require('body-parser');
var validate    = require('express-jsonschema').validate;
var database    = require('./database.js');
var readDocument  = database.readDocument;
var writeDocument   = database.writeDocument;
var addDocument   = database.addDocument;

// Creates an Express server.
var express = require('express');
var app = express();

app.listen(3000, function () {
  console.log('App is listening on port 3000.');
})

app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(express.static('../client/build'));

function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, 'base64').toString('utf8');
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
    // Check that id is a number.
    if (typeof id === 'number') {
      return id;
    } else {
      // Not a number. Return -1, an invalid ID.
      return -1;
    }
  } catch (e) {
    // Return an invalid ID.
    return -1;
  }
}

// Get the information about each day from the database.
function getDayData(id, date) {
  // If day doesn't exist in database then create it.
  try {
    var dayData = readDocument('days', date);
  }
  catch(e) {
    var dayData = {
      "_id": parseInt(date),
      "users": {
        [id]: {
          "_id": id,
          "food": [],
          "exercise": []
        }
      }
    };
    writeDocument('days', dayData);
  }
  return dayData.users[id];
}

// Handle the date pages.
app.get('/user/:userid/date/:date', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var date = req.params.date;

  if (fromUser === parseInt(userid, 10)) {
    res.send(getDayData(userid, date));
  } else {
    res.status(401).end();
  }
})


function getDayPanelData(i, type) {
  var panelItems = [];
  for (var item in i) {
    panelItems.push(readDocument(type, i[item]));
  }
  return panelItems
}

app.get('/panel/:type/items/:number', function(req, res) {
  var type = req.params.type;
  var number = req.params.number.split('-');
  console.log(type)
  console.log(number)
  res.send(getDayPanelData(number, type));
})


// Translates JSON failures to 400s
app.use(function(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    res.status(400).end();
  } else {
    next(err);
  }
})