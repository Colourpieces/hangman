//state
let secretWord = "";
let word = [];
let fails = 0;
const failsTotal = 1;
let gameStatus = "active";

const secretWords = [
  "flexbox",
  "margin",
  "javascript",
  "array",
  "padding",
  "border",
  "object",
];
const keyboard = document.querySelector("#keyboard");
keyboard.addEventListener("click", (e) => {
  checkLetter(e.target);
});

const btnNewGame = document.querySelector("#btn-newGame");
btnNewGame.addEventListener("click", newGame);

function newGame() {
  //choose word to guess
  secretWord = secretWords[getRandomIntInclusive(0, secretWords.length - 1)];
  console.log(secretWord);
  //initilaize word
  word = [];
  for (let i = 0; i < secretWord.length; i++) {
    word.push("_");
  }
  fails = 0;
  gameStatus = "active";
  renderKeys();
  render();
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
  // The maximum is inclusive and the minimum is inclusive
}

function render() {
  //display word
  const wordDisplay = document.querySelector("#word");
  wordDisplay.innerHTML = "";
  const newWord = document.createTextNode(word.join(" "));
  wordDisplay.appendChild(newWord);

  //display fails
  const failDisplay = document.querySelector("#fails");
  failDisplay.innerHTML = "";
  failDisplay.appendChild(
    document.createTextNode(fails.toString() + " / " + failsTotal.toString())
  );

  //game status
  const gameStatusDisplay = document.querySelector("#status");
  gameStatusDisplay.innerHTML = "";
  gameStatusDisplay.classList.remove("active");
  gameStatusDisplay.classList.remove("loose");
  gameStatusDisplay.classList.remove("win");
  gameStatusDisplay.classList.add(gameStatus);
  gameStatusDisplay.appendChild(document.createTextNode(gameStatus));
}

function renderKeys() {
  const abc = "abcdefghijklmnopqrstuvwxyz".split("");
  keyboard.innerHTML = "";
  abc.forEach((letter) => {
    const key = document.createElement("button");
    key.appendChild(document.createTextNode(letter));
    key.classList.add("btn-letter");
    key.setAttribute("value", letter);
    keyboard.appendChild(key);
  });
}

function checkLetter(pressedBtn) {
  pressedBtn.setAttribute("disabled", "");
  if (secretWord.includes(pressedBtn.value)) {
    console.log("richtig");
    for (let i = 0; i < word.length; i++) {
      if (secretWord[i] === pressedBtn.value) {
        word[i] = pressedBtn.value;
      }
    }
  } else {
    ++fails;
  }
  checkGameStatus();
  render();
}

function checkGameStatus() {
  if (word.includes("_") && fails < failsTotal) {
    gameStatus = "active";
  } else if (!word.includes("_") && fails < failsTotal) {
    gameStatus = "win";
  } else {
    //fails >= failsTotal
    gameStatus = "loose";

    dropBody();
    // $("#rEyes").addClass("hide");
    // $("#xEyes").removeClass("hide");
  }
}

renderKeys();
newGame();

/*-----------------------*/
// $("#animate").click(function(){
//   dropBody();
//   $("#rEyes").addClass("hide");
//   $("#xEyes").removeClass("hide");
// });

/*
function dropBody() {
  $("#door1").velocity({ rotateZ: 90 }, 1000);
  $("#door2").velocity({ rotateZ: -90 }, 1000);
  fall();
}

function fall() {
  let dur = 500;
  let del = 1000;
  $("#body").velocity({ translateY: "200px" }, { duration: dur, delay: del });
  $("#rope").velocity({ y2: "+=200px" }, { duration: dur, delay: del });
  $("#armL").velocity({ y2: "-=60px" }, { duration: dur, delay: del });
  $("#armR").velocity({ y2: "-=60px" }, { duration: dur, delay: del });

  finish();
}

function finish() {
  $("#armL").velocity({ y2: "+=70px", x2: "+=10px" }, 500);
  $("#armR").velocity({ y2: "+=70px", x2: "-=10px" }, 500);
}
*/
