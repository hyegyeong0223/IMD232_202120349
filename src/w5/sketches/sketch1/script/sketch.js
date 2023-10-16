const cNum = 8;
const rNum = 8;
const circleSize = 40;
const margin = circleSize / 2; // 좌우 마진 크기

let gridC;
let gridR;

let angleBegin = 0;
let angleBeginVel;
let angleStep;

function setup() {
  setCanvasContainer('mySketchGoesHere', 1, 1, true);
  angleStep = TWO_PI / cNum; // 각 원 간의 각도 차 설정
  noLoop(); // draw 함수가 한 번만 호출되도록 설정

  colorMode(HSL, 360, 100, 100, 100);
  background(360, 0, 100);
}

function draw() {
  background(360, 0, 100);

  for (let r = 0; r < rNum; r++) {
    for (let c = 0; c < cNum; c++) {
      const x = c * 2 * circleSize + circleSize; // x 좌표 계산
      const y = r * 2 * circleSize + circleSize; // y 좌표 계산

      push();
      translate(x, y);
      fill(200, 80, 80); // 원의 색상 설정 (HSL 색상 공간 사용)
      ellipse(0, 0, circleSize * 2); // 원 그리기
      rotate();
      pop();
    }
  }

  angleBegin += angleBeginVel;
}
