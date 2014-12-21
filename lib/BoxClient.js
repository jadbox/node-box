// Client library to be used from loaded from a host using the BoxHost library.
// by Jonathan Dunlap
//  * Call the constructor with a object for messaging handles
//  * Send messages back to server by calling instance.send(msg)
var util = require('util');

// The ctor requires an API object that associates the key name to method reference.
function BoxClient(api) {
	if(!api['kill']) {
		api.kill = this.kill.bind(this);
	}

	process.on('message', function(m) {
	  //console.log('CHILD got message:', m); // debugging
	  var _call = m['call'];
	  if(_call) {
	  	api[_call].apply(this, m['params']);
	  }
	});

	this.process = process;
}

// Disconnect the module from the host
BoxClient.prototype.kill = function() {
	this.process.disconnect();
}

// Send a message back to the host.
BoxClient.prototype.send = function(msg) {
  	this.process.send({'msg': msg});
 }

// Send an error to the host.
 BoxClient.prototype.throw = function(msg) {
  	this.process.send({"error":msg});
 }

module.exports = BoxClient;
