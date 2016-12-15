
var token = 'eyJpZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSJ9'

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
  sendXHR('GET', 'user/' + id+ '/date/' + date, undefined, (xhr) =>
      cb(JSON.parse(xhr.responseText)));
}

export function getDayPanelData(i, type, cb) {
  if (i !== undefined && i.length >= 0) {
    sendXHR('GET', 'panel/' + type + '/items/' + i.join('-'), undefined, (xhr) => {
      cb(JSON.parse(xhr.responseText));
    })
  }
}

export function resetDb() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/resetdb');
    xhr.addEventListener('load', function() {
      window.alert("Database reset! Refreshing the page now...");
      document.location.reload(false);
    });
  xhr.send();
}

export function getSearchData(name, cb) {
  sendXHR('GET', 'search/' + name, undefined, (xhr) =>
          cb(JSON.parse(xhr.responseText)));
}

export function getDay(id, date, cb) {
  sendXHR('GET', 'user/' + id + '/check/' + date, undefined, (xhr) =>{
          cb(xhr.responseText)})
}

export function postDayItem(id, date, item, type, cb) {
  sendXHR('POST', '/dayItem', {
          user: id, 
          date: date, 
          item: item,
          type: type
          }, (xhr) => 
          cb(JSON.parse(xhr.responseText)));
}

export function deleteDayItem(id, date, item, type, cb){
  sendXHR('DELETE', '/dayItem', {
          user: id, 
          date: date, 
          item: item,
          type: type
          }, (xhr) => 
          cb(JSON.parse(xhr.responseText)));
}





