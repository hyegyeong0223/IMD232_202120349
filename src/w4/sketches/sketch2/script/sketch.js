let moverA;
let moverB;
let gravity;
let wind;
let isDragging = false;
let offsetX, offsetY;
let dragForce;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);

  background(255);
  moverA = new Mover(width / 2, height / 2, 10);
  gravity = createVector(0, 0.5);
  wind = createVector(0.2, 0);
  offsetX = 0;
  offsetY = 0;
}

function draw() {
  background(255);

  let gravityA = createVector(gravity.x, gravity.y);
  gravityA.mult(moverA.mass);
  moverA.applyForce(gravityA);

  if (isDragging) {
    let dragForce = createVector(mouseX - moverA.pos.x, mouseY - moverA.pos.y);
    moverA.applyForce(dragForce);
  }

  if (moverA.contactEdge()) {
    let c = 0.01;
    let friction = moverA.vel.copy();
    friction.mult(-1);
    friction.mult(c);
    moverA.applyForce(friction);
  }
  moverA.update();
  moverA.checkEdges();
  // moverA.contactEdge();
  moverA.display();
  moverA.displayVectors();
}

function startDragging() {
  // 만약 마우스가 공 안에 있다면 드래그 시작
  let d = dist(mouseX, mouseY, moverA.pos.x, moverA.pos.y);
  if (d < moverA.radius) {
    isDragging = true;
    offsetX = mouseX - moverA.pos.x;
    offsetY = mouseY - moverA.pos.y;
  }
}
// 마우스 드래그 종료
function stopDragging() {
  isDragging = false;
}
