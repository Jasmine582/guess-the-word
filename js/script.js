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

//Placeholder for chosen letter
const placeholder = function (word) {
    const placeLetters = [];
   for (let letter of word)  {
       placeLetters.push("●");
   }
   wordInProgress.innerText = placeLetters.join("");
};
placeholder(word);

//event listener for button
guessedButton .addEventListener("click", function(e) {
    e.preventDefault();
    const userInput =textInput.value;
    console.log(userInput);
    textInput.value = "";
});
