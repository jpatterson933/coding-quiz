var bt1 = document.getElementById("startQuiz");
var bt2 = document.getElementById("nextQuestion");
var timeLe = document.querySelector(".time");
var secLe = 60;

//i want to display 1 question at a time from my html class .quest when i press next question button
var pullQuestion = document.querySelectorAll(".quest");
// i need to change my node list to an array
var question = Array.from(pullQuestion)
//i want to display one question from variable at a time from the test array breakdown further


var i = Math.floor(Math.random() * question.length);
//add event listener to next random question
//if you take prevent default off here, it will switch to start, and then press again and it will show another question
bt2.onclick = function test(event) {
    event.preventDefault();

}

bt1.onclick = function questionCycle(event) {
    event.preventDefault();
    question[i].style.display = "block";
}


//this is the next random question function and displays all questions on single page without cycling
// bt2.addEventListener("click", function questionCycle(event){
//     event.preventDefault();

//     const random = Math.floor(Math.random() * question.length);
//     console.log(random, question[random]);
//     //var x makes questions appear in block format
//     var x = question[random].style.display = "block";
// })




document.body.appendChild(bt1);

bt1.addEventListener("click", function buttonSwitch(event) {
    event.preventDefault();
    bt1.style.display = "none";
    bt2.style.display = "flex";

    //timer starts on click
    function setTime() {
        var timerInterval = setInterval(function() {
            secLe--;
            timeLe.textContent = secLe + " left!";
                if(secLe === 0) {
                    clearInterval(timerInterval);
                    sendMessage();
                }
        }, 1000);
    }
    setTime();

})

;

