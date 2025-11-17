let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

let playerName = "";
let setNumber = "";
let remainingPlays = "";

function confirmName() {
  let inputName = document.querySelector(".js-input-name").value;
  playerName = inputName;
  const inputNumber = Number(document.querySelector(".js-input-number").value);
  setNumber = inputNumber;
  remainingPlays = inputNumber;
  console.log(setNumber, playerName);
  if (playerName && setNumber) {
    document.querySelector(".js-confirm").innerText = `Confirmed`;

    setTimeout(() => {
      document.querySelector(
        ".remain-main-container"
      ).innerHTML = `All set, ${playerName}! Let’s play!`;
    }, 800);
    setTimeout(() => {
      document.querySelector(".remain-main-container").innerHTML = ``;
    }, 4000);
  } else if (!playerName && setNumber) {
    alert("Please enter your name before you start playing.");
  } else if (playerName && !setNumber) {
    alert("Please enter number before you start playing.");
  } else {
    alert("Please enter your name and number before you start playing.");
  }
}

function playGame(playerMove) {
  if (playerName && setNumber) {
    remainingPlays--;
    document.querySelector(
      ".js-remaining-score"
    ).innerHTML = `${remainingPlays}`;
    if (remainingPlays === 0) {
      if (score.wins >= 3 && score.wins <= 5) {
        alert(
          `You won ${score.wins} out of ${setNumber}\nGreat start,${playerName}!\nYou’re showing real potential.\nGood streak, 6 is your next target!`
        );
        return resetScore();
      } else if (score.wins >= 6 && score.wins <= 8) {
        alert(
          `You won ${score.wins} out of ${setNumber}\nFantastic play,${playerName}!\nYou’re winning like a pro.\nBig energy, reach 9 next!`
        );
        return resetScore();
      } else if (score.wins >= 9) {
        alert(
          `You won ${score.wins} out of ${setNumber}\nOutstanding,${playerName}!\nYou’re a true Rock-Paper-Scissors champion.\nTop player, push past your limit!`
        );
        return resetScore();
      } else {
        alert(
          `${playerName}, you won ${score.wins} out of ${setNumber}.\nHit 3 wins to level up!`
        );
        return resetScore();
      }
    }

    let results = "";
    let computerMove = pickComputerMove();

    if (playerMove === "Scissors") {
      if (computerMove === "Scissors") {
        results = "Tie.";
      } else if (computerMove === "Paper") {
        results = "You Win.";
      } else if (computerMove === "Rock") {
        results = "You Lose.";
      }
    } else if (playerMove === "Paper") {
      if (computerMove === "Paper") {
        results = "Tie.";
      } else if (computerMove === "Rock") {
        results = "You Win.";
      } else if (computerMove === "Scissors") {
        results = "You Lose.";
      }
    } else {
      if (computerMove === "Rock") {
        results = "Tie.";
      } else if (computerMove === "Paper") {
        results = "You Lose.";
      } else if (computerMove === "Scissors") {
        results = "You Win.";
      }
    }

    if (results === "You Win.") {
      score.wins++;
    } else if (results === "You Lose.") {
      score.losses++;
    } else if (results === "Tie.") {
      score.ties++;
    }

    document.querySelector(".js-result").innerText = `${results}`;

    document.querySelector(
      ".js-YouPick-ComputerPick"
    ).innerHTML = `You picked <p class="you-picked">${playerMove},</p>Computer picked <p class="computer-picked">    ${computerMove}</p>`;

    updateScoreElement();

    //this DOM will disappear the reset message when play game

    document.querySelector(".js-total-played").innerText = `Total played : ${
      score.wins + score.losses + score.ties
    }`;

    localStorage.setItem("score", JSON.stringify(score));
  } else {
    alert("Please enter your name and number before you start playing.");
  }
}

function updateScoreElement() {
  document.querySelector(".js-wins").innerText = `${score.wins}`;
  document.querySelector(".js-losses").innerText = `${score.losses}`;
  document.querySelector(".js-ties").innerText = `${score.ties}`;
}

function resetScore() {
  localStorage.removeItem("score");
  showInputContainer();
  score.wins === 0 && score.losses === 0 && score.ties === 0
    ? ((document.querySelector(
        ".resetScore"
      ).innerText = `The score is already reset.`),
      setTimeout(() => {
        document.querySelector(".resetScore").innerText = ``;
      }, 3000))
    : ((score = {
        wins: 0,
        losses: 0,
        ties: 0,
      }),
      (document.querySelector(
        ".resetScore"
      ).innerText = `The score has been reset successfully.`),
      setTimeout(() => {
        document.querySelector(".resetScore").innerText = ``;
      }, 3000));

  document.querySelector(".js-result").innerText = "";

  document.querySelector(".js-total-played").innerText = ``;
  document.querySelector(
    ".js-YouPick-ComputerPick"
  ).innerHTML = `You choose one; the computer chooses one.`;

  document.querySelector(".js-remaining-score").innerHTML = ``;
  document.querySelector(".js-wins").innerText = 0;
  document.querySelector(".js-losses").innerText = 0;
  document.querySelector(".js-ties").innerText = 0;
  document.querySelector(".js-input-name").value = ``;
  document.querySelector(".js-input-number").value = ``;
  playerName = "";
  setNumber = "";
  remainingPlays = "";
  document.querySelector(".js-confirm").innerText = `Confirm`;
}
showInputContainer();
//This function for picking value randomly
function showInputContainer() {
  document.querySelector(
    ".remain-main-container"
  ).innerHTML = `<div class="input-container">
            <input
              class="js-input-number"
              type="text"
              placeholder="Set rounds"
            />
            <input class="js-input-name" type="text" placeholder="Enter name" />
          </div>
          <button
            onclick="
          confirmName();
          "
            class="js-confirm confirm"
          >
            Confirm
          </button>`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }
  return computerMove;
}
// setTimeout(() => {
//   alert("you played 30 seconds , take a break");
// }, 30000);
alert("🎮 Rock Paper Scissors\nCreated by Aminur");
