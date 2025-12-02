let round = 0;
const maxRounds = 7;
let players = [];
let scores = [];

function initGame() {
  players = [
    document.getElementById("p1").value.trim(),
    document.getElementById("p2").value.trim(),
    document.getElementById("p3").value.trim(),
    document.getElementById("p4").value.trim()
  ].filter(name => name !== "");

  if (players.length < 2) {
    alert("❗ Please enter at least 2 player names to start the game.");
    return;
  }

  document.getElementById("nameInputs").style.display = "none";
  document.getElementById("gameDisplay").classList.remove("show");
  round = 0;
  scores = new Array(players.length).fill(0);

  startGame();
}

function startGame() {
  if (round >= maxRounds) return;

  round++;
  document.getElementById("round").textContent = `🎯 Round ${round} of ${maxRounds}`;

  let countdown = 3;
  document.getElementById("countdown").textContent = countdown;

  const interval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      document.getElementById("countdown").textContent = countdown;
    } else if (countdown === 0) {
      document.getElementById("countdown").textContent = "🎲 Rolling!";
    } else {
      clearInterval(interval);
      document.getElementById("countdown").textContent = "";
      playRound();
    }
  }, 800);
}

function playRound() {
  const gameDisplay = document.getElementById("gameDisplay");
  gameDisplay.classList.remove("show");
  void gameDisplay.offsetWidth;
  gameDisplay.classList.add("show");

  let rollsText = "";
  for (let i = 0; i < players.length; i++) {
    const roll = Math.floor(Math.random() * 6) + 1;
    scores[i] += roll;
    rollsText += `<div class="dice">${players[i]} rolled: ${roll} 🎲</div><br>`;
  }

  document.getElementById("rolls").innerHTML = rollsText;
  document.getElementById("scores").innerText =
    `Scores:\n${players.map((p, i) => `${p}: ${scores[i]}`).join('\n')}`;

  if (round === maxRounds) {
    declareWinner();
  }
}

function declareWinner() {
  const maxScore = Math.max(...scores);
  const winners = players.filter((_, i) => scores[i] === maxScore);

  let resultText = "";
  if (winners.length === 1) {
    resultText = `🏆 ${winners[0]} Wins with ${maxScore} Points!`;
  } else {
    resultText = `🤝 It's a Tie between ${winners.join(" & ")} with ${maxScore} Points!`;
  }

  document.getElementById("result").textContent = resultText;
}

function resetGame() {
  round = 0;
  players = [];
  scores = [];

  document.getElementById("nameInputs").style.display = "block";
  document.getElementById("gameDisplay").classList.remove("show");

  document.getElementById("round").textContent = "";
  document.getElementById("rolls").textContent = "";
  document.getElementById("scores").textContent = "";
  document.getElementById("result").textContent = "";
  document.getElementById("countdown").textContent = "";

  document.getElementById("p1").value = "";
  document.getElementById("p2").value = "";
  document.getElementById("p3").value = "";
  document.getElementById("p4").value = "";
}
