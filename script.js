const hint = document.getElementById("hint");
const noOfGuessesRef = document.getElementById("no-of-guesses");
const guessedNumsRef = document.getElementById("guessed-nums");
const restartButton = document.getElementById("restart");
const game = document.getElementById("game");
const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("check-btn");

let answer, noOfGuesses, guessedNumsArr;

const play = () => {
  const userGuess = guessInput.value;
  if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    alert("ENtrez un nombre valide dans l'interval.");
    return;
  }
  guessedNumsArr.push(userGuess);
  noOfGuesses += 1;
  if (userGuess != answer) {
    if (userGuess < answer) {
      hint.innerHTML = "Vous etes en dessous de la reponse";
    } else {
      hint.innerHTML = "Vous etes au dessus de la reponse";
    }
    noOfGuessesRef.innerHTML = `<span>nombre d'essais:</span> ${noOfGuesses}`;
    guessedNumsRef.innerHTML = `<span>Vos propositions: </span>${guessedNumsArr.join(
      ","
    )}`;
    hint.classList.remove("error");
    setTimeout(() => {
      hint.classList.add("error");
    }, 10);
  } else {
    hint.innerHTML = `Mais quel genie👽!<br>Le nombre etait <span>${answer}</span>.<br>Vous l'avez eu en <span>${noOfGuesses} </span>essai(s).`;
    hint.classList.add("success");
    game.style.display = "none";
    restartButton.style.display = "block";
  }
};

const init = () => {
  console.log("Game Started");
  answer = Math.floor(Math.random() * 100) + 1;
  console.log(answer);
  noOfGuesses = 0;
  guessedNumsArr = [];
  noOfGuessesRef.innerHTML = "nombre d'essais: 0";
  guessedNumsRef.innerHTML = "Vos propositions: None";
  guessInput.value = "";
  hint.classList.remove("success", "error");
};

guessInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    play();
  }
});

restartButton.addEventListener("click", () => {
  game.style.display = "grid";
  restartButton.style.display = "none";
  hint.innerHTML = "";
  hint.classList.remove("success");
  init();
});

checkButton.addEventListener("click", play);
window.addEventListener("load", init);