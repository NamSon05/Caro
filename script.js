let board = [];
let currentPlayer = 'X';
let gameOver = false;
const boardSize = 20; // 20x20 board
const winCondition = 5; // 5 in a row to win

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
        triggerZigzagEffect(); // Hiệu ứng zig-zag
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
    return (
        checkDirection(row, col, 1, 0) || // Kiểm tra hàng
        checkDirection(row, col, 0, 1) || // Kiểm tra cột
        checkDirection(row, col, 1, 1) || // Kiểm tra chéo chính
        checkDirection(row, col, 1, -1)   // Kiểm tra chéo phụ
    );
}

// Kiểm tra theo hướng (dx, dy)
function checkDirection(row, col, dx, dy) {
    let count = 1;

    // Kiểm tra theo hướng dương
    for (let i = 1; i < winCondition; i++) {
        const newRow = row + dx * i;
        const newCol = col + dy * i;
        if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize && board[newRow][newCol] === currentPlayer) {
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
            count++;
        } else {
            break;
        }
    }

    return count >= winCondition;
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

// Hiệu ứng zig-zag khi kết thúc ván
function triggerZigzagEffect() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.add('zigzag');
    });
}

// Reset trò chơi
function resetGame() {
    board = [];
    currentPlayer = 'X';
    gameOver = false;
    document.getElementById('status').textContent = `Lượt của người chơi ${currentPlayer}`;
    document.getElementById('game-board').innerHTML = '';
    createBoard();
}

createBoard();
