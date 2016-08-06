var readline = require("readline");
var args = require('minimist')(process.argv.slice(2));

var rl = readline.createInterface({
	input: require('fs').createReadStream(__dirname + "/dicts/2of12.txt")
});

var word = args._[0];

var pattern = new RegExp("^." + word.slice(1));

var puns = [];

rl.on('line', function (line) {
	var match = pattern.exec(line);
	if (match) {
		var pun = line.replace(pattern, word);
		console.log(line, pun);
	}

});