var cmudict = require('cmu-pronouncing-dictionary')
var args = require('minimist')(process.argv.slice(2));

var pun_word = args._[0];

var pronunciation = cmudict[pun_word];

if (!pronunciation) {
	console.log("Sorry, we couldn't find \"" + pun_word + "\" in the CMU pronunciation dictionary.");
	return;
}

var pattern = new RegExp("^.{1,3}" + pun_word.slice(1));

var pun_head = pronunciation.split(" ").slice(1).join(" ");

var words = Object.keys(cmudict);

words.forEach(function(word) {
	var phonemes = cmudict[word];

	// eliminate words that don't possess the sound of the pun word
	var index = phonemes.indexOf(pun_head);

	if (index == -1) {
		return;
	}

	var substr = phonemes.slice(0, index + pun_head.length).split(" ");

	// sound is too internal
	if (substr.length - pun_head.split(" ").length > 2) {
		return;
	}

	console.log(word, word.replace(pattern, pun_word));

});
