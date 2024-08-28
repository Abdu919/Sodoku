const board = document.getElementById('sudoku-board');

// Sample initial puzzle (0 represents empty cells)
const initialPuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Create Sudoku board
function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('input');
        cell.type = 'number';
        cell.min = 1;
        cell.max = 9;
        cell.value = initialPuzzle[Math.floor(i / 9)][i % 9] || '';
        board.appendChild(cell);
    }
}

// Validate Sudoku solution
function validateSolution() {
    const cells = document.querySelectorAll('#sudoku-board input');
    const puzzle = Array.from(cells).map(cell => Number(cell.value) || 0);
    
    for (let i = 0; i < 9; i++) {
        const row = new Set();
        const col = new Set();
        const box = new Set();
        
        for (let j = 0; j < 9; j++) {
            const rowValue = puzzle[i * 9 + j];
            const colValue = puzzle[j * 9 + i];
            const boxValue = puzzle[Math.floor(i / 3) * 27 + Math.floor(j / 3) * 9 + (i % 3) * 3 + (j % 3)];
            
            if (rowValue && row.has(rowValue)) return alert('Invalid solution');
            if (colValue && col.has(colValue)) return alert('Invalid solution');
            if (boxValue && box.has(boxValue)) return alert('Invalid solution');
            
            row.add(rowValue);
            col.add(colValue);
            box.add(boxValue);
        }
    }
    alert('Valid solution');
}

createBoard();

document.getElementById('check-btn').addEventListener('click', validateSolution);
