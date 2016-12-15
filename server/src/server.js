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
var ResetDatabase  = require('./resetdatabase');

var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');

// Creates an Express server.
var express = require('express');
var app = express();

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/Tracker';

MongoClient.connect(url, function(err, db) {

app.listen(3000, function () {
  console.log('App is listening on port 3000.');
})

app.use('/mongo_express', mongo_express(mongo_express_config));
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
    if (typeof id === 'string') {
      return id;
    } else {
      // Not a number. Return -1, an invalid ID.
      return "";
    }
  } catch (e) {
    // Return an invalid ID.
    return -1;
  }
}

// Get Day Data =============================================
function getDayData(id, date, callback) {
  db.collection('days').findOne({
    _id: date
  }, function(err, dayData) {
    if (err) {
      callback(err);
    } else if (dayData === null) {
      var newDay = {
        "_id": date,
        "users": {
          "1": {
            "_id":id,
            "food": [],
            "exercise": []
          }
        }
      }
      db.collection('days').insertOne(newDay, function(err, dayData) {
        if (err) {
          callback(err);
        } else {
          callback(dayData)
        }
      })
    } else {
      callback(null, dayData.users[parseInt(id, 10)]);
    }
  })

}

app.get('/user/:userid/date/:date', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var date = req.params.date;

  if (fromUser === userid) {
    getDayData(new ObjectID(userid), new ObjectID(date), function(err, dayData) {
      if (err) {
        res.status(500).end();
      } else if (dayData === null) {
        res.status(400).end();
      } else {
        res.send(dayData);
      }
    })
  } else {
    res.status(401).end();
  }
})

// Get Day Panel Data ======================================
function getDayPanelData(i, type, callback) {
  var panelItems = [];

  function getItems(index) {
    db.collection(type).findOne({
      _id: new ObjectID(("000000000000000000000000" + i[index]).slice(-24))
    }, function(err, pItem) {
      if (err) {
        return callback(err);
      } else {
        panelItems.push(pItem);
        if (panelItems.length === i.length) {
          callback(null, panelItems);
        } else {
          getItems(index + 1);
        }
      }
    })
  }

  if (i.length === 0) {
    callback(null, panelItems);
  } else {
    getItems(0);
  }

}

app.get('/panel/:type/items/:number', function(req, res) {
  var type = req.params.type;
  var number = req.params.number.split('-');
  getDayPanelData(number, type, function(err, data) {
    if (err) {
      res.status(500).end();
    } else if (data === null) {
      res.status(400).end();
    } else {
      res.send(data);
    }
  })
})

app.get('/panel/:type/items', function(req, res) {
  var type = req.params.type;
  var number = [];
  getDayPanelData(number, type, function(err, data) {
    if (err) {
      res.status(500).end();
    } else if (data === null) {
      res.status(400).end();
    } else {
      res.send(data);
    }
  })
})

// Get Search Data ========================================
function getSearchData(name, callback) {
  var items = [];
  var data = [];
  var food = getCollection('food');
  var exer = getCollection('exercise');

  db.collection('food').find().toArray(function(err, food) {
    if (err) {
      callback(err);
    } else {
      db.collection('exercise').find().toArray(function(err, exer) {
        if (err) {
          callback(err);
        } else {
          for (var f in food) data.push(food[f]);
          for (var e in exer) data.push(exer[e]);
          for (var i in data) {
            if (data[i].name.toLowerCase().includes(name.toLowerCase())) items.push(data[i]);
          }
          callback(null, items)
        }
      })
    }
  })
}

app.get('/search/:name', function(req, res) {
  var name = req.params.name;

  getSearchData(name, function(err, searchData) {
    if (err) {
      res.status(500).end();
    } else if (searchData === null) {
      res.status(400).end();
    } else {
      res.send(searchData);
    }
  })
})

app.get('/search', function(req, res) {
  getSearchData('', function(err, searchData) {
    if (err) {
      res.status(500).end();
    } else if (searchData === null) {
      res.status(400).end();
    } else {
      res.send(searchData);
    }
  })
})

