// Sample test runner for Node-Box library.
// * Each module runs in its own process (blocking-free)
// * Clients should use the BoxClient lib
// * Clients communicate between host with messages
// By Jonathan Dunlap

var ModuleLoader = require('../lib/BoxHost');

// Instance the ModuleLoader to load clients
var ml = new ModuleLoader();

// Load and start Game2.js module
// Register the file to ID 'game2'
// Register the error handler onError
ml.start('game1', __dirname + '/Game1.js', onError);
ml.start('game2', __dirname + '/Game2.js', onError);

// Register message handler
ml.on('game1', onGame1Message);
ml.on('game2', onGame2Message);

// Call the game2's handler callMe
ml.send('game1', 'callMe', [2, true]);
ml.send('game2', 'callMe', ["Hello World"]);

// Kill the client, as it will continue to run otherwise.
ml.kill('game1');
ml.kill('game2');

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
