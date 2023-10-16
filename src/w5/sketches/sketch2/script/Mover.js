class Mover {
  constructor(x, y, radius) {
    // this.pos = createVector(x, y);
    // this.vel = createVector();
    // this.acc = createVector();
    // this.radius = random(20, 50);
    // this.accelerationRate = 0.001;
  }

  update() {
    // this.acc.add(this.acc.mult(this.accelerationRate));
    // this.vel.add(this.acc);
    // this.pos.add(this.vel);
  }
  display() {
    // push();
    // translate(this.pos.x, this.pos.y);
    rotate(frameCount * 0.1);
    ellipse(0, 0, 2 * this.radius);
    // line(0, 0, this.radius, 0);
    // line(0, 0, circleSize, 0);
    line(0, 0, 20, 0);
    pop();
  }
}

// let bodies = [];
// let numBodies = 50;

let movers = [];
let numMovers = 50;

// let G = 0.1;
// let showVector = false;

function setup() {
  setCanvasContainer('mySketchGoesHere', 1, 1, true);
  for (let i = 0; i < numMovers; i++) {
    movers.push(new Mover(random(width), random(height)));
  }
}

function draw() {
  background(255);
  ellipse(0, 0, 2 * this.radius);
  line(0, 0, 20, 0);

  // for (let i = 0; i < numMovers; i++) {
  //   movers[i].update();
  //   movers[i].display();
  // }
}
