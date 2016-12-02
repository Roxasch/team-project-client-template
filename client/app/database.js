import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = 'FitnessTracker';

// Put your mock objects here, as in Workshop 4
var initialData = {
  "users": {
    "1": {
      "_id": 1,
      "username": "Kyle Toth",
      "FoodDays": [1023116],
      "ExerDays": [1023116]
    },
    "2": {
      "_id": 2,
      "username": "Someone",
      "FoodDays": [],
      "ExerDays": []
    }
  },
  "days": {
    "1023116": {
      "_id": 1023116,
      "users": {
        "1": {
          "_id": 1,
          "food": [1],
          "exercise": [1]
        }
      }
    }
  },
  "food": {
    "1": {
      "_id": 1,
      "name": "Apple",
      "calories": 95,
      "fat": 0.3,
      "carbs": 25,
      "protein": 0.5,
      "type": "food"
    },
    "2": {
      "_id": 2,
      "name": "Banana",
      "calories": 105,
      "fat": 0.4,
      "carbs": 27,
      "protein": 1.3,
      "type": "food"
    }
  },
  "exercise": {
    "1": {
      "_id": 1,
      "name": "Running (1 mile)",
      "calories": 100,
      "type": "exercise"
    },
    "2": {
      "_id": 2,
      "name": "Walking (1 mile)",
      "calories": 80,
      "type": "exercise"
    }
  }
};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Returns the items that can be searched for.
 * These items are the food and exercise collections.
 */
export function readItems() {
  var a = [];
  for (var item in data['food']) a.push(JSONClone(data['food'][item]))
  for (var item in data['exercise']) a.push(JSONClone(data['exercise'][item]))
  return a;
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

