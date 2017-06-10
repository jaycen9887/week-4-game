var characters = [["SCORPION", 120, 8, "assets/images/Scorpion.png"], ["SHEEVA", 100, 5, "assets/images/Sheeva.png"], ["SONYA", 150, 20, "assets/images/Sonya.png"], ["SUB ZERO", 180, 25, "assets/images/SubZero.png"]];

var player = [];

var enemy = [];

var attack;
var playerId;
var playerNum;
var enemyId;
var enemyNum;
var myDiv;
var image;
var paragraph;


var playerHealth;
var playerAttack;
var playerUpAttack;
    
var enemyHealth;    
var enemyAttack;


var playerHP;
var enemyHP;
var playerHpBar;
var enemyHpBar;

var themeSong;
var fight;

/******************* FUNCTIONS **********************/

function restart() {
    location.reload();
}

function attacking() { 
    fight = new Audio("assets/sounds/fight.mp3");
    fight.play();
    calcHp();
    
    
   /* $("#playerStats").html(player[0][0] + " <br/>" + "Health: " + playerHealth + " <br/>" + "Attack: " + playerAttack);
    $("#enemyStats").html(enemy[0][0] + " <br/>" + "Health: " + enemyHealth + " <br/>" + "Attack: " + enemyAttack);  */ 
    
    checkProgress();
    
}

function calcHp(){
    $("#playerHP").css("width", playerHpBar);
    playerHP = 100/(playerHealth/enemyAttack);
    enemyHP = 100/(enemyHealth/playerAttack);
    playerHpBar = document.getElementById("playerHP").offsetWidth;
    enemyHpBar = document.getElementById("enemyHP").offsetWidth;;
    
    playerHpBar -= playerHP;
    enemyHpBar -= enemyHP;
    
    playerHealth -= enemyAttack;
    enemyHealth -= playerAttack;
    playerAttack += player[0][2];
    
    //hp width = playerhpbar
    $("#playerHP").css("width", playerHpBar + "px");
    $("#enemyHP").css("width", enemyHpBar + "px");
    
    if (playerHealth <= (player[0][1] / 2)){
        $("#playerHP").css("background-color", "#730000");
    }else if (enemyHealth <= (enemy[0][1] / 2)){
        $("#enemyHP").css("background-color", "#730000");
    }
    
    $("#playerHP").text(playerHealth);
    if(enemyHealth < 0) {
        enemyHealth = 0;
        $("#enemyHP").text("");
    }else {
        $("#enemyHP").text(enemyHealth);
    }
    
}

function checkProgress() {
    if (playerHealth <= 0 && enemyHealth > 0){
        console.log("Lose");
        loose();        
    }else if (enemyHealth <= 0 && playerHealth > 0){
        console.log("Next");
        nextEnemy();
    }else if (enemyHealth <= 0 && playerHealth <= 0){
        console.log("Draw");
        draw();
    }
    
}

function nextEnemy(){
    if (characters.length > 0){
        //remove enemy from playerselect div
        document.getElementById(enemyId).remove();
        document.getElementById(enemyId).remove();
        
        enemy = [];
        
        //remove stats from attackinfo
        $("#enemyStats").html("");
         
        $("#Attack").toggleClass("invisible");
        $("#fightContainer").toggleClass("invisible");
        $("#enemyContainer").toggleClass("invisible");
        
        if (characters.length === 2){
            $("#enemies").css({"width": "360px", "margin": "auto"});
        }else if (characters.length === 1){
           $("#enemies").css({"width": "230px", "margin": "auto"}); 
        }
    }
}

function loose(){
    //remove enemy from playerselect div
        document.getElementById(playerId).remove();
        document.getElementById(enemyId).remove();
        
        //remove stats from attackinfo
        $("#playerStats").html("");
        $("#enemyStats").html("");
    
        $("#playerContainer h3").html(enemy[0][0] + " has defeated you. <br/> Press 'Restart' to play again.");
        $("#buttons").css("top", "300px");
}

function draw() {
    document.getElementById(playerId).remove();
    document.getElementById(enemyId).remove();
        
        
        //remove stats from attackinfo
        $("#playerStats").html("");
        $("#enemyStats").html("");
    
        $("#playerContainer h3").html("DRAW: CLICK RESTART");
    
}

