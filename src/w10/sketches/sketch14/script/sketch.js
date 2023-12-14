//꽃 배열 & 픽셀 마우스

let x, y;
const rad = 50;
let isHover = false;
let deltaX, deltaY;
const flowerSize = 30; // 각 꽃잎 배열의 크기

function setup() {
  setCanvasContainer('canvas', 3, 3, true);
  x = width / 2;
  y = height / 2;
  colorMode(HSL, 360, 100, 100, 100);
  background('white');
}

function draw() {
  background('white');
  displayFlowers();
  noFill();
  stroke(0);

  // 50x50 그리드로 나누기
  const numColumns = 50;
  const numRows = 50;
  const cellWidth = (width / numColumns) * 2; // 셀의 크기를 3배로 키움
  const cellHeight = (height / numRows) * 2; // 셀의 크기를 3배로 키움

  // 마우스 위치에 따라 영향을 받는 범위 설정
  const influenceRange = 3;

  // 행과 열을 반복하여 각 박스를 그림
  for (let i = 0; i < numColumns; i++) {
    for (let j = 0; j < numRows; j++) {
      const cellX = i * cellWidth;
      const cellY = j * cellHeight;

      // 마우스 위치와 셀의 위치 간의 거리 계산
      const distance = dist(
        mouseX,
        mouseY,
        cellX + cellWidth / 2,
        cellY + cellHeight / 2
      );

      // 일정 범위 내에 있는 셀에 대해서만 테두리 그리기
      if (distance < cellWidth * influenceRange) {
        rect(cellX, cellY, cellWidth, cellHeight);
      }
    }
  }
}

function displayFlowers() {
  const numFlowers = 10;
  const flowerSpacing = width / numFlowers; // 간격 계산

  for (let i = 0; i < numFlowers; i++) {
    for (let j = 0; j < numFlowers; j++) {
      const flowerX = i * flowerSpacing + flowerSpacing / 2;
      const flowerY = j * flowerSpacing + flowerSpacing / 2;

      noStroke();
      // isHover = chkHover(flowerX, flowerY);

      if (isHover) {
        fill(320, 90, 70);
      } else {
        noFill(); // 채우기 없음
        stroke(0); // 테두리 색을 검정색으로 설정
      }

      // 꽃잎
      ellipse(
        flowerX - flowerSize / 2,
        flowerY - flowerSize / 2,
        flowerSize,
        flowerSize
      );
      ellipse(
        flowerX + flowerSize / 2,
        flowerY - flowerSize / 2,
        flowerSize,
        flowerSize
      );
      ellipse(
        flowerX - flowerSize / 2,
        flowerY + flowerSize / 2,
        flowerSize,
        flowerSize
      );
      ellipse(
        flowerX + flowerSize / 2,
        flowerY + flowerSize / 2,
        flowerSize,
        flowerSize
      );

      // 꽃잎 중앙
      fill(255, 255, 255);
      ellipse(flowerX, flowerY, flowerSize * 0.85, flowerSize * 0.85);
    }
  }
}
