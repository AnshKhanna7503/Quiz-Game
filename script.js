const quizData = [
    {
        question: 'What is the capital of Japan?',
        answers: [
            { text: 'Beijing', correct: false },
            { text: 'Seoul', correct: false },
            { text: 'Tokyo', correct: true },
            { text: 'Bangkok', correct: false }
        ]
    },
    {
        question: 'Which programming language is known for building dynamic websites?',
        answers: [
            { text: 'Java', correct: false },
            { text: 'Python', correct: false },
            { text: 'JavaScript', correct: true },
            { text: 'C++', correct: false }
        ]
    },
    {
        question: 'What is the largest mammal in the world?',
        answers: [
            { text: 'Elephant', correct: false },
            { text: 'Blue Whale', correct: true },
            { text: 'Giraffe', correct: false },
            { text: 'Hippopotamus', correct: false }
        ]
    },
    {
        question: 'Which country is known as the Land of the Rising Sun?',
        answers: [
            { text: 'China', correct: false },
            { text: 'India', correct: false },
            { text: 'Japan', correct: true },
            { text: 'South Korea', correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let points = 0;
let timeLeft = 20;
let timerInterval;

const loginContainer = document.getElementById('login-container');
const loginForm = document.getElementById('login-form');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const feedbackContainer = document.getElementById('feedback');
const pointsCount = document.getElementById('points-count');
const timeLeftElement = document.getElementById('time-left');

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation (for demonstration purposes)
    if (username === 'user' && password === 'password') {
        loginContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        startQuiz();
    } else {
        alert('Invalid username or password. Try again.');
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    points = 0;
    timeLeft = 20;
    updatePoints();
    showQuestion(quizData[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    questionText.innerText = question.question;
    answerButtons.innerHTML = '';

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        points += 1;
        feedbackContainer.innerText = 'Correct!';
        feedbackContainer.style.color = '#4CAF50';
    } else {
        feedbackContainer.innerText = 'Wrong! Try again.';
        feedbackContainer.style.color = '#d45d8d';
    }

    // Disable answer buttons after selection
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });

    // Show next button
    nextButton.style.display = 'block';

    // Update points
    updatePoints();
}

function nextQuestion() {
    // Enable answer buttons for the next question
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = false;
    });

    // Hide next button
    nextButton.style.display = 'none';

    // Clear feedback
    feedbackContainer.innerText = '';

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion(quizData[currentQuestionIndex]);
        timeLeft = 20; // Reset timer for each question
    } else {
        // Display quiz completion message or navigate to a different page
        alert(`Quiz completed!\nTotal Points: ${points}`);
        clearInterval(timerInterval);
    }
}

function updatePoints() {
    pointsCount.innerText = points;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeftElement.innerText = timeLeft;
        if (timeLeft === 0) {
            // Time's up, move to the next question
            nextQuestion();
        } else {
            timeLeft--;
        }
    }, 1000);
}

// Start the quiz when the page loads
// Comment the line below if you want users to start on the login page
startQuiz();
