/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

function Player(playerNumber){
    this.globalScore = 0;
    this.roundScore = 0;
    this.playerNumber = playerNumber;

    this.rollDice = function(){
        //Generate a random integer between 0(inclusive) and 6(exclusive)
        var result = Math.floor(Math.random() * 6) + 1;

        //display the corresponding dice
        document.getElementsByClassName("dice")[0].setAttribute("src", "dice-"+ result +".png"); 

        this.updateDisplay();

        return result;
    }

    this.updateScore = function (roundResult){
        if(roundResult === 1){
            this.roundScore = 0;
        } else {
            this.roundScore += roundResult;
        }
        this.updateDisplay();
        return this.roundScore;
    }

    this.hold = function (){
        this.globalScore += this.roundScore;
        this.roundScore = 0;
        this.updateDisplay();

        if (this.globalScore >= 100) {
            alert("Player " + this.playerNumber + " wins!!");
        }
    }

    this.updateDisplay = function(){
        document.getElementById("score-"+(this.playerNumber - 1)).innerHTML = this.globalScore;
        document.getElementById("current-"+(this.playerNumber - 1)).innerHTML = this.roundScore;
    }

    this.reset = function(){
        this.globalScore = 0;
        this.roundScore = 0;
        this.updateDisplay();
    }
}

var player1 = new Player(1);
var player2 = new Player(2);


function playRound(){
    var currentPlayerNumber = getCurrentPlayer();
    if (currentPlayerNumber === 1) {
        var result = player1.rollDice();
        if(player1.updateScore(result) === 0){
            switchPlayer(currentPlayerNumber);
        }
    } else {
        var result = player2.rollDice();
        if(player2.updateScore(result) === 0){
            switchPlayer(currentPlayerNumber);
        }
    }

}

function hold(){
    var currentPlayerNumber = getCurrentPlayer();
    if (currentPlayerNumber === 1){
        player1.hold();
        switchPlayer(currentPlayerNumber);
    } else {
        player2.hold();
        switchPlayer(currentPlayerNumber);
    }

}

function getCurrentPlayer(){
    var element = document.getElementsByClassName("active")[0];
    var playerNumber = parseInt(element.classList[0][7]);

    return playerNumber + 1;
}

function switchPlayer(currentPlayerNumber){
    currentPlayerNumber--;

    var element = document.getElementsByClassName("active")[0];
    element.classList.remove("active");

    if(currentPlayerNumber === 0){
        document.getElementsByClassName("player-1-panel")[0].classList.add("active");
    } else {
        document.getElementsByClassName("player-0-panel")[0].classList.add("active");
    }
}

function reset(){
    player1.reset();
    player2.reset();

    var element = document.getElementsByClassName("active")[0];
    element.classList.remove("active");
    document.getElementsByClassName("player-0-panel")[0].classList.add("active");
}



