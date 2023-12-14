// 마우스를 대면 픽셀 느낌으로 색상 변하게 하기!! / 그리드 보이는 버전

function setup() {
  setCanvasContainer('canvas', 3, 3, true);
  background('white');
}

function draw() {
  background('white');
  fill(0);

  // 50x50 그리드로 나누기
  const numColumns = 50;
  const numRows = 50;
  const cellWidth = width / numColumns;
  const cellHeight = height / numRows;

  // 마우스 위치에 따라 영향을 받는 범위 설정
  const influenceRange = 3;

  // 그리드 선을 검정색으로 그리기
  stroke(0);
  strokeWeight(1);

  // 가로 선 그리기
  for (let i = 0; i < numColumns + 1; i++) {
    const x = i * cellWidth;
    line(x, 0, x, height);
  }

  // 세로 선 그리기
  for (let j = 0; j < numRows + 1; j++) {
    const y = j * cellHeight;
    line(0, y, width, y);
  }

  // 행과 열을 반복하여 각 박스를 그림
  for (let i = 0; i < numColumns; i++) {
    for (let j = 0; j < numRows; j++) {
      const x = i * cellWidth;
      const y = j * cellHeight;

      // 마우스 위치와 셀의 위치 간의 거리 계산
      const distance = dist(
        mouseX,
        mouseY,
        x + cellWidth / 2,
        y + cellHeight / 2
      );

      // 일정 범위 내에 있는 셀에 대해서만 색상 변경
      if (distance < cellWidth * influenceRange) {
        ellipse(x + cellWidth / 2, y + cellHeight / 2, cellWidth, cellHeight);
      }
    }
  }
}
