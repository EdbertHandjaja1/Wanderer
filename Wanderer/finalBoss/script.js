// Create global variables
let correctAnswer;
let score = 0;
let totalQuestions = 0;
let answer;
const answers = [];
let operatorNum;
let operator2Num;
let pass = false;

// Check function to check user answer
function check(){
    // Assign user input to answer
    answer = document.getElementById("inputText2").value;

    // Selection to show user if their answer was correct
    if(answer == correctAnswer){
        document.getElementById("answer").innerHTML = "You Win!";
        let scoreCount = parseInt(localStorage.getItem("score"));
        scoreCount++;
        localStorage.setItem("score", scoreCount.toString());
        let x = document.getElementById("continueButton");
        x.removeAttribute("hidden");
        let y = document.getElementById("checkButton");
        y.setAttribute("hidden", "hidden");
        pass = true;
    }else{
        document.getElementById("answer").innerHTML = "Wrong!";
        let scoreCount = parseInt(localStorage.getItem("score"));
        scoreCount-= 3;
        localStorage.setItem("score", scoreCount.toString());
        let x = document.getElementById("continueButton");
        x.removeAttribute("hidden");
        let y = document.getElementById("checkButton");
        y.setAttribute("hidden", "hidden");
    }
}

// Function to display operator and calculate correctAnswer
function displayOperator(n1, n2, n3){
    if (operatorNum == 0 && operator2Num == 0){
        document.getElementById("operationPlaceHolder").textContent = '+';
        document.getElementById("operationPlaceHolder2").textContent = '+';
        correctAnswer = n1 + n2 + n3;
    } else if (operatorNum == 0 && operator2Num == 1){
        document.getElementById("operationPlaceHolder").textContent = '+';
        document.getElementById("operationPlaceHolder2").textContent = '-';
        correctAnswer = n1 + n2 - n3;
    } else if (operatorNum == 0 && operator2Num == 2){
        document.getElementById("operationPlaceHolder").textContent = '+';
        document.getElementById("operationPlaceHolder2").textContent = '*';
        correctAnswer = n1 + (n2 * n3);
    }  else if (operatorNum == 1 && operator2Num == 0){
        document.getElementById("operationPlaceHolder").textContent = '-';
        document.getElementById("operationPlaceHolder2").textContent = '+';
        correctAnswer = n1 - n2 + n3;
    }  else if (operatorNum == 1 && operator2Num == 1){
        document.getElementById("operationPlaceHolder").textContent = '-';
        document.getElementById("operationPlaceHolder2").textContent = '-';
        correctAnswer = n1 - n2 - n3;
    }  else if (operatorNum == 1 && operator2Num == 2){
        document.getElementById("operationPlaceHolder").textContent = '-';
        document.getElementById("operationPlaceHolder2").textContent = '*';
        correctAnswer = n1 - (n2 * n3);
    }  else if (operatorNum == 2 && operator2Num == 0){
        document.getElementById("operationPlaceHolder").textContent = '*';
        document.getElementById("operationPlaceHolder2").textContent = '+';
        correctAnswer = (n1 * n2) + n3;
    }  else if (operatorNum == 2 && operator2Num == 1){
        document.getElementById("operationPlaceHolder").textContent = '*';
        document.getElementById("operationPlaceHolder2").textContent = '-';
        correctAnswer = (n1 * n2) - n3;
    }  else {
        document.getElementById("operationPlaceHolder").textContent = '*';
        document.getElementById("operationPlaceHolder2").textContent = '*';
        correctAnswer = (n1 * n2) * n3;
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
    let n3 = Math.floor(Math.random() * 50 + 1)
    operatorNum = Math.floor(Math.random() * 3);
    operator2Num = Math.floor(Math.random() * 3);

    // Assigning result false to calculate user score
    let result = false;

    // Assigning the h3 in index to values n1 and n2
    document.getElementById("inputText").value = n1;
    document.getElementById("inputText0").value = n2;
    document.getElementById("inputText1").value = n3;

    // Calculating correct answer
    displayOperator(n1, n2, n3);

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
    if (pass) {
        location.href = "../endGame/endPage.html";     
    } else {
        location.href = "../mainGame/homePage.html";
    }
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
}
