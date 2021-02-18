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
const finish = document.getElementById("finish");
const highScore = document.getElementById("highscore");

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
    }
]


//this takes our question length and subtracts one to take on the variable of the LAST QUESTION 
const lasQuestion = questions.length - 1;
//current question on screen variable set at 0 so when it increments in the renderQuestion function
let runningQuestion = 0;
//this is our score variable
let score = 0;
// time left variable
var secondsLeft = 4;

// quiz timer function
function setQuizTime() {
    var timerInterval = setInterval (function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left!";
        //this stops timer is seconds hits zero or the question is the last question
        if(secondsLeft === 0 ) {
            clearInterval(timerInterval);
            submitInitials();
        }
    }, 1000);
}



function renderQuestion() {
    //here we set the questions array to running question which is set at 0 above 
    let q = questions[runningQuestion];
    // this displays our qeustions and choices on the screen
    question.innerHTML = "<p>" + q.question +"</p>";
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



//this function will check answers as they cycle
function checkAnswer(answer){
    //this checks child. correct to see if it matches the answer
    if(answer == questions[runningQuestion].correct) {
        //adds to score
        score += 10;
        //adds time
        secondsLeft = secondsLeft + 3;
    } else {
        //subtracs from score
        score--;
        //subtracts time
        secondsLeft = secondsLeft - 1;
    }
    //if the index position of runningQuestion is less than lasQuestion, then cycle to the next question
    if(runningQuestion < lasQuestion){
        //cycles question
        runningQuestion++;
        renderQuestion();
        //else if you are on last question, end quiz
    } else{
        clearInterval(setQuizTime);
        submitInitials();
        timeEl.textContent = "QUIZ OVER";
    }
}


//this funcition will change the text of finish to Submit Score and no longer display the time
function submitInitials() {
        finish.innerHTML = "Submit Score";
        scoreRender();
        clearInterval(setQuizTime)
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
    scoreDiv.innerHTML = "<p>" + "Final Score: " + scoreDisplay + " shmeckles" + "</p>";
    
}


finish.addEventListener("click", function saveScore(){
    //stores MOST RECENT score and inital value on "submit score" --finish variable
    localStorage.setItem("highScore", JSON.stringify(score));
    localStorage.setItem("initials", initials.value)

    showHighScore();
    clearInterval(setQuizTime);

    //not running yet
    // finalPageDisplay();
});


//shows most recent saved highscore
function showHighScore() {

    //stores MOST RECENT score and initials
    var lastScore = JSON.parse(localStorage.getItem("highScore")) || [];
    var lastName = localStorage.getItem("initials");

    //displays High Score text
    highScore.style.display = "block";

    //puts each score into an object
    const score = {
        score: lastScore,
        name: lastName,
    };

    console.log(score)
    //pulls 
    document.getElementById("showInitials").textContent = lastName;
    document.getElementById("showHighScore").textContent = lastScore;
}


//not running this yet
// function finalPageDisplay () {
//         //removes previous elements so only highscore displays
//         initials.style.display = "none";
//         scoreDiv.style.display = "none";
//         finish.style.display = "none";

        


}

// finish.
// var bet = document.getElementById("initials").value;
// localStorage.setItem("Initials", bet);

// console.log(bet)

