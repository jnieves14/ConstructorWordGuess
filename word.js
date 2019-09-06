var Letter = require("./letter.js");

function Word(answer) {
    // array with letters as objects
    this.array = [];

    for (var i = 0; i < array.length; i++) {
        var letter = new Letter(answer[i]);
        this.array.push(letter);
    }

    this.log = function() {
        answersLog = "";
        for (var i = 0; i < this.array.length; i++) {
            answersLog += this.array[i] + " ";
        }
        console.log(answerslog + "\n");
    }

    this.userGuess = function(userGuess) {
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].guess(userGuess);
        }
    }
}

module.exports = Word;