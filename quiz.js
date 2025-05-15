let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const timerElement = document.getElementById('timer');
const progressBar = document.getElementById('progressBar');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');

// Quiz questions array
const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "What is the capital of Italy?",
    options: ["Milan", "Rome", "Venice", "Florence"],
    answer: "Rome"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "jQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "What does HTML stand for?",
    options: ["HighText Machine Language", "HyperText Markup Language", "HyperText Markdown Language", "None"],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which is the smallest continent?",
    options: ["Asia", "Europe", "Australia", "Africa"],
    answer: "Australia"
  },
  {
    question: "Who developed the theory of relativity?",
    options: ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Nikola Tesla"],
    answer: "Albert Einstein"
  },
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Hanoi"],
    answer: "Tokyo"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Osmium", "Ozone", "Oganesson"],
    answer: "Oxygen"
  },
  {
    question: "Who is known as the father of modern physics?",
    options: ["Albert Einstein", "Isaac Newton", "Niels Bohr", "Galileo Galilei"],
    answer: "Albert Einstein"
  },
  {
    question: "Which country is the largest by area?",
    options: ["USA", "China", "India", "Russia"],
    answer: "Russia"
  }
];

// Shuffle questions to randomize the order
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

shuffleArray(questions);

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = '';

  currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('btn', 'btn-light');
    button.onclick = () => checkAnswer(option, currentQuestion.answer, button);
    optionsElement.appendChild(button);
  });

  startTimer();
  updateProgressBar();
}

function checkAnswer(selected, correct, button) {
  if (selected === correct) {
    score++;
    button.classList.add('correct');
    correctSound.play();
  } else {
    button.classList.add('wrong');
    wrongSound.play();
  }

  // Disable all buttons after selection
  Array.from(optionsElement.children).forEach(btn => btn.disabled = true);

  setTimeout(nextQuestion, 1000);
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timerElement.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function nextQuestion() {
  clearInterval(timer);
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionElement.textContent = '';
  optionsElement.innerHTML = '';
  resultElement.classList.remove('d-none');
  scoreElement.textContent = `${score} / ${questions.length}`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultElement.classList.add('d-none');
  progressBar.style.width = '0%';
  shuffleArray(questions);
  loadQuestion();
}

// Load first question on page load
window.onload = loadQuestion;
