class Emitter {
  constructor() {
    this.emittingPos;
    this.balls = [];
  }

  createball() {
    this.balls.push(
      new Ball(this.emittingPos.x, this.emittingPos.y, random(1, 5)),
      random(360),
      100,
      50
    );
  }
}

update;

class Ball {
  constructor(posX, posY, mass, h, s, v) {
    this.pos = creatVector(posX, posY);
    this.vel = creatVector();
    this.acc = creatVector();
    this.mass = mass;
    this.rad = this.mass * 5;
    this.color = color(h, s, v);
  }

  applyForce(force) {
    const calcedAcc = p5.Vector.div(force, this.mass);
    // const calcedAcc = force.div(this.mass);
    this.acc.add(calcedAcc);
  }
  update() {
    this.vel.add(this.acc);
    // this.vel.limit(5);
    this.pos.add(this.vel);
    // this.acc.set(0,0);
    this.acc.mult(0); //0을 곱해서 0으로
    // this.acc.setMag(0) //벡터의 길이를 0으로
  }
  display() {
    fill(this.color);
    nostroke();
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
  }
}

let balls = []; //여러개 만들 때
let gravity;
let wind;

function setup() {
  setCanvasContainer('mySketchGoesHere', 2, 1, true);

  ColorMode(HSL, 360, 100, 100);
  for (let n = 0; n < 10; n++) {
    balls.push(new Ball(random(width), 0, random(1, 20), random(360), 100, 50));
  }

  gravity = createVector(0, 0.1);
  wind = createVector(0.5, 0);

  background(255);
}
function draw() {
  background(255);
  // balls.forEach(function(){}); 밑에 줄이랑 같은 뜻
  balls.forEach((each) => {
    const scaledG = p5.Vector.mult(gravity, each.mass);
    each.applyForce(scaled);
    each.applyForce(wind);
    each.update();
    each.display();
  });
}

function mousePressed() {
  for (let n = 0; n < balls.length; n++) {
    balls[n] = new Ball(random(width), 0, random(1, 20), random(360), 100, 50);
  }
}
