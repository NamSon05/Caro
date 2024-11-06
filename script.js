let board = [];
let currentPlayer = 'X';
let gameOver = false;
const boardSize = 20; // 20x20 board
const winCondition = 5; // 5 in a row to win
let winningCells = [];

// Tạo bảng game 20x20
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    for (let row = 0; row < boardSize; row++) {
        board[row] = [];
        for (let col = 0; col < boardSize; col++) {
            board[row][col] = ''; // Khởi tạo bảng trống
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => makeMove(row, col));
            gameBoard.appendChild(cell);
        }
    }
}

// Xử lý lượt đi của người chơi
function makeMove(row, col) {
    if (gameOver || board[row][col] !== '') return;

    // Đánh dấu vị trí của người chơi
    board[row][col] = currentPlayer;
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    cell.textContent = currentPlayer;
    
    // Thêm màu nền
    cell.classList.add(currentPlayer.toLowerCase());

    // Kiểm tra chiến thắng
    if (checkWin(row, col)) {
        document.getElementById('status').textContent = `Người chơi ${currentPlayer} thắng!`;
        gameOver = true;
        triggerFireworks(); // Bắn pháo hoa
        triggerFlashEffect(winningCells); // Hiệu ứng chớp nháy
        boldWinningCells(winningCells); // Đậm chữ cho các ô chiến thắng
    } else if (board.flat().every(cell => cell !== '')) {
        document.getElementById('status').textContent = "Hòa!";
        gameOver = true;
    } else {
        // Chuyển lượt người chơi
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').textContent = `Lượt của người chơi ${currentPlayer}`;
    }
}

// Kiểm tra xem người chơi có thắng không (5 ô liên tiếp)
function checkWin(row, col) {
    const directions = [
        [1, 0], // Hướng ngang
        [0, 1], // Hướng dọc
        [1, 1], // Hướng chéo chính
        [1, -1] // Hướng chéo phụ
    ];

    for (let [dx, dy] of directions) {
        const cells = [];
        let count = 1;

        // Kiểm tra theo hướng dương
        cells.push({ row, col });
        for (let i = 1; i < winCondition; i++) {
            const newRow = row + dx * i;
            const newCol = col + dy * i;
            if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize && board[newRow][newCol] === currentPlayer) {
                cells.push({ row: newRow, col: newCol });
                count++;
            } else {
                break;
            }
        }

        // Kiểm tra theo hướng âm
        for (let i = 1; i < winCondition; i++) {
            const newRow = row - dx * i;
            const newCol = col - dy * i;
            if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize && board[newRow][newCol] === currentPlayer) {
                cells.push({ row: newRow, col: newCol });
                count++;
            } else {
                break;
            }
        }

        if (count >= winCondition) {
            winningCells = cells;
            return true;
        }
    }

    return false;
}

// Trigger fireworks effect
function triggerFireworks() {
    const fireworksContainer = document.getElementById('fireworks-container');
    fireworksContainer.style.display = 'block';
    for (let i = 0; i < 10; i++) {
        createFirework(fireworksContainer);
    }
    setTimeout(() => {
        fireworksContainer.style.display = 'none';
    }, 3000);
}

function createFirework(container) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.left = `${Math.random() * 100}vw`;
    firework.style.top = `${Math.random() * 100}vh`;
    firework.style.width = `${Math.random() * 50 + 20}px`;
    firework.style.height = firework.style.width;
    firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    container.appendChild(firework);
    setTimeout(() => firework.remove(), 1500);
}

// Hiệu ứng chớp nháy nền cho ô chiến thắng
function triggerFlashEffect(cells) {
    cells.forEach(cell => {
        const cellElement = document.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`);
        cellElement.classList.add('flash');
    });
}

// Làm đậm chữ cho các ô chiến thắng
function boldWinningCells(cells) {
    cells.forEach(cell => {
        const cellElement = document.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`);
        cellElement.classList.add('bold');
    });
}

// Reset trò chơi
function resetGame() {
    board = [];
    currentPlayer = 'X';
    gameOver = false;
    winningCells = [];
    document.getElementById('status').textContent = `Lượt của người chơi ${currentPlayer}`;
    document.getElementById('game-board').innerHTML = '';
    createBoard();
}

createBoard();
