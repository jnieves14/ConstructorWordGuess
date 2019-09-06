// REQUIRED JS FILES AND NPM
var Word  = require("./word.js");
// var Letter = require("./letter.js");
var inquirer = require("inquirer");
var colors  = require("colors");

var wordChoices = ["acerola", "apricot", "blackberry", "blueberry", "cantaloupe", "cherimoya", "durian", "date", "elderberry", "fig", "grapefruit", "guava", "honeydew", "jackfruit", "jujube", "kiwi", "lemon", "lychee", "mango", "mulberry", "nectarine", "orange", "passion fruit", "peach", "persimmon", "quince", "raspberry", "strawberry", "sugar apple", "tangerine", "watermelon"];

var currentWord;
var alphabet = /[a-zA-Z]/;
var guessesLeft = 10;
var guessedLetters = [];
var usedWords = [];
var firstGame =  true;

// FUNCTION TO GENERATE A RANDOM WORD
function randomWord() {
    var selectedWord = wordChoices[Math.floor(Math.random() * wordChoices.length)];
    if(usedWords.indexOf(selectedWord) < 0){
        currentWord = new Word();
        currentWord.makeWord(selectedWord);
        usedWords.push(selectedWord);
    } else if(usedWords.length !== wordChoices.length) {
        randomWord();
    }  else {
        console.log("There are no more words to guess!".magenta);
        playAgain();
    }
}

function wordGuessed(){
    var word = currentWord.wordArray;
    // LOOPS THROUGH THE WORD CHOICES ARRAY AND ANY UNGUESSED LETTERS
    for(var i = 0; i < word.length; i++){
        if(!word[i].guessed && word[i] !== " "){
            return false;
        }
    }
    // RETURN TRUE IF ALL THE LETTERS HAVE BEEN GUESSED
    return true;
}

// INQUIRER FUNCTION THAT PROMPTS THE USER FOR INPUT
function guessPrompt(){
    // IF ALL GUESSES HAVE BEEN USED UP, ALERT THE USER AND ASK IF THEY WANT TO PLAY AGAIN
    if (guessesLeft <= 0){
        console.log("There are no more guesses left! You lose!".red);
        playAgain();
    }
    // DISPLAY PROMPT IF THE WORD HAS NOT BEEN GUESSED
    else if(!wordGuessed()){
        // IF IT IS THE FIRST GAME, DISPLAY THE WORD AT THE START OF THE GAME
        if(firstGame){
        console.log("Try to guess a fruit!".magenta);
        currentWord.displayWord();
        firstGame = false;
        }
        // USE INQUIRER PROMPT TO ASK FOR USER INPUT
        inquirer.prompt([
            {
                type: "input",
                name: "guess",
                message: "Guess a letter: ",
                // VALIDATION FUNCTION FOR USER INPUT
                validate: function(input){
                    // CHECK IF USER HAS ALREADY GUESSED THIS LETTER
                    if(guessedLetters.indexOf(input.trim().toLowerCase()) >= 0){
                        console.log("\n You have already guessed this letter! Try again!".red);
                        return false;
                    }
                    // CHECK IF USER INPUT IS A SINGLE LETTER
                    else if(alphabet.test(input) && input.trim().length === 1){
                        return true;
                    }
                    // ASK USER TO CHOOSE A SINGLE LETTER IF THEY HAVEN'T FOLLOWED THE RULES
                    else{
                        console.log("\n Please choose a single letter".red);
                        return false;
                    }
                }
            }
        ]).then(function(user){
            // CHECKS USER'S GUESS AND DISPLAY WORD
            currentWord.checkGuess(user.guess);
            currentWord.displayWord();
            // LET USER KNOW IF THEIR GUESS WAS CORRECT OR NOT
            if(currentWord.checkGuess(user.guess)){
                console.log("CORRECT!".green);
            }
            else{
                // DECREASE REMAINING GUESSES IF USER GUESS IS INCORRECT, DISPLAY GUESSES LEFT
                guessesLeft--;
                console.log("INCORRECT! You have ".red + guessesLeft + " guesses left!".red);
            }
            // STORE USER'S GUESS IN AN ARRAY SO IT CANNOT BE CHOSEN AGAIN
            guessedLetters.push(user.guess.trim().toLowerCase());
            guessPrompt();
    
        })
    }
    else{
        // IF USER HAS GUESSED THE WORD, LET THEM KNOW AND ASK THEM IF THEY WANT TO PLAY AGAIN
        console.log("You guessed the word!".green);
        playAgain();
    }
}

// FUNCTION THAT ASKS USER IF THEY WANT TO PLAY AGAIN
function playAgain(){
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Would you like to play again?",
            default: true
        }
    ]).then(function(user){
        // IF USER WANTS TO PLAY AGAIN, START THE GAME OVER WITH A NEW WORD
        if(user.confirm){
            firstGame = true;
            guessedLetters = [];
            guessesLeft = 10;
            randomWord();
            guessPrompt();
            if(usedWords.length === wordChoices.length){
                usedWords = [];
            }
        }
        // END THE GAME IF THE USER DOES NOT WANT TO PLAY AGAIN
        else{
            console.log("Thank you for playing!".magenta);
        }
    })
}

randomWord();
guessPrompt();