const guessedLetterE = document.querySelector(".guessed-letters");
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

//Placeholder for chosen letter and symbols
const placeholder = function (word) {
    const placeLetters = [];
   for (const letter of word)  {
       console.log(letter);
       placeLetters.push("●");
   }
   wordInProgress.innerText = placeLetters.join("");
};
placeholder(word);

guessedButton.addEventListener("click", function (e) {
    e.preventDefault();

    const guess = textInput.value;

   const goodGuess = validInput(guess);

   if (goodGuess) {
       makeGuess (guess);
   }
    textInput.value = "";
});

const validInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        messageAppear.innerText = "Enter a letter.";
    } else if (input.length > 1){
        messageAppear.innerText = "Enter a single letter";
    } else if (!input.match(acceptedLetter)){
        messageAppear.innerText = "Yikes! please enter a letter from A to Z."
    } else {
        return input;
    }
};

const makeGuess = function (guess){
    guess = guess.toUpperCase();
    if(guessedLetters.includes(guess)) {
        messageAppear.innerText = "Letter has already been guessed, Try again."
    } else {
        guessedLetters.push(guess);
       showLetters();
       updateWord (guessedLetters);
    }
};

const showLetters = function(){
    guessedLetterE.innerHTML = "";
    for ( const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLetterE.append(li);
    }
};

const updateWord = function (guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split ("");
    const wordReveal = [];
    for (const letter of wordArray){
        if(guessedLetters.includes(letter)) {
            wordReveal.push(letter.toUpperCase());
        } else {
            wordReveal.push("●");
        }
    }
    wordInProgress.innerText = wordReveal.join("");
    checkIfWinner();
};

const checkIfWinner = function(){
    if(word.toUpperCase() === wordInProgress.innerText) {
        messageAppear.classList.add("win");
        messageAppear.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};