const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  const board = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    const row = [];
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  const board = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    const row = [];
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(null);
    }
    board.push(row);
}

let numberOfBombsPlaced = 0;
while (numberOfBombsPlaced < numberOfBombs) {
  const randomRowIndex = Math.floor(Math.random() * numberOfRows);
  const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

  if (board[randomRowIndex][randomColumnIndex] !=='B') {
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }
}
return board;
};

const getNumberOfNeighborBombs = (bombBoard, flipRow, flipColumn) => {
  const neighborOffsets = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let getNumberOfNeighborBombs = 0;
  neighborOffsets.forEach(offset => {
    const neighborRowIndex = flipRow + offset[0];
    const neighborColumnIndex = flipColumn + offset[1];

    // Check to see if row and column are valid tile values on the bombBoard
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        getNumberOfNeighborBombs++;
      }
    }
  });

  return getNumberOfNeighborBombs;
}

const flipTile = (playerBoard, bombBoard, flipRow, flipColumn) => {
  // Check if tile is already flipped, if so, return we don't want to do anything
  if (playerBoard[flipRow][flipColumn] !== 'This tile has already been flipped!') {
    return;
  }

  // Check if tile is bomb, if so, place bomb on player board, and rest of bombs
  if (bombBoard[flipRow][flipColumn] === 'B') {
    playerBoard[flipRow][flipColumn] = "B";
  } else {
    playerBoard[flipRow][flipColumn] = getNumberOfSurroundingBombs(bombBoard, flipRow, flipColumn);
  }

  // If tile is not bomb, let player know how many bombs are on board. Place number of surrounding bombs on player board.

}


const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

const playerBoard = generatePlayerBoard(5, 5);
const bombBoard = generateBombBoard(5, 5, 8);

printBoard(bombBoard);
console.log(getNumberOfNeighborBombs(bombBoard, 1, 1));

/*
console.log('Player Board: ')
printBoard(playerBoard);
console.log('Bomb Board: ')
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ')
printBoard(playerBoard);
*/
