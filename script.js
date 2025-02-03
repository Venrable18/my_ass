const quizContainer = document.querySelector('.quiz-container');
const configContainer = document.querySelector('.config-container');
const answerOptions = document.querySelector(".answer-options");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const questionStatus = document.querySelector(".question-status");
const timeCounter = document.querySelector(".time-duration");
const resultContainer = document.querySelector(".result-container");

const quizCategory = 'Programming';
var currentQuestion = null;
let numberOfQuestions = 25;
var correctAnswerCount = 0;
const QUIZ_TIME_LIMIT = 5;
let currentTime = QUIZ_TIME_LIMIT;
var timer = null;
const questionIndexHistory = [];

const startTime = () => {
    timer = setInterval(() => {
        currentTime--;

        timeCounter.textContent = `${currentTime}`;
        if(currentTime <= 0) {
            clearInterval(timer)
        }
    }, 1000);

}

const showQuizResult = () => {
quizContainer.style.display = 'none';
resultContainer.style.display = 'block'

const resultText = `You have completed </b>${correctAnswerCount}</b> out of <b>${numberOfQuestions}</b>`
document.querySelector(".result-message").innerHTML = correctAnswerCount;
}

const resetTimer = () => {
    clearInterval(timer);
    currentTime = QUIZ_TIME_LIMIT;
    timeCounter.textContent = `${currentTime}`;
};

const getRandomQuestion = () => {
    const categoryQuestions = questions.find(cat => cat.category === quizCategory.toLowerCase()).questions || [];


    if(questionIndexHistory.length >= Math.min(categoryQuestions.length, numberOfQuestions)) {
       return  showQuizResult()
    }
    const availableQuestions = categoryQuestions.filter((_, index) => !questionIndexHistory.includes(index));
    const randomQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
    questionIndexHistory.push(categoryQuestions.indexOf(randomQuestion));
    return randomQuestion;
}


const handleAnswer = (option, answerIndex) => {

const isCorrect = currentQuestion.correctAnswer === answerIndex;

if(isCorrect) {
correctAnswerCount++;
}
// if (!isCorrect) {
//     alert('wrong answer')
// }  else alert('Correct answer');
//option.classList.add(isCorrect ? "correct" : "incorrect");

answerOptions.querySelectorAll(".answer-option").forEach(option => option.style.pointerEvents = "none");
nextQuestionBtn.style.visibility = "visible";
}
const renderQuestion = () => {
     currentQuestion = getRandomQuestion();
    console.log(currentQuestion);

    resetTimer();
    startTime();
    if(!currentQuestion) return;
    
    answerOptions.innerHTML = "";
    nextQuestionBtn.style.visibility = "hidden";
document.querySelector('.quiz-question').textContent = currentQuestion.question;
questionStatus.innerHTML = `<b>${questionIndexHistory.length}</b> of <b>${numberOfQuestions}</b> answered`

currentQuestion.options.forEach((option, index) => { 
const li = document.createElement("li");
li.classList.add('answer-option');
li.textContent = option;
answerOptions.appendChild(li);
li.addEventListener("click", () => handleAnswer(li, index))
});

};

const startQuiz = () => {
    configContainer.style.display = "none";
    quizContainer.style.display = "block";

renderQuestion();

}



const resetQuiz = () => {
    resetTimer();
    correctAnswerCount = 0;
    questionIndexHistory.length = 0;
    configContainer.style.display = "block";
    resultContainer.style.display = "none";
}

nextQuestionBtn.addEventListener("click", renderQuestion);
document.querySelector(".try-again-btn").addEventListener("click", resetQuiz);
document.querySelector(".start-quiz-btn").addEventListener("click", startQuiz);
