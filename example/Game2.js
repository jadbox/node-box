// Sample client module

// Load the client library
var ModuleClient = require('../lib/BoxClient');
// Set the API handles
var api = {
	'callMe':callMe
}
// Instance the client lib with the API handles
var client = new ModuleClient(api);

// Send a message to the host
client.send("Hello Host!");

// Send an error message to the host
client.throw("!!!false alarm!!!");

// This handle gets called for host messages
function callMe(a,b) {
	console.log("Game2 was called with two params: " + a + " and " + b);
}