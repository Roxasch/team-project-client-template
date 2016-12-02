// Implement your server in this file.
// We should be able to run your server with node src/server.js
var bodyParser     = require('body-parser');
var validate       = require('express-jsonschema').validate;
var DayItemSchema  = require('./schemas/dayitem.json')
var database       = require('./database.js');
var readDocument   = database.readDocument;
var writeDocument  = database.writeDocument;
var addDocument    = database.addDocument;
var getCollection  = database.getCollection;
var deleteDocument = database.deleteDocument;

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

// Get Day Data =============================================
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

// Get Day Panel Data ======================================
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
  res.send(getDayPanelData(number, type));
})

app.get('/panel/:type/items', function(req, res) {
  var type = req.params.type;
  var number = [];
  res.send(getDayPanelData(number, type));
})

// Get Search Data ========================================
function getSearchData(name) {
  var items = [];
  var data = [];
  var food = getCollection('food');
  var exer = getCollection('exercise');

  for (var f in food) data.push(food[f]);
  for (var e in exer) data.push(exer[e]);

  for (var i in data) {
    if (data[i].name.toLowerCase().includes(name.toLowerCase())) items.push(data[i]);
  }
  return items
}

app.get('/search/:name', function(req, res) {
  var name = req.params.name;
  res.send(getSearchData(name));
})

app.get('/search', function(req, res) {
  res.send(getSearchData(''));
})

// Check Day ==============================================
function checkDay(id, date) {
  var user = readDocument('users', id);
  var returnValue = 0;

  var fd = Array.from(user.FoodDays);
  var ed = Array.from(user.ExerDays);
  if (fd.indexOf(parseInt(date)) > -1) returnValue+=1;
  if (ed.indexOf(parseInt(date)) > -1) returnValue+=2;
  return returnValue.toString();
}

app.get('/user/:user/check/:date', function(req, res) {
  var userid = req.params.user;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var date = req.params.date;

  if (fromUser === parseInt(userid, 10)) {
    res.send(checkDay(userid, date));
  } else {
    res.status(401).end();
  }
})

// Post Daily Item ========================================
function postDayItem(id, date, item, type) {
  var dayData = readDocument('days', date);

  var userData = dayData.users[id];
  userData[type].push(item);
  writeDocument('days', dayData);

  var v = checkDay(id, parseInt(date));
  var change = false;
  var user = readDocument('users', id);
  
  if (v%2 == 0 && type == 'food') {
    user.FoodDays.push(parseInt(date));
    change = true;
  }
  if (v < 2 && type == 'exercise') {
    user.ExerDays.push(parseInt(date));
    change = true;
  }
  if (change) writeDocument('users', user);

  return user;
}

app.post('/dayitem', validate({ body: DayItemSchema }), function(req,res) {
  var userid = req.body.user;
  var fromUser = getUserIdFromToken(req.get('Authorization'));

  if (fromUser === parseInt(userid, 10)) {
    res.send(postDayItem(userid, req.body.date, req.body.item, req.body.type));
  } else {
    res.status(401).end();
  }
})

// Delete Day Item ========================================
function deleteDayItem(id, date, item, type) {
  var dayData = readDocument('days', date);

  var userData = dayData.users[id];
  var index = userData[type].indexOf(item);
  userData[type].splice(index, 1);
  writeDocument('days', dayData);

  if (userData[type].length == 0) {
    var user = readDocument('users', id);
    switch(type) {
      case('food'):
        var i = user.FoodDays.indexOf(date);
        user.FoodDays.splice(i, 1);
        writeDocument('users', user);
        break;
      case('exercise'):
        var i = user.ExerDays.indexOf(date);
        user.ExerDays.splice(i, 1);
        writeDocument('users', user);
        break;
    }
  }

  return dayData;
}

app.delete('/dayitem', validate({ body: DayItemSchema }), function(req,res) {
  var userid = req.body.user;
  var fromUser = getUserIdFromToken(req.get('Authorization'));

  if (fromUser === parseInt(userid, 10)) {
    res.send(deleteDayItem(userid, req.body.date, req.body.item, req.body.type));
  } else {
    res.status(401).end();
  }
})

// Helpers ================================================
// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  // This is a debug route, so don't do any validation.
  database.resetDatabase();
  // res.send() sends an empty response with status code 200
  res.send();
});

// Translates JSON failures to 400s
app.use(function(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    res.status(400).end();
  } else {
    next(err);
  }
})