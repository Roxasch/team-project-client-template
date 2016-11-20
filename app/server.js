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

export function getProfilePage(id, cb) {
	var profileData = {};
	profileData.user = readDocument('users', id);
	profileData.goals = readDocument('goals', id);
	profileData.messages = readDocument('messages', id);

	emulateServerReturn(profileData, cb);
}

export function getUsername(id, cb) {
	var user = readDocument('users', id);
	emulateServerReturn(user.username, cb);
}

export function postMessage(id, message, cb) {
	var messageItem = readDocument('messages', id);
	messageItem.content.push({
		"_id": messageItem.content.length + 1,
		"author": id,
		"contents": message
	});
	writeDocument('messages', messageItem);

	emulateServerReturn(messageItem, cb);
}

export function getDayData(id, date, cb) {
	var dayData = readDocument('days', date);
	emulateServerReturn(dayData.users[id-1], cb);
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









