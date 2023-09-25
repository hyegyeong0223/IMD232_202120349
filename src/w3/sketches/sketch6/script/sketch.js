let position;
let velocity;
let acceleration;
let topSpeed = 2;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  // position = createVector(100, 100);
  position = createVector(random(width), random(height));
  // velocity = createVector(2.5, 2);
  velocity = createVector();
  acceleration = createVector();
  update;
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
  let position = createPosition(positonX, positionY);

  velocity.mult(10);
  acceleration.mult(100);

  mouse.sub(position);

  translate(position.x, position.y);
  strokeWeight(2);
  stroke(200);
  line(mouseX, mouseY, position.x, position.y);

  // pop();
  stroke(0);
  fill('black');

  // 위치 변수를 나타낸다.
  circle(position.x, position.y, 30);

  //중심에 대한 마우스 벡터의 길이
  const m = position.mag();
  fill(0);
  line(position.x, position.y, mouse.x, mouse.y);
}

function update() {
  acceleration = p5.Vector.random2D();
  acceleration.mult(random(2));
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
