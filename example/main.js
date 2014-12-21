// Sample test runner for Node-Box library.
// * Each module runs in its own process (blocking-free)
// * Clients should use the BoxClient lib
// * Clients communicate between host with messages
// By Jonathan Dunlap

var BoxHost = require('../lib/BoxHost');

// Instance the BoxHost to load clients
var host = new BoxHost();

// Load and start Game2.js module
// Register the file to ID 'game2'
// Register the error handler onError
host.start('game1', __dirname + '/Game1.js', onError);
host.start('game2', __dirname + '/Game2.js', onError);

// Register message handler
host.on('game2', onGame2Message);

// Call client module handler with parameters:
host.send('game1', 'callMe', ["Hello World"]);
host.send('game2', 'callMe', [2, true]);

// Kill the client, as it will continue to run otherwise.
host.kill('game1');
host.kill('game2');

// Message handles are divided into their own handles
function onGame1Message(msg) {
	console.log("Server recieved from Game1: " + msg);
}

function onGame2Message(msg) {
	console.log("Server recieved from Game2: " + msg);
}

// Error handle unified to one global handler
function onError(id, errMsg) {
	console.log("Server recieved error from "+id+": " + errMsg);
}
