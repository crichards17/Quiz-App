const btnStart = $('.btn-start');
const startCardEl = $('#start-card');
const qCardEl = $('#q-card');
const gameWinCardEl = $('#game-win-card');
const timerEl = $('#timer');
const questionEl = $('#question');
const btnA1 = $('#btn-answer-1');
const btnA2 = $('#btn-answer-2');
const btnA3 = $('#btn-answer-3');
const btnA4 = $('#btn-answer-4');
const resultEl = $('#result');
const gameLoseCardEl = $('#game-lose-card');
const btnScoreSubmit = $('#score-submit');
const nameInputEl = $('#score-name');
const scoreListEl = $('.scores-list');


const questionSet = [
    {
        question: "What does CSS stand for?", 
        a1: "Cascading Style Sheets", 
        a2: "Curse Some Stuff", 
        a3: "Cause [i] Said So", 
        a4: "no idea",
        answer: '1'
    },
    {
        question: "What is HTML?", 
        a1: "Web magic", 
        a2: "Hyper Text Markup Language", 
        a3: "More Web Magic", 
        a4: "no idea",
        answer: '2'
    },
    {
        question: "What is the name of the language used for scripting web elements?", 
        a1: "Java", 
        a2: "Oracle", 
        a3: "JavaScript", 
        a4: "no idea",
        answer: '3'
    },
    {
        question: "Which Git command copies content from your remote repository to your local repository?", 
        a1: "git add", 
        a2: "git pull", 
        a3: "git commit", 
        a4: "no idea",
        answer: '2'
    },
]

const startingTime = 5;
var timeRemaining;
var timerInterval;
var score;
var questionNum;
var scoresArr;

function runGame() {
    startCardEl.addClass('hidden');
    gameLoseCardEl.addClass('hidden');
    gameWinCardEl.addClass('hidden');
    qCardEl.removeClass('hidden');
    console.log(qCardEl);
    timeRemaining = startingTime;
    timerInterval = setInterval(countDown, 1000);
    questionNum = 0;
    serveQuestion(questionNum);
}

function serveQuestion(qNum) {
    questionEl.text(questionSet[qNum].question);
    btnA1.text(questionSet[qNum].a1);
    btnA2.text(questionSet[qNum].a2);
    btnA3.text(questionSet[qNum].a3);
    btnA4.text(questionSet[qNum].a4);
}

function checkAnswer(event) {
    let selectedAnswer = event.target.dataset.answer;
    if (selectedAnswer !== questionSet[questionNum].answer) {
        timeRemaining -= 10;
    }
    questionNum++;
    if (questionNum < questionSet.length) {
        serveQuestion(questionNum);
    } else {
        winGame();
    }
}

function countDown() {
    timerEl.text("Time: " + timeRemaining + "s");
    timeRemaining--;
    if (timeRemaining < 0) {
        clearInterval(timerInterval);
        timerEl.text('Time: --');
        timeOut();
    }
}

function winGame() {
    clearInterval(timerInterval);
    qCardEl.addClass('hidden');
    gameWinCardEl.removeClass('hidden');
    resultEl.text('Your score: ' + timeRemaining);
}

function timeOut() {
    qCardEl.addClass('hidden');
    gameLoseCardEl.removeClass('hidden');
}

function loadScores() {
    let loadedScores = JSON.parse(localStorage.getItem('scoresList'));
    if (loadedScores !== null) {
        scoresArr = loadedScores;
    } else {
        scoresArr = [];
    }
    renderScores();
}

function storeScore() {
    let name = nameInputEl.val();
    let newScore =  {name: name, score: timeRemaining};
    scoresArr.push(newScore);
    localStorage.setItem('scoresList', JSON.stringify(scoresArr));
    renderScores();
}

function renderScores() {
    scoreListEl.children().remove();
    for (let i = 0; i < scoresArr.length; i++) {
        let entry = $('<li>');
        entry.text("Name: " + scoresArr[i].name + " , Score: " + scoresArr[i].score);
        scoreListEl.append(entry);
    }
}

loadScores();

btnStart.on("click", runGame);

$('.btn-answer').on("click", checkAnswer);

btnScoreSubmit.on('click', storeScore);