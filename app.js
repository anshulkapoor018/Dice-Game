var scores, roundScore, activePlayer, dice;

score = [0,0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none'; 


//Faster than queryselector
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function(){
    
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
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    //Add current score to Global
    score[activePlayer] += roundScore;
    
    //Update UI
    document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];    
    
    //Check if the player won the Game
    if(score[activePlayer] >= 15){
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
        
    }else{
         //NextPlayer
        nextPlayer();
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












