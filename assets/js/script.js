
//this function should cycle the questions when the button is pressed
//Problem -- function is not stopping and will blink rapidly
function nextQuestion() {
    
    //this variable selects all divs that are children to the id #questions
    var qTicker = document.querySelectorAll("#questions > div");
    //for statement is supposed to loop through the qTicker variable which is all children divs of parent #questions
    for (var i = 0; i < qTicker.length; i++) {
        //if the display is NOT none, then make the display of variable i (question in for loop) none
        if (qTicker[i].style.display != "none") {
            qTicker[i].style.display = "none";
            //if is value is the same as qTicker.length minus 1 then....
            if (i == qTicker.length - 1) {
                //...display qticker array location 0
                qTicker[0].style.display = "block";
            } else {
                //else display qticker loop + 1
                qTicker[i + 1].style.display = "block";
            }
            //the break is meant to BREAK the loop which allows for code to be executed after
            //the function should repeat and loop again when the button is clicked
            break;
        }
    }
}