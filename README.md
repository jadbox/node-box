# Node-Box
By: Jonathan Dunlap
12/21/2014

A Node.js sandbox module loader with event pipe. Each client module runs in its own process (blocking-free) and communicates by message passing.


## Features
- Runs each module in its own process, keeping operations block-free from other modules!
- Client modules are proper child-processes to the host, aiding monitoring and debugging.
- Modules have a full node environment, including stdout.
- Modules run in a complete isolated environment and cannot conflict with eachother.
- Modules and Host can communicate bi-directionally
- Modules can throw errors to the host.
- The host can directly start and kill modules dynamically


## Example

For a full example see [example/main.js](https://github.com/jadbox/node-box/blob/master/example/main.js)

Example Host:
```javascript
// Instance the BoxHost to load clients
var host = new BoxHost();

// Load and start Game2.js module
// Register the file to ID 'game2'
// Register the error handler onError
host.start('game1', __dirname + '/Game1.js', onError);

// Register message handler
host.on('game1', function(msg) { } );

// Call registered module handler with parameters:
host.send('game1', 'callMe', [2, true]);

// Kill the client, as it will continue to run otherwise.
host.kill('game1');

```
Example Client (called Game1):
```javascript
// Set the API handles
var api = {
	'callMe':callMe
}
// Instance the client lib with the API handles
var client = new BoxClient(api);

// Send a message to the host
client.send("Hello Host!");

// Send an error message to the host
client.throw("!!!false alarm!!!");

// This handle gets called for host messages
function callMe(a) {
	console.log("Game1 was called with one param: " + a);
}
