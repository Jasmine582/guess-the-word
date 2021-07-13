const guessedLetter = document.querySelector(".guessed-letters");
const guessedButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainderGuess = document.querySelector(".remaining");
const remainderGuessSpan = document.querySelector(".remaining span");
const messageAppear = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

//tested word for game
const word = "magnolia";
const guessedLetters = [];
//Placeholder for chosen letter
const placeholder = function (word) {
    const placeLetters = [];
   for (let letter of word)  {
       console.log(letter);
       placeLetters.push("●");
   }
   wordInProgress.innerText = placeLetters.join("");
};
placeholder(word);

//event listener for button
guessedButton .addEventListener("click", function (e) {
    e.preventDefault();

    messageAppear.innerText = "";

    const userInput =textInput.value;

    const goodGuess = playersInput(userInput);

    if (goodGuess) {
       makeGuess(userInput);
    }
    textInput.value = ""; 
});



//Player's input
const playersInput = function(input){
    const acceptedLetter = /[a-zAZ]/;
    //checking for an empty input
 if(input.length===0) {
     messageAppear.innerText = "Enter a Letter";
     //checking for entered more than one letter
 } else if ( input.length > 1) {
     messageAppear.innerText = "Enter a single letter";
     //character doesn't match the reg. expression
 } else if(!input.match(acceptedLetter)){
    messageAppear.innerText = "Yikes! Please enter a letter from A to Z. "
 }  else {
     return input;
 }
};
//make a guess
const makeGuess = function(guess){
    guess = guess.toUpperCase();
    if(guessedLetters.includes(guess)) {
        messageAppear.innerText = "Letter has already been tried, Try Again";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};