// Check Day ==============================================
function checkDay(id, date, callback) {
  db.collection('users').findOne({
    _id: id
  }, function(err, userData) {
    if (err) {
      return callback(err);
    } else if (userData === null) {
      return callback(null, null);
    }

    var returnValue = 0;
    var fd = Array.from(userData.FoodDays);
    var ed = Array.from(userData.ExerDays);

    if (fd.indexOf(parseInt(date, 10)) > -1) returnValue+=1;
    if (ed.indexOf(parseInt(date, 10)) > -1) returnValue+=2;

    callback(null, returnValue);
  })
}

app.get('/user/:userid/check/:date', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var date = req.params.date;
  if (fromUser === userid) {
    checkDay(new ObjectID(userid), new ObjectID(date), function(err, cDay) {
      if (err) {
        res.status(500).end();
      } else if (cDay === null) {
        res.status(400).end();
      } else {
        res.send(cDay.toString());
      }
    })
  } else {
    res.status(401).end();
  }
})

// Post Daily Item ========================================
function postDayItem(id, date, item, type, callback) {
  var itemNum = parseInt(item, 10)
  var userNum = parseInt(id, 10).toString()

  db.collection('days').updateOne({
    _id: new ObjectID(date)
  }, {$push: {[`users.${userNum}.${type}`]: itemNum}}, function(err, post) {
    if (err) {
      callback(err);
    } else {
      switch (type){
        case 'food':
          var userType = 'FoodDays';
          break
        case 'exercise':
          var userType = 'ExerDays';
          break
      }
      db.collection('users').updateOne({
        _id: new ObjectID(id)
      }, {$addToSet: {[`${userType}`]: parseInt(date, 10)}}, function(err, u) {
        if (err) {
          callback(err);
        } else {
          callback(null, u);
        }
      })
    }
  })
}

app.post('/dayitem', validate({ body: DayItemSchema }), function(req,res) {
  var userid = req.body['user'];
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser === userid) {
    postDayItem(userid, req.body['date'], req.body['item'], req.body['type'], function(err, postData) {
      if (err) {
        res.status(500).end();
      } else {
        res.send(postData);
      }
    })
  } else {
    res.status(401).end();
  }
})

// Delete Day Item ========================================
function deleteDayItem(id, date, item, type, callback) {
  var itemNum = parseInt(item, 10)
  var userNum = parseInt(id, 10).toString()

  db.collection('days').findOne({
    _id: new ObjectID(date)
  }, function(err, b) {
    var i = b.users[userNum][type].indexOf(itemNum)
    b.users[userNum][type].splice(i, 1);
    var a = b.users[userNum][type]
    db.collection('days').updateOne({
      _id: new ObjectID(date)
    }, {$set: {[`users.${userNum}.${type}`]: a}}, function(err, post) {
      if (err) {
        callback(err);
      } else {
        db.collection('days').findOne({
          _id: new ObjectID(date)
        }, function(err, us) {
          if (us.users[userNum].food.length == 0 && type === 'food') {
            db.collection('users').updateOne({
              _id: new ObjectID(id)
            }, {$pull: {FoodDays: parseInt(date, 10)}}, function(err, u) {
              if (err) {
                callback(err);
              } else {
                callback(null, u);
              }
            })
          } else if (us.users[userNum].exercise.length == 0 && type === 'exercise') {
            db.collection('users').updateOne({
              _id: new ObjectID(id)
            }, {$pull: {ExerDays: parseInt(date, 10)}}, function(err, u) {
              if (err) {
                callback(err);
              } else {
                callback(null, u);
              }
            })
          } else {
            callback(null, post)
          }
        })
      }
    })
  })
}

app.delete('/dayitem', validate({ body: DayItemSchema }), function(req,res) {
  var userid = req.body['user'];
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser === userid) {
    deleteDayItem(userid, req.body['date'], req.body['item'], req.body['type'], function(err, deleteData) {
      if (err) {
        res.status(500).end();
      } else {
        res.send(deleteData);
      }
    })
  } else {
    res.status(401).end();
  }
})

// Helpers ================================================
// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  // This is a debug route, so don't do any validation.
  ResetDatabase(db, function() {
    res.send();
  })
});

// Translates JSON failures to 400s
app.use(function(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    res.status(400).end();
  } else {
    next(err);
  }
})
})