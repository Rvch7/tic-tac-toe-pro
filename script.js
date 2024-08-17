const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let playerXMoves = [];
let playerOMoves = [];

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === player)
    );
}

function checkDraw() {
    return board.every(cell => cell !== null);
}

function handleMove(index) {
    if (!board[index]) {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        if (currentPlayer === 'X') {
            playerXMoves.push(index);
            if (playerXMoves.length > 3) {
                const firstMoveIndex = playerXMoves.shift();
                board[firstMoveIndex] = null;
                cells[firstMoveIndex].textContent = '';
            }
        } else {
            playerOMoves.push(index);
            if (playerOMoves.length > 3) {
                const firstMoveIndex = playerOMoves.shift();
                board[firstMoveIndex] = null;
                cells[firstMoveIndex].textContent = '';
            }
        }

        if (checkWin(currentPlayer)) {
            alert(`Player ${currentPlayer} wins!`);
            resetGame();
        } else if (checkDraw()) {
            alert('It\'s a draw!');
            resetGame();
        } else {
            updateHighlight();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function updateHighlight() {
    cells.forEach(cell => cell.classList.remove('highlight'));

    if (currentPlayer === 'X' && playerXMoves.length === 3) {
        cells[playerXMoves[0]].classList.add('highlight');
    } else if (currentPlayer === 'O' && playerOMoves.length === 3) {
        cells[playerOMoves[0]].classList.add('highlight');
    }
}

function resetGame() {
    board = Array(9).fill(null);
    playerXMoves = [];
    playerOMoves = [];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('highlight');
    });
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleMove(index));
});
