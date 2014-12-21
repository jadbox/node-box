// Client library to be used from loaded from the server ModuleLoader library.
// by Jonathan Dunlap
//  * Call the constructor with a object for messaging handles
//  * Send messages back to server by calling instance.send(msg)
var util = require('util');

function ModuleClient(api) {
	if(!api['kill']) {
		api.kill = function() { process.disconnect(); }
	}

	process.on('message', function(m) {
	  //console.log('CHILD got message:', m); // debugging
	  var _call = m['call'];
	  if(_call) {
	  	api[_call].apply(this, m['params']);
	  }
	});

	this.process = process;
	// Quit mo
	//process.disconnect();
}

// Send a message back to the host.
ModuleClient.prototype.send = function(msg) {
  	this.process.send({'msg': msg});
 }

// Send an error to the host.
 ModuleClient.prototype.throw = function(msg) {
  	this.process.send({"error":msg});
 }

module.exports = ModuleClient;
