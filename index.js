const gridCells = document.querySelectorAll('.grid-cell');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let totalMoves = 0;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startScreen = document.querySelector('.start-screen');
const startSingleplayerButton = startScreen.querySelector('.singleplayer-start-button')
const winScreen = document.querySelector('.win-screen');
const winScreenContent = winScreen.querySelector('.win-screen-content');
const winText = winScreen.querySelector('.win-text');
const playAgainButton = winScreen.querySelector('.play-again-button');
const mainMenuButton = winScreen.querySelector('.main-menu-button');
const mobileBlockScreen = document.querySelector('.mobile-block-screen')
const isMobile = navigator.userAgentData.mobile;

if (isMobile){
  mobileBlockScreen.style.display = 'flex';
}

function checkWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      board[a] !== '' &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }
  return null;
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  totalMoves = 0;
  gridCells.forEach(cell => {
    cell.innerHTML = '';
  });
  winScreenContent.classList.add('scale-out');
  setTimeout(() => {
    winScreen.style.display = 'none';
    winScreenContent.classList.remove('scale-out');
  }, 150);
  winScreenContent.classList.remove('active');
}

function showWinScreen() {
  winScreen.style.display = 'flex';
  setTimeout(() => {
    winScreenContent.classList.add('active');
  }, 10);
}

playAgainButton.addEventListener('click', resetGame);

function startSingleplayerGame(){
  startScreen.style.display = 'none';
}

startSingleplayerButton.addEventListener('click', startSingleplayerGame);

function mainMenu(){
  resetGame();
  startScreen.style.display = 'flex';
}

mainMenuButton.addEventListener('click', mainMenu);

gridCells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (board[index] !== '')
      return;
    board[index] = currentPlayer;
    const img = document.createElement('img');
    img.src = `assets/${currentPlayer}.png`;
    img.alt = `${currentPlayer}`;
    img.classList.add('scale-in');
    cell.appendChild(img);
    setTimeout(() => {
      img.classList.add('active');
    }, 10);
    totalMoves += 1;

    const winner = checkWin();
    if (winner) {
      winText.textContent = `Player ${winner} wins!`;
      showWinScreen();
      return;
    } else if (totalMoves === 9) {
      winText.textContent = "It's a tie!";
      showWinScreen();
      return;
    }

    if (currentPlayer === 'X')
      currentPlayer = 'O';
    else
      currentPlayer = 'X';
  });
});