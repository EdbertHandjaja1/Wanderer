<!--Create global variables-->
let sum;
let score = 0;
let totalQuestions = 0;
let answer;
const answers = [];

<!--Check function to check user answer-->
function check(){
    <!--Assign user input to answer-->
    answer = document.getElementById("inputText2").value;

    <!--Selection to show user if their answer was correct-->
    if(answer == sum){
        document.getElementById("answer").innerHTML = "Boss has been defeated";
        let scoreCount = parseInt(localStorage.getItem("score"));
        scoreCount++;
        localStorage.setItem("score", scoreCount.toString());
        let x = document.getElementById("continueButton");
        x.removeAttribute("hidden");
        let y = document.getElementById("checkButton");
        y.setAttribute("hidden", "hidden");
    }else{
        document.getElementById("answer").innerHTML = "Try Again";
        document.getElementById('inputText2').value = ''
    }
}

<!--Next Question function to go to next question-->
function nextQuestion(){
    document.getElementById("startButton").disabled = true
    let x = document.getElementById("startButton");
    x.setAttribute("hidden", "hidden");
    let y = document.getElementById("checkButton");
    y.removeAttribute("hidden");

    totalQuestions++;
    <!--Increment global variable, totalQuestions-->

    <!--Reset input field-->
    document.getElementById("inputText2").value = "";

    <!--Assigning n1 and n2 random values for the question-->
    let n1 = Math.floor(Math.random() * 20 + 1);
    let n2 = Math.floor(Math.random() * 20 + 1);

    <!--Assigning result false to calculate user score-->
    let result = false;

    <!--Assigning the h3 in index to values n1 and n2-->
    document.getElementById("inputText").value = n1;
    document.getElementById("inputText1").value = n2;

    <!--Calculating sum-->
    sum = n1 + n2;

    <!--Selection to assign boolean to result to calculate score-->
    if (sum == answer) {
        result = true;
    } else {
        result = false;
    }

    <!--Add whether answer is correct to arraylist answer-->
    answer.push(result);
}

<!--Function Check Total for user to know their overall score-->
<!--EDBERT-->
function continueGame(){
    <!--Redirect to home page-->
    location.href = "../mainGame/homePage.html";
}

function restart(){
    location.href = "../mainGame/homePage.html";
}

function pictureAdder(){
    let bossNum = parseInt(localStorage.getItem("bossNum"));
    let picName = ""
    if(bossNum <= 3){
        picName = "seaBox(" + (bossNum) + ")";
    }else{
        picName = "landBox(" + (bossNum - 3) + ")";
    }

    let x = document.getElementById("picPlace");
    x.innerHTML = "<img style='width: 50px; height: 50px' id='character' src='../mainGame/images/" + picName + ".png' alt=\"\">"
}