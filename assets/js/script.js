var bt1 = document.getElementById("startQuiz");
var bt2 = document.getElementById("nextQuestion");
var timeLe = document.querySelector(".time");
var secLe = 60;

//i want to display 1 question at a time from my html class .quest when i press next question button
var question = document.querySelectorAll(".quest");
// i need to change my node list to an array
var test = Array.from(question)
//i want to display one question from variable at a time from the test array breakdown further


//add event listener to next random question


bt2.addEventListener("click", function nextQuestion(event){
    event.preventDefault();
  
    const random = Math.floor(Math.random() * test.length);
    console.log(random, test[random]);
    //now i want choices to not repeat
    var x = test[random].style.display = "block";

    
})

document.body.appendChild(bt1);

bt1.addEventListener("click", function changeButton(event) {
    event.preventDefault();
    event.stopPropagation();
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

