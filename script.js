const textBox = document.getElementById('text');

//reload page using the refresh button
function reloadPage() {
    window.location.reload();
}

const refreshButton = document.getElementById('refresh');

refreshButton.addEventListener("click", reloadPage)



const gameBoardObject = (function() {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    return {board}
})();

    // Find the position of a square in the board array
const squares = document.querySelectorAll('.square')

function getAttribute(e) {
    const clickedSquare = e.target;
    const arrayPosition = clickedSquare.dataset.position;

    if (gameControl.checkPlayable(arrayPosition) === true) {
        gameControl.changeArray(arrayPosition);
        gameControl.render();
        gameControl.gameResult();
        gameControl.switchPlayerTurn();
    }  
}

squares.forEach( square => {
    square.addEventListener('click', getAttribute);
})

const gameControl = (() => {
    playerOneName = 'Player 1';
    playerTwoName = 'Player 2';
    const players = [
        {
            name: playerOneName,
            moveMarker: 1
        },
        {
            name: playerTwoName,
            moveMarker: 2
        }
    ];

    // switch between players
    let activePlayer = players[0];
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;


    // check if the square has already been played
    const checkPlayable = (position) => {
        if (gameBoardObject.board[position] === 0) {
            return true;
        } else {
            alert('You cannot play on this square.');
            return false;
        }
    }

    // change array element to match board selection
    const changeArray = (position) => {
        gameBoardObject.board[position] = activePlayer.moveMarker;
    }

    // add the correct html text based on the player choice
    const render = () => {
        for (let i = 0; i < gameBoardObject.board.length; i++) {
            const dataSquare = document.querySelector(`div[data-position="${i}"]`);
            if (gameBoardObject.board[i] === 0) {
                dataSquare.innerHTML = '';
            } else if (gameBoardObject.board[i] === 1) {
                dataSquare.innerHTML = 'X';
            } else {
                dataSquare.innerHTML = 'O';
            }
        }
    }
    
    //look at gameboard array. Do any of the winning combo array positions contain only the moveMarker of the current active player? 
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]; 

    function gameResult() {
        winningCombinations.forEach((element, index) => {
            if (activePlayer.moveMarker === gameBoardObject.board[element[0]] && activePlayer.moveMarker === gameBoardObject.board[element[1]] && activePlayer.moveMarker === gameBoardObject.board[element[2]]) {
                textBox.textContent = 'You win!';
            } else if (gameBoardObject.board.every(element => element !== 0)) {
                textBox.textContent = 'We have a tie.';
            }
        })
    
    }

    return {checkPlayable, changeArray, switchPlayerTurn, render, gameResult}
})();