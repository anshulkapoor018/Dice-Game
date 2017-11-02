var scores, roundScore, activePlayer, gamePlaying, lastDice;

function init(){
    score = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none'; 

    //getElementByID faster than queryselector
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
        
        //Random Number generation
        
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //Display the Result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png'
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png'
        
        
        
        //var diceDOM = document.querySelector('.dice');
        //diceDOM.style.display = 'block';
        //diceDOM.src = 'dice-' + dice + '.png';

        //Update Global score if random number is not 1
        if(dice1 !== 1 && dice2 !== 1){
            //Add Score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
            //Next Player
            nextPlayer();
        }
        /*if(dice === 6 && lastDice ===6){
            //Player losed global score
            score[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];    
            nextPlayer();
        }else if(dice !== 1){
            //Add Score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
            //Next Player
            nextPlayer();
        }
        lastDice = dice;
        */
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    //Add current score to Global
    if(gamePlaying){
        score[activePlayer] += roundScore;
    
        //Update UI
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];    

        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        if(input){
            winningScore = input;
        } else{
            winningScore = 100;
        }
        
        //Checking if the player won the Game
        if(score[activePlayer] >= winningScore){
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
            gamePlaying = false;
        }else{
             //NextPlayer
            nextPlayer();
        }    
    }
});

function nextPlayer(){
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);