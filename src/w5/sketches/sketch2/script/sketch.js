const cNum = 8;
const rNum = 8;
const circleSize = 40;
const margin = circleSize / 2;

let gridC;
let gridR;

let angleBegin = 0;
let angleBeginVel = 1;
let angleSte = radians(15);

function setup() {
  setCanvasContainer('mySketchGoesHere', 1, 1, true);
  angleStep = TWO_PI / cNum;

  // noLoop();

  colorMode(HSL, 360, 100, 100, 100);
  background(360, 0, 100);
  stroke('pink');
  strokeWeight(2);
}

function draw() {
  background(360, 0, 100);

  for (let r = 0; r < rNum; r++) {
    for (let c = 0; c < cNum; c++) {
      const x = c * 2 * circleSize + circleSize;
      const y = r * 2 * circleSize + circleSize;
      push();
      translate(x, y);
      fill(200, 80, 80);
      rotate(angleBegin);
      line(-circleSize, 0, circleSize, 0);
      ellipse(0, 0, circleSize * 2);
      pop();
    }
  }

  angleBegin += angleBeginVel;
}
