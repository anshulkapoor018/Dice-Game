var scores, roundScore, activePlayer, gamePlaying;

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
        
        var dice = Math.floor(Math.random() * 6) + 1;

        //Display the Result
        
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //Update Global score if random number is not 1
        
        if(dice !== 1){
            //Add Score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
            //Next Player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    //Add current score to Global
    if(gamePlaying){
        score[activePlayer] += roundScore;
    
        //Update UI
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];    

        //Checking if the player won the Game
        if(score[activePlayer] >= 20){
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
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
        
        document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);