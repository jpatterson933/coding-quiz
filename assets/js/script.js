var bt1 = document.createElement("button"); //this will be the button that shows up to start the test
var bt2 = document.querySelector("form > button");

//these are my variables for the timer
var timeLe = document.querySelector(".time");
var secLe = 60;

//this is my timer
function setTime() {
    var timerInterval = setInterval(function() {
        secLe--;
        timeLe.textContent = secLe + " is this working";

        if(secLe === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }
    }, 1000);
}
//this calls my function to start
setTime();


//this function should cycle the questions when the button is pressed
//Problem -- function is not stopping and will blink rapidly
//solution -- hold ctrl and then click on button and it works but opens a new window that is empty
bt2.onclick = function nextQuestion() {
    //this variable selects all divs that are children to the id #questions
    var qTicker = document.querySelectorAll("#questions > div");
    //for statement is supposed to loop through the qTicker variable which is all children divs of parent #questions
    for (var i = 0; i < qTicker.length; i++) {
        //if the display is NOT none, then make the display of variable i (question in for loop) none
        if (qTicker[i].style.display != "none") {
            qTicker[i].style.display = "none";
            //if is value is the same as qTicker.length minus 1 then....
            if (i == qTicker.length - 1) {
                //...display qticker array location 0 as a block
                qTicker[0].style.display = "block";
            } else {
                //else display qticker loop + 1 as a block
                qTicker[i + 1].style.display = "block";
            }
            //the break is meant to BREAK the loop which allows for code to be executed after
            //the function should repeat and loop again when the button is clicked
            break;
        }
    }
}
