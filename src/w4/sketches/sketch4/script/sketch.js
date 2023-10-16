let moverA;
let gravity;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background(255);
  moverA = new Mover(width / 2, height / 2, 10);
  gravity = createVector(0, 0.1);
}

function draw() {
  background(255);

  let gravityA = createVector(gravity.x, gravity.y);
  gravityA.mult(moverA.mass);
  moverA.applyForce(gravityA);
  if (mouseIsPressed && isMouseInsideCanvas()) {
    moverA.applyForce(wind);
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
  moverA.display();
  moverA.displayVectors();
}
