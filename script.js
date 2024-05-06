const numbers = ['😂', '👍', '😒', '😅', '😆', '😇', ];
const gridContainer = document.getElementById('grid-container');
const resetButton = document.getElementById('reset-btn');
const moveCountElement = document.getElementById('move-count');
const timerElement = document.getElementById('timer');

let moveCount = 0;
let timer = 0;
let flippedCards = [];
let matchedPairs = 0;
let timerInterval;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCards() {
    //This line spreads the elements of the numbers array into individual elements
    // It essentially duplicates the elements of the numbers array
    const shuffledSymbols = shuffle([...numbers, ...numbers]);
    shuffledSymbols.forEach(number => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.number = number;
        card.textContent = '?';
        card.addEventListener('click', () => {
            flipCard(card);
        });
        gridContainer.appendChild(card);
    });
}
function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flip')) {
        card.textContent = card.dataset.number;
        card.classList.add('flip');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moveCount++;
            moveCountElement.textContent = moveCount;
            if (flippedCards[0].dataset.number === flippedCards[1].dataset.number) {
                matchedPairs++;
                if (matchedPairs === numbers.length) {
                    clearInterval(timerInterval);
                    setTimeout(() => {
                        alert(`Congratulations! You've matched all pairs in ${moveCount} moves and ${timer} seconds.`);
                    }, 500);
                }
                flippedCards = [];
            } else {
                setTimeout(() => {
                    flippedCards.forEach(card => {
                        card.textContent = '?';
                        card.classList.remove('flip');
                    });
                    flippedCards = [];
                }, 500);
                
            }
        }
    }
}

// Start timer function
function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timerElement.textContent = timer;
    }, 1000);
}

// Reset game function
function resetGame() {
    clearInterval(timerInterval);
    moveCount = 0;
    timer = 0;
    matchedPairs = 0;
    moveCountElement.textContent = moveCount;
    timerElement.textContent = timer;
    flippedCards = [];
    gridContainer.innerHTML = '';
    createCards();
    startTimer();
}

// Event listener for reset button
resetButton.addEventListener('click', resetGame);

// Initialize game
createCards();
startTimer();