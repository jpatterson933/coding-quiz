//start button for quiz
const start = document.getElementById("start");
//timer position in html
var timeEl = document.getElementById("quizTimer");
//this represents the quiz div in html allowing us to place styles and stuff within
const quiz = document.getElementById("quiz");
//this is where the questions will get displayed
const question = document.getElementById("question");
//each of these choices will get displayed here
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
//this is our timer counter
const counter = document.getElementById("counter");
//this is where our score will get displayed
const scoreDiv = document.getElementById("score");
const initials = document.getElementById("initials");
const submitInitials1 = document.getElementById("submitInitials");
const finish = document.getElementById("finish");
const highScore = document.getElementById("highscore");
const pageRefresh = document.getElementById("pageRefresh");

//this is the array we will use to input our questions for the test
let questions = [
    {
        question: "Will this test help you learn Javascript?",
        choiceA: "Yes",
        choiceB: "No",
        choiceC: "Maybe",
        correct: "A"
    },
    {
        question: "What does console.log() do?",
        choiceA: "It tells us where to find buried treasure.",
        choiceB: "It writes a message to log on the debugging console.",
        choiceC: "It writes a message to our hero.",
        correct: "B"
    },
    {
        question: "What is a function?",
        choiceA: "A block of code that designs mini forest models.",
        choiceB: "A block of cheese that you can eat.",
        choiceC: "A block of code designed to perform a particular task.",
        correct: "C"
    },
    {
        question: "Where should you link your javascript external file?",
        choiceA: "In the CSS file.",
        choiceB: "You don't link it.",
        choiceC: "Link it at the bottom of the HTML file.",
        correct: "C"
    },
    {
        question: "What is a string?",
        choiceA: "A series of characters and is surrounded by quotes.",
        choiceB: "It is what you use to Yo Yo.",
        choiceB: "The thread on the end of my shirt.",
        correct: "A"
    },
    {
        question: "Where is a variable declared to be considered global in Javascript?",
        choiceA: "It is declared all across the world.",
        choiceB: "It is declared inside of a function.",
        choiceC: "It is declared on its own outside of all functions.",
        correct: "C"
    },
    {
        question: "If something returns a True or False, what is it called?",
        choiceA: "Boogie",
        choiceB: "Boolean",
        choiceC: "Croolean",
        correct: "B"
    },
    {
        question: "What is an object?",
        choiceA: "A collection of properties",
        choiceB: "A collection of strings",
        choiceC: "A collection of functions",
        correct: "A"
    },
    {
        question: "What will console.log('cheif') say in the console?",
        choiceA: "chief",
        choiceB: "Cheef",
        choiceC: "cheif",
        correct: "C"
    },
    {
        question: "What is null?",
        choiceA: "Nothing",
        choiceB: "An error",
        choiceC: "An Object",
        correct: "C"
    }
]

//this takes our question length and subtracts one to take on the variable of the LAST QUESTION 
const lasQuestion = questions.length - 1;
//current question on screen variable set at 0 so when it increments in the renderQuestion function
let runningQuestion = 0;
//this is our score variable
let score = 0;
// time left variable
var secondsLeft = 180;
//set timer interval to global so it can be called by other functions
var timerInterval;

// quiz timer
function setQuizTime() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left!";
        //stops timer, runs clear interval function and submits initials
        if (secondsLeft === 0 || secondsLeft < 0) {
            clearInterval(timerInterval);
            submitInitials();
        }
    }, 1000);
}


//cycles through questions until last question
function renderQuestion() {
    //here we set the questions array to running question which is set at 0 above 
    let q = questions[runningQuestion];
    // this displays our qeustions and choices on the screen
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

//when you click on start the quiz begins
start.addEventListener("click", function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    //runs my timer function
    setQuizTime();
})

//checks answers as they cycle
function checkAnswer(answer) {
    //this checks child. correct to see if it matches the answer
    if (answer == questions[runningQuestion].correct) {
        //adds to score
        score += 25;
        //adds time
        secondsLeft = secondsLeft + 5;
    } else {
        //subtracts from score
        score--;
        //subtracts time
        secondsLeft = secondsLeft - 10;
    }
    //if the index position of runningQuestion is less than lastQuestion, then cycle to the next question
    if (runningQuestion < lasQuestion) {
        //cycles question
        runningQuestion++;
        renderQuestion();
        //else if you are on last question, end quiz
    } else {
        clearInterval(timerInterval);
        submitInitials();
        timeEl.textContent = "QUIZ OVER";
    }
}

//this funcition will change the text of finish to Submit Score and no longer display the time
function submitInitials() {
    submitInitials1.style.display = "flex";
    submitInitials1.innerHTML = "Submit Initials";
    scoreRender();
    clearInterval(timerInterval)
    timeEl.style.display = "none";
}

//displays score
function scoreRender() {
    //hides questions and answers
    question.style.display = "none";
    choiceA.style.display = "none";
    choiceB.style.display = "none";
    choiceC.style.display = "none";
    //displays score and initial input
    scoreDiv.style.display = "block";
    initials.style.display = "block";
    const scoreDisplay = score;
    //displays score
    scoreDiv.innerHTML = "<p>" + "Final Score: " + scoreDisplay + " useless points" + "</p>";
    scoreDiv.style.display = "flex"
    scoreDiv.style.justifyContent = "center";

}

//saves MOST RECENT highscore (couldnt figure out how to store multiple logs with input)
submitInitials1.addEventListener("click", function saveScore() {
    localStorage.setItem("highScore", JSON.stringify(score));
    localStorage.setItem("initials", initials.value)
    submitInitials1.style.display = "none";
    showHighScore();
    finalPageDisplay();
    clearInterval(timerInterval);
});

//displays MOST RECENT high score 
function showHighScore() {
    //adds most recent last score and last name
    storeHighScore();
    highScore.style.display = "flex";

}

//stores score into local storage to be pulled once initals are entered
function storeHighScore() {
    var lastScore = JSON.parse(localStorage.getItem("highScore")) || [];
    var lastName = localStorage.getItem("initials");
    //puts each score into an object
    const score = {
        score: lastScore,
        name: lastName,
    };
    document.getElementById("showInitials").textContent = lastName;
    document.getElementById("showHighScore").textContent = lastScore + " useless points";
}

//function to display final
function finalPageDisplay() {
    //removes previous elements so only highscore displays
    initials.style.display = "none";
    scoreDiv.style.display = "none";
    finish.style.display = "none";
    pageRefresh.style.display = "flex";

}

//restarts quiz
pageRefresh.addEventListener("click", function refreshPage() {
    window.location.reload();
});