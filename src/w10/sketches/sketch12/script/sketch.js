//꽃 배열 배경!!

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
  background(0, 0, 100);
}

function draw() {
  background(0, 0, 100);
  displayFlowers();
}

function chkHover(mX, mY) {
  const distSq = (x - mX) ** 2 + (y - mY) ** 2;
  return distSq <= rad ** 2;
}

function displayFlowers() {
  const numFlowers = 10;
  const flowerSpacing = width / numFlowers; // 간격 계산

  for (let i = 0; i < numFlowers; i++) {
    for (let j = 0; j < numFlowers; j++) {
      const flowerX = i * flowerSpacing + flowerSpacing / 2;
      const flowerY = j * flowerSpacing + flowerSpacing / 2;

      noStroke();
      isHover = chkHover(flowerX, flowerY);

      if (isHover) {
        fill(320, 90, 70);
      } else {
        fill(0, 0, 0);
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

function mouseMoved() {
  // 이 함수는 더 이상 필요하지 않을 수 있습니다.
}
