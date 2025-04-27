// const question = document.getElementById("question");
// const choices = Array.from(document.getElementsByClassName("choice-text"));
// // const questionCounterText = document.getElementById("questionCounter");
// const progressText = document.getElementById("progressText");
// const scoreText = document.getElementById("score");
// const progressBarFull = document.getElementById("progressBarFull");

// let currentQuestion = {};
// let acceptingAnswers =  true;
// let score = 0;
// let questionCounter = 0;
// let availableQuestions = [];

// let questions = [
//     // {
//     //     question: "8 + 7 = ?",
//     //     choice1: "12",
//     //     choice2: "15",
//     //     choice3: "16",
//     //     choice4: "14",
//     //     answer: 2
//     // },
//     // {
//     //     question: "7 + 13 = ?",
//     //     choice1: "22",
//     //     choice2: "19",
//     //     choice3: "20",
//     //     choice4: "21",
//     //     answer: 3
//     // },
//     // {
//     //     question: "4 + 6 = ?",
//     //     choice1: "10",
//     //     choice2: "9",
//     //     choice3: "12",
//     //     choice4: "8",
//     //     answer: 1
//     // },
//     // {
//     //     question: "3 + 6 = ?",
//     //     choice1: "10",
//     //     choice2: "9",
//     //     choice3: "7",
//     //     choice4: "8",
//     //     answer: 2
//     // },
// ];
// fetch("add.json")
//     .then( res=>{
//         return res.json();
//     }).then(loadedQuestions =>{
//         questions = loadedQuestions;
//         startGame();
//     })

// // constants
// const CORRECT_BONUS = 1;
// const MAX_Q = 10;

// startGame = () => {
//     questionCounter = 0;
//     score = 0;
//     availableQuestions = [...questions];
//     console.log(availableQuestions);
//     getNewQuestion();

// };

// getNewQuestion = () => {
//     if (availableQuestions.length ==0 ||questionCounter >= MAX_Q){
//         localStorage.setItem('mostRecentScore', score);
//         //go to end page
//         return window.location.assign("score.html");
//     }
//     questionCounter++;
//     progressText.innerText = `Question ${questionCounter}/${MAX_Q}`;
// // update the progress bar
//     progressBarFull.style.width = `${(questionCounter/MAX_Q)*100}%`;
//     const questionIndex = Math.floor(Math.random() * availableQuestions.length);
//     currentQuestion = availableQuestions[questionIndex];
//     question.innerText = currentQuestion.question;

//     choices.forEach( choice=> {
//         const number = choice.dataset['number'];
//         choice.innerText = currentQuestion['choice' + number];
//     });

//     availableQuestions.splice(questionIndex, 1);

//     acceptingAnswers = true;
// }

// choices.forEach(choice => {
//     choice.addEventListener('click', e => {
//         if (!acceptingAnswers) return;
//         acceptingAnswers = false;
//         const selectedChoice = e.target;
//         const selectedAnswer = selectedChoice.dataset["number"];

       
//         const classToApply = selectedAnswer == currentQuestion.answer? "correct" : "incorrect";
//         console.log(classToApply);

//         if (classToApply == 'correct'){
//             incrementScore(CORRECT_BONUS);
//         }

//         selectedChoice.parentElement.classList.add(classToApply);
        
//         setTimeout(() => {
//             selectedChoice.parentElement.classList.remove(classToApply);
//             getNewQuestion();
//         }, 1000);
//     });
// })

// incrementScore = num => {
//     score += num;
//     scoreText.innerText = score;
// }

// // startGame();

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const CORRECT_BONUS = 1;
const MAX_Q = 10;

function generateQuestions(numQuestions = MAX_Q) {
    const generated = [];

    for (let i = 0; i < numQuestions; i++) {
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 20) + 1;
        const correctAnswer = a + b;

        const answers = new Set();
        answers.add(correctAnswer);

        while (answers.size < 4) {
            const wrong = correctAnswer + Math.floor(Math.random() * 10) - 5;
            if (wrong !== correctAnswer && wrong > 0) {
                answers.add(wrong);
            }
        }

        const shuffledAnswers = Array.from(answers).sort(() => Math.random() - 0.5);
        const answerIndex = shuffledAnswers.indexOf(correctAnswer) + 1;

        generated.push({
            question: `${a} + ${b} = ?`,
            choice1: shuffledAnswers[0],
            choice2: shuffledAnswers[1],
            choice3: shuffledAnswers[2],
            choice4: shuffledAnswers[3],
            answer: answerIndex
        });
    }

    return generated;
}

startGame = () => {
    questionCounter = 0;
    score = 0;
    questions = generateQuestions();
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_Q) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("score.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_Q}`;
    progressBarFull.style.width = `${(questionCounter / MAX_Q) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
