let blackjackGame = {
    'you': {'scoreSpan': '#your-score' , 'score': 0 , 'div': '#your-box'},
    'dealer': {'scoreSpan': '#dealer-score' , 'score': 0 , 'div': '#dealer-box'},
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

//HIT BUTTON
function blackjackHit(){
    if(YOU['score'] < 21 && blackjackGame['isStand'] === false){
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
}

function updateScore(card, activePlayer){
    activePlayer['score'] += blackjackGame['cardMap'][card];
    console.log(activePlayer['score']);
}

function showScore(activePlayer){
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}

//Stand BUTTON 

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand(){
    console.log(DEALER['score']);
    while(DEALER['score'] < 16){
        blackjackGame['isStand'] = true;
        let card = randomCard();
        console.log(card);
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    blackjackGame['turnOver'] = true;
    computeWinner();
}

//DEAL BUTTON

function blackjackDeal(){
    if(blackjackGame['turnOver'] === true){
        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector(YOU['div']).querySelectorAll('img');
        let dealerImage = document.querySelector(DEALER['div']).querySelectorAll('img');

        for(i=0; i<yourImages.length; i++)
            yourImages[i].remove();
        for(i=0; i<dealerImage.length; i++)
            dealerImage[i].remove();
            
        YOU['score'] = 0;  
        DEALER['score'] = 0;  
        //document.querySelector(YOU['span']).textContent = 0;    
        showScore(YOU);
        showScore(DEALER);

    }
    blackjackGame['turnOver'] = false;

}