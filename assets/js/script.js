const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question= document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const scoreDiv = document.getElementById("score");

//this is the array we will use to input our questions for the test
let questions = [
    {
        question: "?",
        choiceA: "Correct",
        choiceB: "W",
        choiceC: "Wrong",
        correct: "A"
    },
    {
        question: "??",
        choiceA: "Wrong",
        choiceB: "Right",
        choiceC: "Wrong",
        correct: "B"
    },
    {
        question: "???",
        choiceA: "Wrong",
        choiceB: "Wrong",
        choiceC: "Right",
        correct: "C"
    }
]

const lasQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const qaugeUnit = gaugeWidth / questionTime;
let score = 0;

function renderQuestion() {
    let q = questions[runningQuestion];
    
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