// Game Constants
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mpeg');
const gameOverSound = new Audio('crashed.mpeg');
const moveSound = new Audio('move.mpeg');

let speed = 4;
let lastPaintTime = 60;

let snakearr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;

// High Score Setup
let hiscore = localStorage.getItem("hiscore");
let hiscoreval = hiscore ? JSON.parse(hiscore) : 0;
localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
hiscoreBox.innerHTML = "Hi Score: " + hiscoreval;

// Main Game Loop
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  return (
    snake[0].x >= 18 || snake[0].x <= 0 ||
    snake[0].y >= 18 || snake[0].y <= 0
  );
}

function gameEngine() {
  if (isCollide(snakearr)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Game over");
    snakearr = [{ x: 13, y: 15 }];
    score = 0;
    scoreBox.innerHTML = "Score: " + score;
    return;
  }

  if (snakearr[0].x === food.x && snakearr[0].y === food.y) {
    foodSound.play();
    score++;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "Hi Score: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;

    snakearr.unshift({
      x: snakearr[0].x + inputDir.x,
      y: snakearr[0].y + inputDir.y
    });

    let a = 2, b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random())
    };
  }

  // Move the snake
  for (let i = snakearr.length - 2; i >= 0; i--) {
    snakearr[i + 1] = { ...snakearr[i] };
  }

  snakearr[0].x += inputDir.x;
  snakearr[0].y += inputDir.y;

  // Display snake & food
  board.innerHTML = "";

  snakearr.forEach((e, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.classList.add(index === 0 ? "head" : "snake");
    board.appendChild(snakeElement);
  });

  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Keyboard Controls
window.addEventListener("keydown", e => {
  moveSound.play();
  switch (e.key) {
    case "ArrowUp": inputDir = { x: 0, y: -1 }; break;
    case "ArrowDown": inputDir = { x: 0, y: 1 }; break;
    case "ArrowLeft": inputDir = { x: -1, y: 0 }; break;
    case "ArrowRight": inputDir = { x: 1, y: 0 }; break;
  }
});

// Mobile Controls
upBtn.addEventListener("click", () => { inputDir = { x: 0, y: -1 }; moveSound.play(); });
downBtn.addEventListener("click", () => { inputDir = { x: 0, y: 1 }; moveSound.play(); });
leftBtn.addEventListener("click", () => { inputDir = { x: -1, y: 0 }; moveSound.play(); });
rightBtn.addEventListener("click", () => { inputDir = { x: 1, y: 0 }; moveSound.play(); });

// Start game
window.requestAnimationFrame(main);
