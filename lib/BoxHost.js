// BoxHost by Jonathan Dunlap
// Loads a js module file and runs it in its own process.
//  * start a client by calling instance.start(id, file, errorHandler)
//  * send messages by using instance.send(id, msgObject)
//  * kill a client by using instance.kill(id)
//  * Clients should use the ModuleClient lib

var util = require('util');

function BoxHost() {
	this.children = {};
}

// Use this for sending raw messages.
// This shouldn't be generally used.
BoxHost.prototype.sendRaw = function(childID, msg) {
	if(!this.children[childID]) throw("No child by id: " + childID);
	this.children[childID].send(msg);
}

// Use this for executing method handles in the client
BoxHost.prototype.send = function(childID, cmd, params) {
	this.sendRaw(childID, {'call':cmd, 'params': params});
}

BoxHost.prototype.on = function(childID, func) {
	if(!this.children[childID]) throw("No child by id: " + childID);
	this.children[childID].on('message', function(m) {
		if(m['msg']) func(m['msg']);
	});
}

// Kill module by ID
BoxHost.prototype.kill = function(clientID) {
	this.sendRaw(clientID, {'call': 'kill'});
	delete this.children[clientID];
}

// Kill all running modules
BoxHost.prototype.killAll = function() {
	for(var key in this.children) {
		if(this.children.hasOwnProperty(key)) {
			this.kill(key);
		}
	}
}

// Loads specified module and assigns it an ID
// Optionally specify onError handler for error messages
BoxHost.prototype.start = function(id, file, onError) {
  	if(this.children[id]) throw("Client ID already started");

  	// Start the process fork with the Module file
 	var child = require('child_process').fork(file); 

 	// Register error message handlers
 	child.on('message', function(m) {
 		// library thrown error
 		var err = m['error'];
 		if(err && onError) onError(id, err);
 	});
 	child.on('error', function(m) {
 		// module error
 		if(onError) onError(id, m);
 	});

 	// Add the process by ID to the children dictionary
 	this.children[id] =  child;
 }

module.exports = BoxHost;
