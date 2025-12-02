const startBtn = document.getElementById('start-btn');
const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreEl = document.getElementById('score');
const currentEl = document.getElementById('current');
const progressBar = document.getElementById('progress-bar');
const summary = document.getElementById('summary');
const finalScore = document.getElementById('final-score');
const highScoreEl = document.getElementById('high-score');
const timeLeftEl = document.getElementById('time-left');
const playAgainBtn = document.getElementById('play-again-btn');

let score = 0;
let questionCount = 0;
let correctAnswer = 0;
let timer;

function generateQuestion() {
  let a = Math.floor(Math.random() * 50) + 1;
  let b = Math.floor(Math.random() * 50) + 1;
  let ops = ['+', '-', '*', '/'];
  let op = ops[Math.floor(Math.random() * ops.length)];

  if (op === '/') {
    correctAnswer = a;
    a = a * b;
  }

  let questionText = `${a} ${op} ${b}`;
  correctAnswer = Math.round(eval(questionText));

  const options = [correctAnswer];
  while (options.length < 4) {
    const fake = correctAnswer + Math.floor(Math.random() * 10 - 5);
    if (!options.includes(fake)) options.push(fake);
  }

  return {
    question: `What is ${questionText}?`,
    options: options.sort(() => Math.random() - 0.5)
  };
}

function startTimer() {
  let time = 30;
  timeLeftEl.textContent = time;

  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    timeLeftEl.textContent = time;

    if (time <= 0) {
      clearInterval(timer);
      showQuestion();
    }
  }, 1000);
}

function showQuestion() {
  const q = generateQuestion();
  questionEl.textContent = q.question;
  answersEl.innerHTML = '';

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = 'btn-answer';
    btn.onclick = () => selectAnswer(btn);
    answersEl.appendChild(btn);
  });

  nextBtn.style.display = 'none';
  restartBtn.style.display = 'none';

  updateProgress();
  startTimer();
}

function selectAnswer(btn) {
  clearInterval(timer);

  const buttons = document.querySelectorAll('.btn-answer');
  buttons.forEach(b => {
    b.disabled = true;

    if (parseInt(b.textContent) === correctAnswer) {
      b.classList.add('btn-correct');
    } else if (b === btn) {
      b.classList.add('btn-wrong');
    }
  });

  if (parseInt(btn.textContent) === correctAnswer) score++;

  scoreEl.textContent = score;
  nextBtn.style.display = 'block';
  restartBtn.style.display = 'block';
}

function updateProgress() {
  questionCount++;
  currentEl.textContent = questionCount;

  progressBar.style.width = `${(questionCount % 10) * 10}%`;
}

function showSummary() {
  quiz.style.display = 'none';
  summary.style.display = 'block';

  finalScore.textContent = score;

  const highScore = Math.max(score, localStorage.getItem('mathHighScore') || 0);
  localStorage.setItem('mathHighScore', highScore);

  highScoreEl.textContent = highScore;
}

startBtn.onclick = () => {
  score = 0;
  questionCount = 0;

  scoreEl.textContent = score;
  summary.style.display = 'none';
  quiz.style.display = 'block';

  showQuestion();
};

nextBtn.onclick = showQuestion;
restartBtn.onclick = showQuestion;

playAgainBtn.onclick = () => {
  score = 0;
  questionCount = 0;

  summary.style.display = 'none';
  quiz.style.display = 'block';

  showQuestion();
};
