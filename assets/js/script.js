//bt1 grabs button from html
var bt1 = document.getElementById("startQuiz");
//bt2 grabs buttom another button from html
var bt2 = document.getElementById("nextQuestion");
//this is where the time will be placed in the html grabbing the .time class
var timeLe = document.querySelector(".time");
//this is the amoutn of time on the clock
var secLe = 60;

//variable pullQuestion pulls all divs with class quest and puts them into a node list
var pullQuestion = document.querySelectorAll(".quest");

// variable question creates an array form the pull question
var question = Array.from(pullQuestion)

//this variable i chooses a random question form my question array
var i = Math.floor(Math.random() * question.length);

//this places bt1 into the body of the html script
document.body.appendChild(bt1);

//this is the start button to begin the quiz and it launches the first question
bt1.onclick = function startQuiz(event) {
    event.preventDefault();

    // removes bt1 from screen and shows the next button
    bt1.style.display = "none";
    bt2.style.display = "block";

    //shows first question from question array
    question[0].style.display = "block";

    //timer starts on click
    function setTime() {
        var timerInterval = setInterval(function() {
            secLe--;
            timeLe.textContent = secLe + " seconds left!";
            if(secLe === 0) {
                    clearInterval(timerInterval);
                    sendMessage();
                }
            }, 1000);
        }
        setTime();
}

//will cycle through to next question BUT THATS IT
bt2.onclick = function question2(event) {
    event.preventDefault();
    question[1].style.display = "block";
    question[0].style.display = "none";
}

