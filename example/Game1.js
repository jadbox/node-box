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

// This handle gets called for host messages
function callMe(a) {
	console.log("Game1 was called with one param: " + a);
}