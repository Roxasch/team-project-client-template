import {readDocument, writeDocument, addDocument} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
	console.log(cb)
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

export function postMessage(id, message, cb) {
	var messageItem = readDocument('messages', id);
	messageItem.push({
		"author": id,
		"contents": message
	});
	writeDocument('messages', messageItem);

	emulateServerReturn(getProfilePage(id), cb)
}

export function getUsername(id, cb) {
	var user = readDocument('users', id);
	emulateServerReturn(user.username, cb);
}