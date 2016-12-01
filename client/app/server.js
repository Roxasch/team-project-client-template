import {readDocument, writeDocument, addDocument, readItems} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

export function getDayData(id, date, cb) {
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
    }
    writeDocument('days', dayData)
  }
  emulateServerReturn(dayData.users[id], cb);
}

export function getDayPanelData(i, type, cb) {
  var panelItems = [];
  for (var item in i) {
    panelItems.push(readDocument(type, i[item]));
  }
  emulateServerReturn(panelItems, cb);
}

export function getSearchData(name, cb) {
  var items = [];
  var data = readItems();
  for (var i in data) {
    if (data[i].name.toLowerCase().includes(name.toLowerCase())) items.push(data[i]);
  }
  emulateServerReturn(items, cb);
}

export function postDayItem(id, date, item, type, cb) {
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

  emulateServerReturn(dayData, cb);
}

function checkDay(id, date, cb) {
  var user = readDocument('users', id);
  var returnValue = 0;
  if (user.FoodDays.includes(date)) returnValue+=1;
  if (user.ExerDays.includes(date)) returnValue+=2;
  return returnValue;
}

export function getDay(id, date, cb) {
  emulateServerReturn(checkDay(id, date, cb), cb);
}





