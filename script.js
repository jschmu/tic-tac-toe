const gameBoardObject = (function() {
    const rows = 3;
    const columns = 3;
    let board = [0, 0, 0, 3, 0, 0, 0, 0, 0];

    return {board}
})();

    // Control the value of each square. This will be what is in each array element
const squareObject = (() => {
    let value = 0;
    const playerSelection = (player) => {
        value = player;
    }
    const getValue = () => value; 
    
    return {playerSelection, getValue}
})();

    // Find the position of a square in the board array
const squares = document.querySelectorAll('.square')

function getAttribute(e) {
    const clickedSquare = e.target;
    const arrayPosition = clickedSquare.dataset.position;

    gameControl.checkPlayable(arrayPosition);   
    alert('hi');
    gameControl.changeArray(arrayPosition,);

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

    let activePlayer = players[0];
    // switch between players
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        console.log(activePlayer.moveMarker);
    };
    const getActivePlayer = () => activePlayer;


    // check if the square has already been played
    const checkPlayable = (position) => {
        if (gameBoardObject.board[position] !== 0) {
            console.log('you cannot play');
            return;
        } else {
            console.log('you can play');
        }
    }
    // change array element to match board selection
    const changeArray = (position) => {
        gameBoardObject.board[position] = activePlayer.moveMarker;
    }

    return {checkPlayable, changeArray, switchPlayerTurn}
})();

squareObject.playerSelection(2);
console.log(gameBoardObject.board)