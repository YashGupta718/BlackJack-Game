let blackjackGame = {
    'you': {'scoreSpan': '#your-score' , 'score': 0 , 'div': '#your-box'},
    'dealer': {'scoreSpan': '#dealer-score' , 'score': 0 , 'div': '#dealer-box'},
    'cards': ['2','3','4','5','6','7','8','9','10','A','J','K','Q'],    
    'cardMap': {'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'10': 10,'A': [1,11],'J': 10,'K': 10,'Q': 10},
    'wins': 0,
    'losses': 0,
    'draws': 0,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

document.querySelector('#hit-btn').addEventListener('click',blackjackHit);
document.querySelector('#deal-btn').addEventListener('click',blackjackDeal);
document.querySelector('#stand-btn').addEventListener('click',blackjackStand);

function blackjackHit(){
    let card = randomCard();
    showCard(card,YOU);
}

function randomCard(){
    let ran = Math.floor(Math.random()*13);
    return blackjackGame['cards'][ran];
}

function showCard(card, activePlayer){
    let cardImage = document.createElement('img');
    cardImage.src = 'static/blackjack_assets/images/${card}.png';
    document.querySelector(activePlayer['div']).appendChild(cardImage);
}