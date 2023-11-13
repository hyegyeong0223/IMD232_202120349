let cells = [];

const colNum = 10,
  rowNum = colNum;

let w, h;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  w = width / colNum;
  h = height / rowNum;

  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      const x = w * col;
      const y = h * row;
      const state = random() < 0.5;
      const idx = colNum * row + col;
      const newCell = new Cell(x, y, w, h, state, idx);
      newCell.addFriends(cells);
      cells.push(newCell);
    }
  }

  cells.forEach((eachCell)) => {
    eachCell.addFriends((cells))
  }

  console.log(cells);

  background('white');
}

function draw() {
  background('white');
  cells.forEach((eachCell) => {
    eachCell.display();
  });
}