//Function takes these characters and displays their images on screen.
function displayCharacters(location , arr, className) {
    $(".characters").remove();
    $(".defenders").remove();
    
    for (var i = 0; i < characters.length; i++) {
        myDiv = $("<div>");
        image = $("<img>");
        /*paragraph = $("<p>");*/
        myDiv.attr("id", "character"+i);
        myDiv.addClass(className);

        image.attr("src", arr[i][3]);
        /*paragraph.text(arr[i][0]);*/

        myDiv.append(image);
        /*myDiv.append(paragraph);*/
        $(location).append(myDiv);
    }
}

function displayEnemy() {
    myDiv = $("<div>");
    image = $("<img>");
    myDiv.attr("id", enemyId);
    myDiv.addClass("fighter");
    
    image.attr("src", enemy[0][3]);
    
    myDiv.append(image);
    $("#fight").append(myDiv);
    
    $("#Attack").toggleClass("invisible");
    
    enemyHP();
    themeSong.volume = .2;
}

function displayPlayer() {
   myDiv = $("<div>");
    image = $("<img>");
    myDiv.attr("id", "playerOne");
    myDiv.addClass("fighter");
    
    image.attr("src", player[0][3]);
    
    myDiv.append(image);
    $("#fight").append(myDiv);
    playerHP();
    $("#playerHP").css("width", playerHpBar); 
}

/*
function displayFighers() {
    myDiv = $("<div>");
    image = $("<img>");
    myDiv.attr("id", "playerOne");
    myDiv.addClass("fighter");
    
    image.attr("src", player[0][3]);
    
    myDiv.append(image);
    $("#fight").append(myDiv);
    
    myDiv = $("<div>");
    image = $("<img>");
    myDiv.attr("id", enemyId);
    myDiv.addClass("fighter");
    
    image.attr("src", enemy[0][3]);
    
    myDiv.append(image);
    $("#fight").append(myDiv);
    
    $("#Attack").toggleClass("invisible");
    
    playerHP();
    enemyHP();
    
    $("#playerHP").css("width", playerHpBar);
    
    
}*/


function playerHP() {
    myDiv = $("<div>");
    paragraph = $("<p>");
    var hpDiv = $("<div>");
    myDiv.attr("id", "php");
    hpDiv.attr("id", "playerHP");
    paragraph.text(playerHealth);
    hpDiv.append(paragraph);
    myDiv.append(hpDiv);
    $("#stats").append(myDiv);
}

function enemyHP() {
    myDiv = $("<div>");
    paragraph = $("<p>");
    var hpDiv = $("<div>");
    myDiv.attr("id", "ehp");
    hpDiv.attr("id", "enemyHP");
    paragraph.text(enemyHealth);
    hpDiv.append(paragraph);
    myDiv.append(hpDiv);
    $("#stats").append(myDiv);
}


  


$(document).ready(function(){
    
    themeSong = new Audio("assets/sounds/Mortal_Kombat_Theme.mp3");
    themeSong.play();

    displayCharacters("#playerSelect", characters, "characters");
    
//Function for onclick selecting players character moving character to player div
    $(".characters").on("click", function(){
        playerId = ($(this).attr("id"));
        playerNum = parseInt(playerId[9]);
        player.push(characters[playerNum]);
        characters.splice(playerNum, 1);


        $("#playerContainer").toggleClass("invisible");
        $("#enemyContainer").toggleClass("invisible");
        displayCharacters("#enemies", characters, "defenders");
        
        displayPlayer();
   
    
        $(".defenders").on("click", function(){
            enemyId = ($(this).attr("id"));
            
            var mydude = document.getElementById(enemyId);
            var enemyImage = mydude.getElementsByTagName("img")[0];
            var images = enemyImage.src;
            var newImages = images.slice(28, images.length);
            var index = characters.indexOf(newImages);
            console.log(characters);
            
            console.log(index);
            
            console.log(newImages);
            
            
            enemyNum = parseInt(enemyId[9]);
            enemy.push(characters[enemyNum]);
            characters.splice(enemyNum, 1);

            $("#enemyContainer").toggleClass("invisible");
            $("#fightContainer").toggleClass("invisible");

            /*displayCharacters("#enemies", characters, "enemies");

            displayDefender();*/

            displayEnemy();

            playerHealth = player[0][1];
            playerAttack = player[0][2];
            playerUpAttack = player[0][2];

            enemyHealth = enemy[0][1];    
            enemyAttack = enemy[0][2];

            $("#playerHP").text(playerHealth);
            if(enemyHealth < 0) {
                enemyHealth = 0;
                $("#enemyHP").text("");
            }else {
                $("#enemyHP").text(enemyHealth);
            }

        });
    
    }); 
    
});