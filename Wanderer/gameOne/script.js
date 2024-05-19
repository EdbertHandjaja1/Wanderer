// Create global variables
let correctAnswer;
let score = 0;
let totalQuestions = 0;
let answer;
const answers = [];
let operatorNum;

// Check function to check user answer
function check(){
    // Assign user input to answer
    answer = document.getElementById("inputText2").value;

    // Selection to show user if their answer was correct
    if(answer == correctAnswer){
        document.getElementById("answer").innerHTML = "Fight Won!";
        let scoreCount = parseInt(localStorage.getItem("score"));
        scoreCount++;
        localStorage.setItem("score", scoreCount.toString());
        let x = document.getElementById("continueButton");
        x.removeAttribute("hidden");
        let y = document.getElementById("checkButton");
        y.setAttribute("hidden", "hidden");
    }else{
        document.getElementById("answer").innerHTML = "Try Again";
        document.getElementById('inputText2').value = '';
    }
}

// Function to display operator and calculate correctAnswer
function displayOperator(n1, n2){
    if (operatorNum == 0){
        document.getElementById("operationPlaceHolder").textContent = '+';
        correctAnswer = n1 + n2;
    } else if (operatorNum == 1){
        document.getElementById("operationPlaceHolder").textContent = '-';
        correctAnswer = n1 - n2;
    } else if (operatorNum == 2){
        document.getElementById("operationPlaceHolder").textContent = '*';
        correctAnswer = n1 * n2;
    } else{
        document.getElementById("operationPlaceHolder").textContent = '%';
        correctAnswer = n1 % n2;
    } 
}

// Next Question function to go to next question
function showQuestion(){
    document.getElementById("startButton").disabled = true;
    let x = document.getElementById("startButton");
    x.setAttribute("hidden", "hidden");
    let y = document.getElementById("checkButton");
    y.removeAttribute("hidden");

    totalQuestions++;
    // Increment global variable, totalQuestions

    // Reset input field
    document.getElementById("inputText2").value = "";

    // Assigning n1 and n2 random values for the question
    let n1 = Math.floor(Math.random() * 50 + 1);
    let n2 = Math.floor(Math.random() * 50 + 1);
    operatorNum = Math.floor(Math.random() * 4);

    // Assigning result false to calculate user score
    let result = false;

    // Assigning the h3 in index to values n1 and n2
    document.getElementById("inputText").value = n1;
    document.getElementById("inputText1").value = n2;

    // Calculating correct answer
    displayOperator(n1, n2);

    // Selection to assign boolean to result to calculate score
    if (correctAnswer == answer) {
        result = true;
    } else {
        result = false;
    }

    // Add whether answer is correct to arraylist answer
    answer.push(result);
}

// Function Check Total for user to know their overall score
function continueGame(){
    // Redirect to home page
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
