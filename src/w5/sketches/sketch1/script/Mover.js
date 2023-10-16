class Mover {
  constructor(x, y, radius) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.radius = random(20, 50);
    this.accelerationRate = 0.001;
  }

  update() {
    this.acc.add(this.acc.mult(this.accelerationRate));
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
  display() {
    ellipse(this.pos.x, this.pos.y, 2 * this.radius);
  }
}

let bodies = [];
let numBodies = 50;
let G = 0.1;
let showVector = false;

function setup() {
  setCanvasContainer('mySketchGoesHere', 1, 1, true);
  reset();
}

function draw() {
  background(255);

  for (let i = 0; i < numBodies; i++) {
    for (let j = 0; j < numBodies; j++) {
      if (i !== j) {
        let forceForJ = bodies[i].attract(bodies[j]);
        bodies[j].applyForce(forceForJ);
      }
    }
    bodies[i].update();
    bodies[i].display();
    if (showVector) {
      bodies[i].displayVectors();
    }
  }
}
A;

function mousePressed() {
  if (isMouseInsideCanvas()) {
    reset();
  }
}

function reset() {
  for (let i = 0; i < numBodies; i++) {
    let randomMass = random(16, 100);
    bodies[i] = new Body(random(width), random(height), randomMass);
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    showVector = !showVector;
  }
}
