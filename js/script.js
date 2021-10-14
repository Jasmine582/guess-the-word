const guessedLetterE = document.querySelector(".guessed-letters");
const guessedButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainderGuessE = document.querySelector(".remaining");
const remainderGuessSpan = document.querySelector(".remaining span");
const messageAppear = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");


let word = "magnolia"; 
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
 const newWord = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
 const words = await newWord.text();
 const wordArray = words.split ("\n");
 const randomIndex = Math.floor (Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
 placeholder(word);
};

getWord();



const placeholder = function (word) {
    const placeLetters = [];
   for (const letter of word)  {
       placeLetters.push("●");
   }
   wordInProgress.innerText = placeLetters.join("");
};

guessedButton.addEventListener("click", function (e) {
    e.preventDefault();

    messageAppear.innerText = "";

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
        guessedLetters.push(guess)
        guessRemain(guess);
       showLetters();
       updateWord (guessedLetters);
    }
};

const showLetters = function () {
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


const guessRemain = function (guess) {
    const upWord = word.toUpperCase();
    if( !upWord.includes(guess)) {
        messageAppear.innerText = `Sorry! There's no ${guess}'s in this word, Try Again!`; 

        remainingGuesses -= 1;
    } else {
        messageAppear.innerText = `Good Guess! There's ${guess}'s in this word`;
    }

    if(remainingGuesses === 0) {
        messageAppear.innerHTML = `Game Over! The word was <span class = "highlight">${word}</span>`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainderGuessSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainderGuessSpan.innerText = `${remainingGuesses} guesses`;
    }
};


const checkIfWinner = function () {
    if(word.toUpperCase() === wordInProgress.innerText) {
        messageAppear.classList.add("win");
        messageAppear.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

        startOver();
    }
};


const startOver = function () {
    guessedButton.classList.add("hide");
    remainderGuessE.classList.add("hide");
    guessedLetterE.classList.add("hide");
    playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function(){
    messageAppear.classList.remove("win");
    remainingGuesses = 8;
    guessedLetters = [];
    remainderGuessSpan.innerText = `${remainingGuesses} guesses`;
    guessedLetterE.innerHTML = "";
    messageAppear.innerText = "";

    getWord();

    guessedButton.classList.remove("hide");
    playAgain.classList.add("hide");
    guessedLetterE.classList.remove("hide");
    remainderGuessE.classList.remove("hide");
});

