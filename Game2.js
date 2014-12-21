// Sample client module

var ModuleClient = require('./lib/ModuleClient');
var api = {
	'callMe':callMe
}
var client = new ModuleClient(api);

client.send("Hello Host!");
client.throw("!!!false alarm!!!");


function callMe(a) {
	console.log("Game2 was called with one param: " + a);
}