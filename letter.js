function Letter(letter) {
    this.letter = letter;
    this.guessed = false;
    this.toString = function() {
        if (this.guessed === true) {
            return this.letter.toUpperCase();
        } else {
            return "_";
            } 
        }

    this.checkLetter = function(input) {
        if (input.toLowerCase() === this.letter.toLowerCase()) {
            this.guessed = true;
        } else {
            return false;
        }
    }
}

module.exports = Letter;