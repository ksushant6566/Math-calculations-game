var playing  = false;
var score;
var timeremaining;
var product;
// if click on the start/reset button
document.getElementById("start").onclick = function(){
// if we are playing
    if(playing == true) {
// reload the page
        location.reload();
    }
// if we are not palying
    else{
        hide("gameOver");
        
        playing = true;
// set score to 0
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;
// show countdown box
        show("timeRemaining");
// change button to restart
        document.getElementById("start").innerHTML = "Reset Game";        
// start countdown
        timeremaining = 60;
        startCountDown();
// generate new Q&A
        generateQA();
    }   
}

for(var j=1;j<5;j++) {
    document.getElementById("choice-"+j).onclick = function(){
        if(playing) {
            if(this.innerHTML == product) {
                score++;
                document.getElementById("scoreValue").innerHTML = score;
                show("correct");
                hide("wrong");
                setTimeout(()=>{
                    hide("correct")
                } , 1000);
                generateQA();
            }
            else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                } , 1000);
            }
        }
    }

}
//  if we click on a answer box
    // if we are playing
        // correct?
            // yes
                // increase score 
                // show correct box for 1sec
                // generate new Q&A
            // no
                // show try again box for 1sec


//Custom functions used above :

function startCountDown() {
    action = setInterval(function(){
        timeremaining-=1;
        if(timeremaining == 0) {
            clearInterval(action);
            show("gameOver");
            document.getElementById("scoreEnd").innerHTML = score;
            hide("timeRemaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("start").innerHTML = "Start Game";
        }
        document.getElementById("timeRemainingValue").innerHTML = timeremaining;
    },1000)
}

function hide(ID){
    document.getElementById(ID).style.display = "none";
}
function show(ID){
    document.getElementById(ID).style.display = "block";
}

function generateQA () {
    var x = 1+Math.round(99*Math.random());
    var y = 1+Math.round(10*Math.random());
    product = x*y;
    document.getElementById("question").innerHTML = x + " x " + y;
    var correctPosition = 1 + Math.round(Math.random()*3);
    document.getElementById("choice-"+correctPosition).innerHTML = product;

    // fill other choices
    var answers = [product];
    for(var i=1 ; i<=4 ; i++) {
        if(i != correctPosition) {
            var wrongAns;
            do{
                wrongAns = (1+Math.round(99*Math.random()) )*(1+Math.round(10*Math.random()));
            }while(answers.indexOf(wrongAns) > -1);

            document.getElementById("choice-"+i).innerHTML = wrongAns;
            answers.push(wrongAns);
        }
    }
}