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

var token = 'eyJpZCI6MX0='

function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  /* global TrackerError */

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    // If success
    if (statusCode >= 200 && statusCode < 300) {
      cb(xhr);
    } else {
      var responseText = xhr.responseText;
      TrackerError('Could not ' + verb + " " + resource + ": Received " +
                    statusCode + " " + statusText + ": " + responseText);
    }
  });
  // Time out the request if it takes longer than 10 sec
  xhr.timeout = 10000;
  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    TrackerError('Could not ' + verb + " " + resource +
                  ": Could not connect to the server.");
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    TrackerError('Could not ' + verb + " " + resource +
                  ": Request timed out.");
  });

  switch (typeof(body)) {
    case 'undefined':
      // No body to send.
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}

export function getDayData(id, date, cb) {
  sendXHR('GET', 'user/' + id+ '/date/' + date, undefined, (xhr) =>{
      console.log(xhr.responseText)
      cb(JSON.parse(xhr.responseText))
    });
}

//=====================================================================

export function getDayPanelData(i, type, cb) {
  if (i.length > 0) {
    sendXHR('GET', 'panel/' + type + '/items/' + i.join('-'), undefined, (xhr) => {
      cb(JSON.parse(xhr.responseText));
    })
  }

  // var panelItems = [];
  // for (var item in i) {
  //   panelItems.push(readDocument(type, i[item]));
  // }
  // emulateServerReturn(panelItems, cb);
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





