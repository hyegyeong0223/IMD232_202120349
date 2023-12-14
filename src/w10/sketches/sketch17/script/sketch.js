//꽃 배열 & 픽셀 마우스 & 호버 색상 변경 & 랜덤 색상

let x, y;
const rad = 50;
let isHover = false;
let deltaX, deltaY;
const flowerSize = 30; // 각 꽃잎 배열의 크기
let clickedFlowerIndex = -1; // 클릭된 꽃의 인덱스, 초기값은 -1
let flowerColors = []; // 꽃의 색상을 저장하는 배열

function setup() {
  setCanvasContainer('canvas', 3, 3, true);
  x = width / 2;
  y = height / 2;
  colorMode(HSL, 360, 100, 100, 100);
  background('black');

  // 초기에 각 꽃의 색상을 저장
  const numFlowers = 10;
  for (let i = 0; i < numFlowers * numFlowers; i++) {
    flowerColors.push(color(random(360), 90, 70));
  }
}

function draw() {
  background('black');
  displayFlowers();
  noFill();
  stroke(0);

  // 50x50 그리드로 나누기
  const numColumns = 50;
  const numRows = 50;
  const cellWidth = width / numColumns;
  const cellHeight = height / numRows;

  // 마우스 위치에 따라 영향을 받는 범위 설정
  const influenceRange = 5;

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
      stroke('yellow');
      if (distance < cellWidth * influenceRange) {
        rect(cellX, cellY, cellWidth, cellHeight);
      }
    }
  }
  // 캔버스 위쪽에 텍스트 추가
  fill(255);
  textSize(50);
  textAlign(CENTER, TOP);
  text('', width / 2, 10);
}

function displayFlowers() {
  const numFlowers = 10;
  const flowerSpacing = width / numFlowers; // 간격 계산

  for (let i = 0; i < numFlowers; i++) {
    for (let j = 0; j < numFlowers; j++) {
      const flowerX = i * flowerSpacing + flowerSpacing / 2;
      const flowerY = j * flowerSpacing + flowerSpacing / 2;

      noStroke();

      // 마우스 위치와 꽃 중앙 간의 거리 계산
      const distance = dist(mouseX, mouseY, flowerX, flowerY);

      // 클릭된 꽃의 인덱스 저장
      const currentIndex = i * numFlowers + j;

      // 일정 범위 내에 있는 꽃 중앙에 대해서만 색상 적용
      if (
        distance < (flowerSize * 0.85) / 2 ||
        clickedFlowerIndex === currentIndex
      ) {
        // 클릭되었거나 호버 중인 꽃은 저장된 색상으로 설정
        fill(flowerColors[currentIndex]);
      } else {
        noFill(); // 채우기 없음
        stroke(0); // 테두리 색을 검정색으로 설정
      }

      // 꽃잎
      stroke('white');
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

function mouseClicked() {
  const numFlowers = 10;
  const flowerSpacing = width / numFlowers;

  for (let i = 0; i < numFlowers; i++) {
    for (let j = 0; j < numFlowers; j++) {
      const flowerX = i * flowerSpacing + flowerSpacing / 2;
      const flowerY = j * flowerSpacing + flowerSpacing / 2;

      // 클릭된 꽃을 확인
      if (
        mouseX > flowerX - flowerSize / 2 &&
        mouseX < flowerX + flowerSize / 2 &&
        mouseY > flowerY - flowerSize / 2 &&
        mouseY < flowerY + flowerSize / 2
      ) {
        // 클릭된 꽃의 인덱스 저장
        clickedFlowerIndex = i * numFlowers + j;
        return; // 클릭된 꽃을 찾았으면 더 이상 검색하지 않도록 종료
      }

      // 꽃잎 클릭 확인
      const distanceToPetalCenter = dist(mouseX, mouseY, flowerX, flowerY);
      if (distanceToPetalCenter < flowerSize / 2) {
        // 클릭된 꽃의 인덱스 저장
        clickedFlowerIndex = i * numFlowers + j;
        return; // 클릭된 꽃을 찾았으면 더 이상 검색하지 않도록 종료
      }
    }
  }

  // 아무 꽃도 클릭하지 않았을 때는 인덱스 초기화
  clickedFlowerIndex = -1;
}
