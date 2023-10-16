const stripeNum = 8;
const stripeNum2 = 8;
const stripeBegin = 15;
const stripeGap = 30;

let angle = 0;
let angleVel;
let angleAcc;

function setup() {
  setCanvasContainer('mySketchGoesHere', 1, 1, true);

  angleVel = 0;
  angleAcc = (TAU / 360) * 0.01;

  background(255);
}
function draw() {
  angleVel += angleAcc;
  angleVel = constrain(angleVel, -5, 5);
  angle += angleVel;

  background(255);

  noStroke();

  rectMode(CENTER);
  for (let a = 0; a < stripeNum; a++) {
    for (let b = 0; b < stripeNum2; b++) {
      fill((255 / stripeNum) * a, (255 / stripeNum2) * b, 255);
      let x = ((a + 1) * width) / (stripeNum + 1);
      let y = ((b + 1) * height) / (stripeNum2 + 1);
      if (a % 2 == 0) {
        let radius = 30; // 반지름 길이
        let endX = x + radius * cos(angle);
        let endY = y + radius * sin(angle);
        line(x, y, endX, endY);

        ellipse(x, y, 60);
      } else {
        ellipse(x, y, 60);
      }
    }
  }
  line(-100, 0, 100, 0);

  // for (let a = stripeBegin; a < width; a += 2 * stripeGap) {
  //   rect(a, 0, stripeGap, height);
  // }
}

// const stripeNum = 20;
// const stripeNum2 = 15;
// const stripeBegin = 15;
// const stripeGap = 30;

// function setup() {
//   setCanvasContainer('canvas', 3, 2, true);

//   background(255);
// }
// function draw() {
//   background(255);

//   noStroke();
//   // fill('salmon');
//   // for (let a = 0; a < stripeNum; a++) {
//   //   const rectWidth = width / (stripeNum + stripeNum + 1);
//   //   const rectX = (width / (stripeNum + stripeNum + 1)) * (2 * a + 1);
//   //   rect(rectX, 0, rectWidth, height);
//   // }
//   // for (let a = 0; a < stripeNum; a++) {
//   //   const rectHeight = height / (stripeNum + stripeNum + 1);
//   //   const rectY = (height / (stripeNum + stripeNum + 1)) * (2 * a + 1);
//   //   rect(0, rectY, width, rectHeight);
//   // }

//   rectMode(CENTER);
//   for (let a = 0; a < stripeNum; a++) {
//     for (let b = 0; b < stripeNum2; b++) {
//       fill((255 / stripeNum) * a, (255 / stripeNum2) * b, 255);
//       let x = ((a + 1) * width) / (stripeNum + 1);
//       let y = ((b + 1) * height) / (stripeNum2 + 1);
//       if (a % 2 == 0) {
//         ellipse(x, y, 10);
//       } else {
//         rect(x, y, 10);
//       }
//     }
//   }

//   // for (let a = stripeBegin; a < width; a += 2 * stripeGap) {
//   //   rect(a, 0, stripeGap, height);
//   // }
// }
