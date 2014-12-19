var util = require('util');
var vm   = require('vm');

function ModuleLoader(options) {

}
ModuleLoader.prototype.run = function(code, cb) {
  vm.runInThisContext('var hello = "world2"; console.log("Hello " + hello);');
}


module.exports = ModuleLoader;
