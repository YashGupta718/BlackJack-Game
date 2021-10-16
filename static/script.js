let blackjackGame = {
    'you': {'scoreSpan': '#your-score' , 'score': 0 , 'div': '#your-box', 'isBurst': false,},
    'dealer': {'scoreSpan': '#dealer-score' , 'score': 0 , 'div': '#dealer-box', 'isBurst': false,},
    'cards': ['2','3','4','5','6','7','8','9','10','A','J','K','Q'],    
    'cardMap': {'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'10': 10,'A': [1,11],'J': 10,'K': 10,'Q': 10},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false, 
    'turnOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

document.querySelector('#hit-btn').addEventListener('click',blackjackHit);
document.querySelector('#stand-btn').addEventListener('click',blackjackStand);
document.querySelector('#deal-btn').addEventListener('click',blackjackDeal);

const hitSound = new Audio('static/blackjack_assets/sounds/swish.m4a');
const winSound = new Audio('static/blackjack_assets/sounds/cash.mp3');
const lossSound = new Audio('static/blackjack_assets/sounds/aww.mp3');

//HIT BUTTON
function blackjackHit(){
    if(YOU['score'] < 21 && blackjackGame['isStand'] === false && YOU['isBurst'] === false){
    let card = randomCard();
    console.log(card);
    showCard(card,YOU);
    updateScore(card,YOU);
    showScore(YOU);
    }
}

function randomCard(){
    let ran = Math.floor(Math.random()*13);
    return blackjackGame['cards'][ran];
}

function showCard(card, activePlayer){
    let cardImage = document.createElement('img');
    cardImage.src = `static/blackjack_assets/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

function updateScore(card, activePlayer){
    let tempScore;
    
    if(card === 'A'){
        if(activePlayer['score']<11)
            tempScore = 11;
        else
            tempScore = 1;    
    }
    else{
        tempScore = blackjackGame['cardMap'][card];
        
    }
    activePlayer['score'] += tempScore;
    if(activePlayer['score'] > 21)
        activePlayer['isBurst'] = true;
    console.log(activePlayer['score']);
}

function showScore(activePlayer){
    let tempScore;
    if(activePlayer['isBurst'] === false)
        tempScore = activePlayer['score'];
    else 
        tempScore = 'Burst';
    document.querySelector(activePlayer['scoreSpan']).textContent = tempScore;

}

//Stand BUTTON 

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand(){
    console.log(DEALER['score']);
    while(DEALER['score'] < 16 && DEALER['isBurst'] === false){
        blackjackGame['isStand'] = true;
        let card = randomCard();
        console.log(card);
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    blackjackGame['turnOver'] = true;
    let winner = computeWinner();
    showResults(winner);
}

//DEAL BUTTON

function blackjackDeal(){
    if(blackjackGame['turnOver'] === true){
        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector(YOU['div']).querySelectorAll('img');
        let dealerImage = document.querySelector(DEALER['div']).querySelectorAll('img');
        document.querySelector('#blackjack-result').textContent = "Let's play"; 

        YOU['isBurst'] = false;
        DEALER['isBurst'] = false;
        YOU['score'] = 0;  
        DEALER['score'] = 0;  
        document.querySelector('#your-score').textContent = 0;
        document.querySelector(DEALER['scoreSpan']).textContent = DEALER['score'];
        
        
        for(i=0; i<yourImages.length; i++)
            yourImages[i].remove();
        for(i=0; i<dealerImage.length; i++)
            dealerImage[i].remove();
            
        //document.querySelector(YOU['span']).textContent = 0;    
        showScore(YOU);
        showScore(DEALER);
    }
    blackjackGame['turnOver'] = false;
}

// COMPUTE WINNER

function computeWinner(){
    let winner;
    if(YOU['score'] > DEALER['score'] || DEALER['isBurst'] === true){
        winner = YOU;
    }
    if(YOU['score'] < DEALER['score'] || YOU['isBurst'] === true){
        winner = DEALER;
    }
    return winner;    
}

function showResults(winner){
    let msg;
    let color;
    if((DEALER['isBurst'] === true && YOU['isBurst'] === true) || YOU['score'] === DEALER['score']){
        blackjackGame['draws'] ++;
        document.querySelector('#draws').textContent = blackjackGame['draws'];
        msg = 'Draw!';
    }
    else if(winner === YOU){
        blackjackGame['wins'] ++;
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        msg = 'You Won!';
        winSound.play();
    }
    else if(winner === DEALER){
        blackjackGame['losses'] ++;
        document.querySelector('#losses').textContent = blackjackGame['losses'];
        msg = 'You Lost!';
        lossSound.play();
    }
    document.querySelector('#blackjack-result').textContent = msg;
}