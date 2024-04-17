<!--Initializing global variables-->
let character = "";
let treasureLocations = [];
let bigScore = parseInt(localStorage.getItem("score"));

<!--Function to start game depending on user's chosen character-->
function startGame(characterNum){
    if(bigScore === 0){
        localStorage.setItem("characterPicker", characterNum);
    }
    if(bigScore === 0){
        alert("Use arrow keys to navigate");
    }
    <!--Creative format of the page-->
    let x = document.getElementById("characterPick");
    x.style.backgroundImage = "url(\'images/pixelBackground.png\')";
    x.style.backgroundSize = "cover"
    x.style.width = '1425px';
    x.style.height = '805px';
    x.style.display = 'flex';
    x.innerHTML = chooseCharacter();
    x.style.position = "relative"
    x.style.justifyContent = "center";
    x.style.alignItems = "center";
    itemAdder("sea");
    itemAdder("land");
    buttonAdder();
}

<!--Function to choose character. Game will run with chosen character-->
function chooseCharacter(){
    let num = parseInt(localStorage.getItem("characterPicker"));
    if(num === 1){
        character = "1";
        return "<img style='width: 32px; height: 32px' id='character' src='images/character1.png' alt=\"\">";
    }else if(num == 2){
        character = "2";
        return "<img style='width: 32px; height: 32px' id='character' width='32' src='images/character2.png' alt=\"\">";
    }else{
        character = "3";
        return "<img style='width: 32px; height: 32px' id='character' width='32' src='images/character3.png' alt=\"\">";
    }
}

<!--Assign initial offsets of the character to position it in the middle-->
let left_offset = 0;
let top_offset = 0;

<!--On key down function to let user interact with the character using arrow keys-->
document.onkeydown = function (event) {
    boatOrNot();
    treasureOrNot();
    let img = document.getElementById("character");
    switch (event.keyCode) {
        case 37:
            <!--Move left-->
            if(getOffset(img).left >= 9.5){
                left_offset -= 5;
                break;
            }else{
                break;
            }
        case 38:
            <!--Move up-->
            if(getOffset(img).top >= 14.5){
                top_offset -= 5;
                break;
            }else{
                break;
            }
        case 39:
            <!--Move right-->
            if(getOffset(img).left <= 1399.5){
                left_offset += 5;
                break;
            }else{
                break;
            }
        case 40:
            <!--Move up-->
            if(getOffset(img).top <= 774.5){
                top_offset += 5;
                break;
            }else{
                break;
            }
    }
    img.style.left = `${left_offset}px`;
    img.style.top = `${top_offset}px`;
}

<!--Function to disable scroll in the game page-->
function disableScroll() {
    let x = window.scrollX;
    let y = window.scrollY;
    window.onscroll = function(){
        window.scrollTo(x, y);
    }
}

<!--Function to determine whether user's character will use a boat or not and change the character image-->
function boatOrNot(){
    let img = document.getElementById("character");
    if(getOffset(img).left <= 280){
        if(character == "1"){
            document.getElementById("character").src = 'images/character1(b).png';
        }else if(character == "2"){
            document.getElementById("character").src = 'images/character2(b).png';
        }else{
            document.getElementById("character").src = 'images/character3(b).png';
        }
    }else if(getOffset(img).left > 280){
        if(character == 1){
            document.getElementById("character").src = 'images/character1.png';
        }else if(character == 2){
            document.getElementById("character").src = 'images/character2.png';
        }else{
            document.getElementById("character").src = 'images/character3.png';
        }
    }
}

//https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    }
}

<!--Function to generate random locations to place treasures within the boundaries of the map-->
function randomLocation(location){
    let xValue = 0;
    let yValue = 0;

    if(location == "sea"){
        xValue = Math.floor(Math.random() * (280 - 9.5 + 1)) + 9.5;
        yValue = Math.floor(Math.random() * (774.5 - 14.5 + 1)) + 14.5;
    }else if(location == "land"){
        xValue = Math.floor(Math.random() * (1399 - 280 + 1)) + 280;
        yValue = Math.floor(Math.random() * (774.5 - 14.5 + 1)) + 14.5;
    }
    return [xValue, yValue];
}

