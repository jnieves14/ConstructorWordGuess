function Letter(letter) {
    this.letter = letter,
    this.guessed = false,
    this.toString = function() {
        if (this.guessed) {
            return this.letter.toUpperCase();
        } else {
            return "_";
            } 
        },

    this.checkLetter = function(input) {
        if (input.toLowerCase() === this.letter.toLowerCase()) {
            this.guessed = true;
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Letter;