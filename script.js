class TicTacToe {
    constructor() {
        this.currentPlayer = 'X';
        this.gameBoard = Array(9).fill('');
        this.gameActive = true;
        this.boardElement = document.getElementById('board');
        this.statusElement = document.getElementById('status');
        this.resetButton = document.querySelector('button');
        this.resetButton.addEventListener('click', () => this.resetGame());
        this.boardElement.addEventListener('click', (event) => this.handleCellClick(event));
        this.createBoard();
    }

    handleCellClick(event) {
        const cellIndex = event.target.dataset.index;

        if (this.gameBoard[cellIndex] === '' && this.gameActive) {
            this.gameBoard[cellIndex] = this.currentPlayer;
            event.target.innerText = this.currentPlayer;
            this.checkWinner();
            this.togglePlayer();
        }
    }

    togglePlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (this.gameBoard[a] && this.gameBoard[a] === this.gameBoard[b] && this.gameBoard[a] === this.gameBoard[c]) {
                this.gameActive = false;
                this.statusElement.innerText = `Player ${this.currentPlayer} wins!`;
                this.highlightWinningCells(combo);
                return;
            }
        }

        if (!this.gameBoard.includes('')) {
            this.gameActive = false;
            this.statusElement.innerText = 'It\'s a draw!';
        }
    }

    highlightWinningCells(combo) {
        for (const index of combo) {
            const cell = this.boardElement.children[index];
            cell.classList.add('winner');
        }
    }

    resetGame() {
        this.gameBoard = Array(9).fill('');
        this.gameActive = true;
        this.currentPlayer = 'X';
        this.statusElement.innerText = '';
        this.boardElement.innerHTML = '';
        this.createBoard();
    }

    createBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            this.boardElement.appendChild(cell);
        }
    }
}

const ticTacToe = new TicTacToe();
