// ModuleLoader by Jonathan Dunlap
// Loads a js file and runs it in its own process.
//  * start a client by calling instance.start(id, file, errorHandler)
//  * send messages by using instance.send(id, msgObject)
//  * kill a client by using instance.kill(id)
//  * Clients should use the ModuleClient lib

var util = require('util');

function ModuleLoader() {
	this.children = {};
}

// Use this for sending raw messages.
// This shouldn't be generally used.
ModuleLoader.prototype.send = function(childID, msg) {
	if(!this.children[childID]) throw("No child by id: " + childID);
	this.children[childID].send(msg);
}

// Use this for executing method handles in the client
ModuleLoader.prototype.do = function(childID, cmd, params) {
	this.send(childID, {'call':cmd, 'params': params});
}

ModuleLoader.prototype.on = function(childID, func) {
	if(!this.children[childID]) throw("No child by id: " + childID);
	this.children[childID].on('message', function(m) {
		if(m['msg']) func(m['msg']);
	});
}

ModuleLoader.prototype.kill = function(clientID) {
	this.send(clientID, {'call': 'kill'});
	delete this.children[clientID];
}

ModuleLoader.prototype.start = function(id, file, onError) {
  	if(this.children[id]) throw("Client ID already started");

 	var child = require('child_process').fork(
 			__dirname + '/../' + file); 
 	child.on('message', function(m) {
 		// library thrown error
 		var err = m['error'];
 		if(err && onError) onError(id, err);
 	});
 	child.on('error', function(m) {
 		// module error
 		if(onError) onError(id, m);
 	});
 	this.children[id] =  child;
 }

module.exports = ModuleLoader;
