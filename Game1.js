// Sample client module

var ModuleClient = require('./lib/ModuleClient');
var api = {
	'callMe':callMe
}
var client = new ModuleClient(api);

client.send("Hello Host!");


function callMe(a, b) {
	console.log("Game1 was called with two params: " + a + ' and ' + b);
}