<!--Function to add treasures in the page as soon as it loads-->
function itemAdder(place){
    let x = document.getElementById("characterPick");
    let randomLoc = {};
    let image;
    let id;
    let left = 0;
    let right = 0;
    let landBox = "";
    let seaBox = "";
    <!--Adding a restart button for users should they want to restart the game-->

    <!--Call to random location function to generate locations for the treasures and place the images. Each image is assigned a different id. Each treasure location is saved an array of treasureLocations
    -->
    if(place == "sea"){
        for (let i = 1; i <=3; i++){
            randomLoc = randomLocation("sea");
            seaBox = "images/seaBox(" + (i) + ").png";
            x.innerHTML += "<img style='width: 40px; height: 40px' id='treasure" + i + "' src=" + seaBox + " alt=\"\">"
            id = "treasure" + i;
            image = document.getElementById(id);
            image.style.position = "absolute";
            left = randomLoc[0];
            right = randomLoc[1];
            image.style.left = `${left}px`;
            image.style.top = `${right}px`;
            treasureLocations[(i-1)] = [(getOffset(image).top), (getOffset(image).left)];
        }
    }
    if(place == "land"){
        for (let i = 4; i <= 6; i++){
            randomLoc = randomLocation("land");
            landBox = "images/landBox(" + (i-3) + ").png";
            x.innerHTML += "<img style='width: 40px; height: 40px' id='treasure" + i + "' src=" + landBox + " alt=\"\">"
            id = "treasure" + i;
            image = document.getElementById(id);
            image.style.position = "absolute";
            left = randomLoc[0];
            right = randomLoc[1];
            image.style.left = `${left}px`;
            image.style.top = `${right}px`;
            treasureLocations[(i-1)] = [(getOffset(image).top), (getOffset(image).left)];
        }
    }

}

<!--Function to determine whether user is touching a treasure-->
function treasureOrNot(){
    let img = document.getElementById("character");
    for (let i = 1; i <= 6; i++) {
        if(((getOffset(img).top >= treasureLocations[i-1][0] - 30)
                && (getOffset(img).top <= treasureLocations[i-1][0] + 30))
                && ((getOffset(img).left >= treasureLocations[i-1][1] - 30)
                && (getOffset(img).left <= treasureLocations[i-1][1] + 30))){
            changePage(i-1);
            let x = (i)
            localStorage.setItem("bossNum", x.toString());
        }
    }
}

<!--Function to redirect user to the game when they touch a treasure-->
function changePage(num){
    for (let i = 0; i <= 5; i++){
        if(num == i){
            location.href = "../gameOne/index.html";
        }
    }
}

<!--Function that runs after the game has been played (skips the starting page of the game)-->
function startedOrNot(){
    let score = parseInt(localStorage.getItem("score"));
    if(bigScore > 0){
        startGame();
        let place = document.getElementById("restartButton");
        place.innerHTML = "<button onclick='restartFull()'>Restart</button>" + "     Score:   " + score;
    }
}

<!--Function to restart the page when user clicks the "Restart" button-->
function restartFull(){
    let num = 0;
    localStorage.setItem("score", num.toString());
    localStorage.setItem("characterPicker", "0");
    location.href = "../mainGame/homePage.html";
}

<!--Function to add restart Button and Score count-->
function buttonAdder(){
    let x = document.getElementById("characterPick");
    x.innerHTML += "<div id='restartButton'><button onclick='restartFull()'>Restart</button>" + "     Score:   " + parseInt(localStorage.getItem("score")) + "</div>"
    let button = document.getElementById("restartButton");
    button.style.position = "absolute";
    button.style.left = '10px';
    button.style.top = '10px';
}