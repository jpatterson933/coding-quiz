
//start button for quiz
const start = document.getElementById("start");
//this represents the quiz div in html allowing us to place styles and stuff within
const quiz = document.getElementById("quiz");
//this is where the questions will get displayed
const question= document.getElementById("question");
//each of these choices will get displayed here
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
//this is our timer counter
const counter = document.getElementById("counter");
//this is where our score will get displayed
const scoreDiv = document.getElementById("score");

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
//this is our timer variable set to count which is set to 0 //will adjust to take on a total amoutn of time later
let count = 0;
//this variable sets questiontime to 10 seconds on each question
const questionTime = 10;
//this is our score variable
let score = 0;

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
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
})
//this function will render the counter and the final if statement will go to the next question if the counter hits the max
//this is what we will use to control our time
function renderCounter() {
    if(count <= questionTime) {
        counter.innerHTML = count;
        count++
    } else {
        count = 0;
        if(runningQuestion < lasQuestion){
            runningQuestion++;
            renderQuestion();
    
        } else{
            //end of quiz
            clearInterval(TIMER);
            scoreRender();
        }
    }
}
//this function will check the answer and add to the score or decrease from the score
//it will also reset the timer to 0 and cycle to the next question
function checkAnswer(answer){
    if(answer == questions[runningQuestion].correct) {
        //answer is correct
        score++;
    } else {
        //here is where we would subtract questions from the score -- if you put score-- it will show a negative percentage
        //subtract from score
        score--;
    }
    count = 0;
    if(runningQuestion < lasQuestion){
        runningQuestion++;
        renderQuestion();
    } else{
        //end of quiz
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundcolor = "green";
}
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundcolor = "red";
}

//score render
function scoreRender() {
    scoreDiv.style.display = "block";

    //calculate the score - amount of questions answered by the user
    const scorePercent = Math.round(100 * score/questions.length);
    
    scoreDiv.innerHTML = "<p>" + scorePercent + "%" + "</p>";

}