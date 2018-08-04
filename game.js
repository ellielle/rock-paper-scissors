const start = document.querySelector("#start");
const status = document.querySelector(".status");
const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");
const gameButtons = document.querySelectorAll(".btn");
const scoreCount = document.querySelector(".score");
const resetButton = document.querySelector(".resetbtn");
const scoreContainer = document.createElement("div");
const playerContainer = document.createElement("div");
const score = document.createElement("p");
const statusMessage = document.createElement("p");
let playerScore = 0;
let computerScore = 0;

function hideStart(e) {
  if (!this.classList.contains("hide")) {
      this.classList.add("hide");
    }

  gameButtons.forEach(btn => btn.classList.remove("hide"));
  status.classList.add("hide");
  playerScore = 0;
  computerScore = 0;
  updateScore(playerScore, computerScore);
}

start.addEventListener("click", hideStart);
rockButton.addEventListener("click", playRound);
paperButton.addEventListener("click", playRound);
scissorsButton.addEventListener("click", playRound);
resetButton.addEventListener("click", hideStart);



function computerPlay() {
    return Math.floor((Math.random() * 3) + 1);  //1 is rock, 2 is paper, 3 is scissors
}

function returnText(num) {
    switch (num){
      case 1:
        return "rock";
      case 2:
        return "paper";
      case 3:
        return "scissors";
    }
}
function playerSelection(str) {
    input = str.toLowerCase();

    switch(input) {
      case "rock":
        return 1;
      case "paper":
        return 2;
      case "scissors":
        return 3;
      default:
        return 0;
    }
  }

function playRound(e) {
  if(playerScore < 5 && computerScore < 5) {
    player = playerSelection(e.target.textContent.toLowerCase());
    computer = computerPlay();
    if ((player > computer) || ((player == 1) && (computer == 3))) {
      statusMessage.textContent = `You win, ${returnText(player)} beats ${returnText(computer)}!`;
      status.appendChild(statusMessage);
      if(status.classList.contains("hide")) status.classList.remove("hide");
      playerScore++;
      if (playerScore == 5) resetGame(1);
      updateScore(playerScore, computerScore);
    }
    else if ((player < computer) || ((player ==3) && (computer == 1))) {
      statusMessage.textContent = `You lose, ${returnText(computer)} beats ${returnText(player)}!`;
      status.appendChild(statusMessage);
      if(status.classList.contains("hide")) status.classList.remove("hide");
      computerScore++;
      if(computerScore == 5) resetGame(0);
      updateScore(playerScore, computerScore);
    }
    else if (player == computer) {
      statusMessage.textContent = "It\'s a tie!";
      status.appendChild(statusMessage);
      if(status.classList.contains("hide")) status.classList.remove("hide");
      updateScore(playerScore, computerScore);
    }
  }
  else {
    if (playerScore == 5) {
      resetGame(1);
    }
    else {
      resetGame(0);
    }
  }
}

function updateScore(player, computer) {
  score.textContent = "Player: " + player + " Computer: " + computer;
  scoreContainer.appendChild(score);
  scoreCount.appendChild(scoreContainer);
  scoreCount.classList.remove("hide");
}

function resetGame(result) {
  statusMessage.textContent = (result) ? "You win! Click reset to start another game" : "You lose! Click reset to start another game";
  gameButtons.forEach(btn => btn.classList.add("hide"));
  resetButton.classList.remove("hide");
}