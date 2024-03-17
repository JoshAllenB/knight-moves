const directions = [
  [-2, -1],
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
];

class Node {
  constructor(row, col, distanceFromStartPosition, path) {
    this.row = row;
    this.col = col;
    this.distanceFromStartPosition = distanceFromStartPosition;
    this.path = path;
  }

  getPositionString() {
    return `${this.row},${this.col}`;
  }
}

const isValidMove = (row, col, size) => {
  return row >= 0 && col >= 0 && row < size && col < size;
};

const getNeighbors = (row, col, size) => {
  const neighbors = [];
  for (const direction of directions) {
    const [rowChange, colChange] = direction;
    const neighborRow = row + rowChange;
    const neighborCol = col + colChange;

    if (isValidMove(neighborRow, neighborCol, size)) {
      neighbors.push([neighborRow, neighborCol]);
    }
  }
  return neighbors;
};

function getKnightsShortestPath(
  startRow,
  startCol,
  targetRow,
  targetCol,
  size
) {
  const queue = [];
  const startNode = new Node(startRow, startCol, 0, [[startRow, startCol]]);
  queue.push(startNode);

  const visited = new Set();

  while (queue.length > 0) {
    const node = queue.shift();
    const { row, col, distanceFromStartPosition, path } = node;

    if (row === targetRow && col === targetCol) {
      return {
        distance: distanceFromStartPosition,
        path: path,
      };
    }

    visited.add(node.getPositionString());

    for (const [neighborRow, neighborCol] of getNeighbors(row, col, size)) {
      const neighborNode = new Node(
        neighborRow,
        neighborCol,
        distanceFromStartPosition + 1,
        [...path, [neighborRow, neighborCol]]
      );

      if (!visited.has(neighborNode.getPositionString())) {
        queue.push(neighborNode);
      }
    }
  }

  return -1; // If no path found
}

// Example usage:
const startRow = 0;
const startCol = 0;
const targetRow = 4;
const targetCol = 3;
const size = 8; // Size of the chessboard

const result = getKnightsShortestPath(
  startRow,
  startCol,
  targetRow,
  targetCol,
  size
);
if (result !== -1) {
  console.log(`You made it in ${result.distance} moves! Here's your path:`);
  for (const [row, col] of result.path) {
    console.log(`[${row},${col}]`);
  }
} else {
  console.log("No path found.");
}
