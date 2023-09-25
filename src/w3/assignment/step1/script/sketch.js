let position;
let velocity;
let acceleration;
let topSpeed = 2;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  position = createVector(random(width), random(height));
  velocity = createVector();
  acceleration = createVector();
}

function draw() {
  background(255);
  update();
  checkEdges();
  show();
  position.add(velocity);

  if (position.x > width || position.x < 0) {
    velocity.x *= -1;
  }
  if (position.y > height || position.y < 0) {
    velocity.y *= -1;
  }

  let mouse = createVector(mouseX, mouseY);
  let center = createVector(width / 2, height / 2);

  strokeWeight(4);
  stroke(200);
  line(mouseX, mouseY, position.x, position.y);

  mouse.sub(position);

  push();
  stroke(0);
  translate(mouseX, mouseY);
  pop();

  stroke(0);
  fill('black');
  strokeWeight(1);

  circle(position.x, position.y, 30);

  //에 대한 포지션 벡터의 길이
  const m = position.mag();
  fill(0);
  // line(position.x, position.y, mouse.x, mouse.y);
  line(mouse.x, mouse.y, position.x, position.y);
}

function update() {
  acceleration = p5.Vector.random2D();
  // acceleration.mult(random(2));
  velocity.add(acceleration);
  velocity.limit(topSpeed);
  position.add(velocity);
}
function show() {}

function checkEdges() {
  if (position.x > width) {
    position.x = 0;
  } else if (position.x < 0) {
    position.x = width;
  }

  if (position.y > height) {
    position.y = 0;
  } else if (position.y < 0) {
    position.y = height;
  }
}
