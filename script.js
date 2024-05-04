const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestion, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setnextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestion = question.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setnextQuestion();
    quizScore = 0;
}

function setnextQuestion() {
    resetState();
    if (currentQuestionIndex < shuffledQuestion.length) {
        showQuestion(shuffledQuestion[currentQuestionIndex]);
    } else {
        
        questionContainerElement.innerHTML = '<h2>Quiz Complete</h2>';
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        startButton.addEventListener('click', startGame); 
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct);
    });

    if (correct) {
        quizScore++;
    } else {
        answerButtonsElement.insertAdjacentHTML('beforeend', '<p>Try Again</p>');
    }

    if (shuffledQuestion.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        questionContainerElement.innerHTML = '<h2>Quiz Complete</h2>';
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        startButton.addEventListener('click', startGame); 
    }

    document.getElementById('right-answers').innerText = quizScore;
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const question = [
    {
        question: 'Which tag is used to define the structure of an HTML document?',
        answers: [
            { text: '<title>', correct: false },
            { text: '<body>', correct: false },
            { text: '<head>', correct: false },
            { text: '<html>', correct: true },
        ],
    },
    {
        question: 'HTML stands for?',
        answers: [
            { text: 'How To Make Lumpia', correct: false },
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'Hyper Transfer Markup Language', correct: false },
            { text: 'High Tech Markup Language', correct: false },
        ],
    },
    {
        question: 'Which tag is used to add an image to an HTML page?',
        answers: [
            { text: '<img>', correct: true },
            { text: '<image>', correct: false },
            { text: '<picture>', correct: false },
            { text: '<src>', correct: false },
        ],
    },
    {
        question: 'Which tag is used to define a hyperlink in HTML?',
        answers: [
            { text: '<a>', correct: true },
            { text: '<h>', correct: false },
            { text: '<p>', correct: false },
            { text: '<b>', correct: false },
        ],
    },
    {
        question: 'True/False: The alt attribute in the <img> tag is required to provide alternative text for screen readers and when the image cannot be displayed.',
        answers: [
            { text: 'True', correct: true },
            { text: 'False', correct: false },
        ],
    },
];
const moreQuestions = [
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Central Style Sheets', correct: false },
            { text: 'Crazy Style Sheets', correct: false },
            { text: 'Computer Style Sheets', correct: false },
        ],
    },
    {
        question: 'What is the correct way to comment in HTML?',
        answers: [
            { text: '<!-- This is a comment -->', correct: true },
            { text: '// This is a comment', correct: false },
            { text: '<! This is a comment !>', correct: false },
            { text: '/* This is a comment */', correct: false },
        ],
    }
];

const allQuestions = [...question, ...moreQuestions];

// Randomize Design
function randomizeDesign() {
    const hueValues = [0, 145, 200]; // Possible hue values
    const randomHue = hueValues[Math.floor(Math.random() * hueValues.length)];
    document.body.style.setProperty('--hue-neutral', randomHue);
}


function showPopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('hide');
    setTimeout(() => {
        popup.classList.add('hide');
    }, 2000);
}

function showQuestion(question) {
    randomizeDesign(); 
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct);
    });

    if (correct) {
        quizScore++;
        showPopup(); // Show popup for correct answer
    } else {
        document.getElementById('wrong-popup').classList.remove('hide'); // Show popup for wrong answer
        setTimeout(() => {
            document.getElementById('wrong-popup').classList.add('hide');
        }, 2000); // Hide after 2 seconds
    }

    if (allQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        questionContainerElement.innerHTML = '<h2>Quiz Complete</h2>';
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        startButton.addEventListener('click', startGame); 
    }

    document.getElementById('right-answers').innerText = quizScore;
}
