
//start button for quiz
const start = document.getElementById("start");
//timer position in html
var timeEl = document.getElementById("quizTimer");
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

const finish = document.getElementById("finish");

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
//this variable sets questiontime to 10 seconds on each question
const questionTime = 10;
//this is our score variable
let score = 0;
// time left variable
var secondsLeft = 8;

// quiz timer function
function setQuizTime() {
    var timerInterval = setInterval (function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left!";
        //this stops timer is seconds hits zero or the question is the last question
        if(secondsLeft === 0 || runningQuestion == lasQuestion) {
            clearInterval(timerInterval);
            sendMessage();
            //this 
        }
    }, 1000);
}

//function that sends message quiz over when the timer runs out
function sendMessage() {
    timeEl.textContent = "QUIZ OVER";
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


//this function will check the answer and add to the score or decrease from the score
//it will also reset the timer to 0 and cycle to the next question
function checkAnswer(answer){
    // says if the answer that was inputed is the same as the child .correct from parent questions(array of running questions) then it will 
    //add 10 points to the score
    if(answer == questions[runningQuestion].correct) {
        //answer is correct
        //this adds 10 to the score total - adds 10 to the left element -- thats what += means
        score += 10;
        //adds time when a question is right
        secondsLeft = secondsLeft + 3;
        //if the answer is not the same as in type or value to the child .correct of parent Questions[running questions ARRAY]
        //then this will subtract from the score by 1
    } else {
        //here is where we would subtract questions from the score -- if you put score-- it will show a negative percentage
        //subtract from score
        score--;
        //takes time away when a question is wrong
        secondsLeft = secondsLeft - 1;
    }
    //running questions is an array and if that array index number is less than the last question
    //increase the running array by 1 (go to the next questions) and perform function RenderQuestion
    if(runningQuestion < lasQuestion){
        // increases runningQuestion array by 1
        runningQuestion++;
        renderQuestion();
        //if the runningquestion array is not less than the last question then clear the timer
        //and run the function scoreRender
    } else{
        //end of quiz
        clearInterval(setQuizTime);
        scoreRender();
    }
}


//score render
function scoreRender() {
    scoreDiv.style.display = "block";

    //calculate the score - amount of questions answered by the user
    const scoreDisplay = score;
    scoreDiv.innerHTML = "<p>" + scoreDisplay + "</p>";
}