//Create a list of cards
let cardList = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle (array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
cardList = shuffle(cardList);

// Remove cards from previous session
const deck = document.querySelector('.deck');

function remove () {
 while (deck.firstChild) {
     deck.firstChild.remove();
}
}
remove();

// Add HTML to each card and attach card to DOM
function resetCards () {
  for (let c=0; c<cardList.length; c++) {
   // cardList[c]=`<li class="card"><i class="${cardList[c]}"></i></li>`;
   cardList[c] = '<li class="card"><i class="'+cardList[c]+'"></i></li>';
   const textToAdd = cardList[c];
   deck.insertAdjacentHTML('afterbegin', textToAdd);
 }
}
resetCards();

//Reset moves to 0
let moves = document.querySelector('.moves');
function resetMoves () {
  moves.innerText=0;
}
resetMoves();

let openCards = [];

//Start measure time
let innitialTime = performance.now();

// Add event listener to cards
deck.addEventListener ('click', function (evt) {
  if (evt.target.nodeName==='LI' && evt.target.classList.contains('show')===false) {

    if (openCards.length===0) {
      //Open card on click
      evt.target.classList.add('animation');
      evt.target.classList.add('open');
      evt.target.classList.add('show');
      // Apdate the number of open cards
      openCards.push(evt.target.firstChild);
    } else if (openCards.length===1) {
      //Open card on click
        evt.target.classList.add('animation');
        evt.target.classList.add('open');
        evt.target.classList.add('show');
        // Apdate the number of open cards
        openCards.push(evt.target.firstChild);

      function match () {
        if (openCards.length===2) {
          // Add moves to score panel
            function countMoves () {
              let newMoves = parseInt(moves.innerText);
              moves.innerText = (newMoves+1);
            }
            countMoves();

          //Manage stars rating
            function changeStars () {
              if (moves.innerText==='10') {
                document.querySelector('i.fa.fa-star').remove();
                let newStar = document.createElement('li');
                newStar.innerHTML = '<i class="fa fa-star-o"></i>';
                document.querySelector('.stars').appendChild(newStar);
              } else if (moves.innerText==='15') {
                  document.querySelector('i.fa.fa-star').remove();
                  let secondStar = document.createElement('li');
                  secondStar.innerHTML = '<i class="fa fa-star-o"></i>';
                  document.querySelector('.stars').appendChild(secondStar);
                } else if (moves.innerText==='20') {
                  document.querySelector('i.fa.fa-star').remove();
                  let thirdStar = document.createElement('li');
                  thirdStar.innerHTML = '<i class="fa fa-star-o"></i>';
                  document.querySelector('.stars').appendChild(thirdStar);
                  }
            } changeStars();

        // Check if there are another open card and, if both match, leave them open
            if (openCards[0].className===openCards[1].className) {
            evt.target.classList.add('match');
            openCards[0].parentElement.classList.add('match');
            openCards.pop();
            openCards.pop();

          // Count number of matched cards and if all match, finish the game
            function countingMatchedCards () {
              const matchedCards = document.querySelectorAll('li.card.animation.open.show.match');
              const blinkingStars = document.querySelectorAll('i.fa.fa-star');
              if (matchedCards.length===16) {
                let finalTime = performance.now();
                let gameTime = parseInt((finalTime-innitialTime)/1000);
                document.querySelector('.container').style.display='none';
                document.querySelector('.popup').style.display='block';
                const countingStars = blinkingStars.length;
                document.querySelector('.popup p').innerText = `Moves: ${moves.innerText}, stars: ${countingStars}, time: ${gameTime}s.`;
              }
            }
            countingMatchedCards();

            // if they don't match, hide the cards' symbol
          } else {
              setTimeout(function close() {
              evt.target.classList.remove('open');
              evt.target.classList.remove('show');
              evt.target.classList.remove('animation');
              openCards[0].parentElement.classList.remove('open');
              openCards[0].parentElement.classList.remove('show');
              openCards[0].parentElement.classList.remove('animation');
              openCards.pop();
              openCards.pop();
            }, 1000);
          }
}
} match();
}
}
}
);

// Declare function to reset stars
  function resetStars () {
    const blinkingStars = document.querySelectorAll('i.fa.fa-star');
    const countingStars = blinkingStars.length;
    const stars = document.querySelector('.stars')
    if (countingStars!==3) {
      while (stars.firstChild) {
        stars.firstChild.remove()
    }
    const fragment = document.createDocumentFragment();
    const newElementOne = document.createElement('li');
    newElementOne.innerHTML = '<i class="fa fa-star"></i>';
    fragment.appendChild(newElementOne);
    const newElementTwo = document.createElement('li');
    newElementTwo.innerHTML = '<i class="fa fa-star"></i>';
    fragment.appendChild(newElementTwo);
    const newElementThree = document.createElement('li');
    newElementThree.innerHTML = '<i class="fa fa-star"></i>';
    fragment.appendChild(newElementThree);
    stars.appendChild(fragment);
    }
  }

//Add event listener to repeat button
const restart = document.querySelector('i.fa.fa-repeat');
restart.addEventListener('click', function () {
  //Reset time
  innitialTime = performance.now();
  finalTime = 0;

  //Reset list of open cards
  if (openCards.length===1) {
    openCards.pop();
      }

  //Set new list of cards
  let resetCardList = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];
  // Shuffle function from http://stackoverflow.com/a/245097
  resetCardList = shuffle(resetCardList);
  remove();

  // Add HTML to each card and attach card to DOM
  function resetCards () {
    for (let c=0; c<resetCardList.length; c++) {
      resetCardList[c] = '<li class="card"><i class="'+resetCardList[c]+'"></i></li>';
      const textToAdd = resetCardList[c];
      deck.insertAdjacentHTML('afterbegin', textToAdd);
    }
  }
  resetCards();
  resetMoves();
  resetStars();
}
)

// Reset game on click on "Play again"
const playAgain = document.querySelector('.button');
playAgain.addEventListener('click', function () {
  innitialTime = performance.now();
  finalTime = 0;
  let resetCardList = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];
  // Shuffle function from http://stackoverflow.com/a/245097
  resetCardList = shuffle(resetCardList);
  remove();

  // Add HTML to each card and attach card to DOM
  function resetCards () {
    for (let c=0; c<resetCardList.length; c++) {
     resetCardList[c] = '<li class="card"><i class="'+resetCardList[c]+'"></i></li>';
     const textToAdd = resetCardList[c];
     deck.insertAdjacentHTML('afterbegin', textToAdd);
  }};
  resetCards();
  resetMoves();
  resetStars();
  document.querySelector('.container').style.display = 'flex';
  document.querySelector('.popup').style.display = 'none';
}
)
