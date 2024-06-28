// Get the canvas element and its drawing context
canvas = document.getElementsByTagName("canvas")[0];
ctx = canvas.getContext("2d");

// Set the canvas width and height
const WIDTH = 600;
const HEIGHT = 600;
canvas.width = WIDTH;
canvas.height = HEIGHT;

// Cell constructor function
var Cell = function (cellType) {
  this.value = cellType; // Cell type (wall, path, start, exit)
  this.row = null; // Row position
  this.col = null; // Column position
  this.visited = false; // BFS visited?
  this.parent = null; // BFS parent reference
};

// Method to get cell color based on its type
Cell.prototype.getColor = function () {
  if (this.value == "#") {
    return "black";
  } else if (this.value == " ") {
    return "white";
  } else if (this.value == "Start") {
    return "green";
  } else if (this.value == "Exit") {
    return "red";
  }
};

// Method to set the position of the cell
Cell.prototype.setPosition = function (row, col) {
  this.row = row;
  this.col = col;
};

// Method to get the neighbors of the cell
Cell.prototype.getNeighbors = function (maze) {
  let neighbors = [];
  let directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (let direction of directions) {
    let newRow = this.row + direction[0];
    let newCol = this.col + direction[1];
    // Check if the neighbor is within the maze
    if (
      newRow >= 0 &&
      newRow < maze.contents.length &&
      newCol >= 0 &&
      newCol < maze.contents[0].length
    ) {
      neighbors.push(maze.contents[newRow][newCol]);
    }
  }

  return neighbors;
};

// Maze constructor function
var Maze = function () {
  this.contents = []; // Maze contents (2D array of cells)
  this.start = null; // Start cell
  this.end = null; // End cell
};

// Method to initialize the maze contents
Maze.prototype.initContents = function (size) {
  for (let i = 0; i < size; i++) {
    this.contents.push([]);
    for (let j = 0; j < size; j++) {
      // Add walls around the maze
      if (i == 0 || i == size - 1 || j == 0 || j == size - 1) {
        let cell = new Cell("#");
        cell.setPosition(i, j);
        this.contents[i].push(cell);
      } else {
        // Add empty cells in the maze
        let cell = new Cell(" ");
        cell.setPosition(i, j);
        this.contents[i].push(cell);
      }
    }
  }
};

// Method to generate the maze using recursive division
Maze.prototype.generator = function ([x1, x2], [y1, y2], size) {
  let width = x2 - x1; //boundaries of the horizontal dimension
  let height = y2 - y1; // boundaries of the vertical dimensionboundaries of the horizontal dimension
  if (width >= height) {
    // Vertical bisection
    // check if the bisection is not too small (wall can go in the middle)
    if (x2 - x1 > 3) {
      let bisection = Math.ceil((x1 + x2) / 2);
      let max = y2 - 1;
      let min = y1 + 1;
      let randomPassage = Math.floor(Math.random() * (max - min + 1)) + min; // finding a random integer between min & max to place empty wall
      let first = false; //cells at the boundaries ?
      let second = false; // cells at the boundaries ?
      if (this.contents[y2][bisection].value == " ") {
        randomPassage = max;
        first = true;
      } else if (this.contents[y1][bisection].value == " ") {
        randomPassage = min;
        second = true;
      }
      for (let i = y1 + 1; i < y2; i++) {
        if (first && second) {
          if (i == max || i == min) {
            continue;
          }
        } else if (i == randomPassage) {
          continue;
        }
        this.contents[i][bisection].value = "#";
      }
      this.generator([x1, bisection], [y1, y2], size);
      this.generator([bisection, x2], [y1, y2], size);
    }
  } else {
    // Horizontal bisection
    if (y2 - y1 > 3) {
      let bisection = Math.ceil((y1 + y2) / 2);
      let max = x2 - 1;
      let min = x1 + 1;
      let randomPassage = Math.floor(Math.random() * (max - min + 1)) + min;
      let first = false;
      let second = false;
      if (this.contents[bisection][x2].value == " ") {
        randomPassage = max;
        first = true;
      }
      if (this.contents[bisection][x1].value == " ") {
        randomPassage = min;
        second = true;
      }

      //adds the wall in between the maze
      for (let i = x1 + 1; i < x2; i++) {
        if (first && second) {
          if (i == max || i == min) {
            continue;
          }
        } else if (i == randomPassage) {
          continue;
        }
        this.contents[bisection][i].value = "#";
      }
      this.generator([x1, x2], [y1, bisection], size);
      this.generator([x1, x2], [bisection, y2], size);
    }
  }
};

// Method to render the maze on the canvas
Maze.prototype.render = function () {
  ctx.clearRect(0, 0, WIDTH, HEIGHT); //clear old canvas
  let numRows = this.contents.length;
  let numCols = this.contents[0].length;
  let cellWidth = WIDTH / numCols;
  let cellHeight = HEIGHT / numRows;
  let cellLength = cellWidth > cellHeight ? cellHeight : cellWidth;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let cell = this.contents[row][col]; // render each cell
      ctx.fillStyle = cell.getColor();
      let rectX = col * cellLength;
      let rectY = row * cellLength;
      ctx.fillRect(rectX, rectY, cellLength, cellLength); // draw the cell
    }
  }
};

// Method to get all empty slots in the maze
Maze.prototype.getEmptySlots = function () {
  let emptySlots = [];
  for (let row = 0; row < this.contents.length; row++) {
    for (let col = 0; col < this.contents[0].length; col++) {
      if (this.contents[row][col].value == " ") {
        emptySlots.push(this.contents[row][col]);
      }
    }
  }
  return emptySlots;
};

// Method to initialize start and end points
Maze.prototype.initPoints = function () {
  let emptySlots = this.getEmptySlots();
  if (emptySlots.length > 1) {
    this.start = emptySlots[0]; // set start cell location
    this.end = emptySlots[emptySlots.length - 1]; // set empty cell location
    this.start.value = "Start";
    this.end.value = "Exit";
  }
};

// Method to check if the maze is solvable using BFS
Maze.prototype.isSolvable = function () {
  if (!this.start || !this.end) {
    return false; // no start/end point = unsolvable
  }

  // Reset visited and parent properties for BFS
  for (let row of this.contents) {
    for (let cell of row) {
      cell.visited = false;
      cell.parent = null;
    }
  }

  let queue = [this.start];
  this.start.visited = true;

  while (queue.length > 0) {
    let current = queue.shift(); //dequeing from queue
    if (current === this.end) {
      return true; // Path found
    }

    // exloring neighbor cells
    for (let neighbor of current.getNeighbors(this)) {
      if (!neighbor.visited && neighbor.value !== "#") {
        neighbor.visited = true;
        neighbor.parent = current;
        queue.push(neighbor); //Enqueues neighbor for further exploration
      }
    }
  }

  return false; // No path found
};

// Event listener for the "Generate" button
let generate = document.getElementById("generate");
let size = 20; // Maze size

myMaze = null;

function generator() {
  // Executes the blocks for at least once and continues until myMaze.isSolvable() returns true.
  do {
    myMaze = new Maze();
    myMaze.initContents(size);
    myMaze.generator([0, size - 1], [0, size - 1], size);
    myMaze.initPoints(); // Initializes the start and end points within the maze.
  } while (!myMaze.isSolvable());
  myMaze.render();
}

generator();
generate.addEventListener("click", generator);
