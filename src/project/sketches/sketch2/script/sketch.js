let cells = [];

const colNum = 10, //열의 개수, 초기값 10
  rowNum = colNum;

let w, h; //셀의 너비, 높이

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  w = width / colNum; //셀의 너비
  h = height / rowNum; //셀의 높ㅣ

  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      const x = w * col; //현재 열
      const y = h * row; //현재 행
      let state = random() < 0.5; //초기 상태를 무작위로 state에 저장
      cells.push(new Cell(x, y, w, h, state)); //  cell클래스로 객체 생성
    }
  }

  background('white');
}

function draw() {
  background('white');
  cells.forEach((eachCell) => {
    eachCell.display(); //배열 cell에 저장된 각 셀 객체의 display 메서드를 호출해 화면에 표시
  });
}

function mousePressed() {
  console.log('Mouse pressed!, cells');

  const pressedCol = floor(mouseX / w);
  const pressedRow = floor(mouseY / h);

  const pressedCell = cells[pressedRow * colNum + pressedCol];
  pressedCell.state = !pressedCell.state;

  background('white');
  cells.forEach((eachCell) => {
    eachCell.display();
  });
}
