document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll('.cell');
    const board = document.getElementById('board');
    const messageDiv = document.getElementById('message');
    const startBtn = document.getElementById('start-btn'); 
    let username = localStorage.getItem('username'); 
    let currentPlayer = 'X';
    let boardState = Array(9).fill(null);

    if (!username) {
        alert("Por favor, vuelve a la página de inicio e introduce tu nombre.");
        window.location.href = 'index.html'; 
    }

    
    startBtn.addEventListener('click', resetGame);

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleClick(cell, index));
    });

    function handleClick(cell, index) {
        if (!boardState[index] && !messageDiv.innerText) {
            placeMarker(cell, index, 'X');
            if (checkWinner('X')) {
                showMessage(`${username} gana con las X!`);
            } else {
                setTimeout(() => {
                    computerTurn();
                }, 500);
            }
        }
    }

    function placeMarker(cell, index, marker) {
        boardState[index] = marker;
        const markerDiv = document.createElement('div');
        markerDiv.innerText = marker;
        cell.appendChild(markerDiv);
        cell.style.pointerEvents = 'none'; 
    }

    function computerTurn() {
        const availableCells = boardState
            .map((value, idx) => (value === null ? idx : null))
            .filter(idx => idx !== null);

        if (availableCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableCells.length);
            const cellIndex = availableCells[randomIndex];
            const cell = cells[cellIndex];

            placeMarker(cell, cellIndex, 'O');
            if (checkWinner('O')) {
                showMessage('El computador gana con las O!');
            }
        }
    }

    function checkWinner(marker) {
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

        return winningCombinations.some(combination => {
            return combination.every(index => boardState[index] === marker);
        });
    }

    function showMessage(text) {
        messageDiv.classList.remove('hidden');
        messageDiv.innerText = text;
    }

    
    function resetGame() {
        boardState = Array(9).fill(null); 
        cells.forEach(cell => {
            cell.innerHTML = ''; 
            cell.style.pointerEvents = 'auto';
        });
        messageDiv.classList.add('hidden'); 
        messageDiv.innerText = ''; 
        currentPlayer = 'X'; 
    }
});

