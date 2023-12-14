//꽃잎을 마우스로 움직이기!!

let x, y;
const rad = 50;
let isHover = false;
let isDragging = false;
let deltaX, deltaY;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  x = width / 2;
  y = height / 2;

  colorMode(HSL, 360, 100, 100, 100);
  background(0, 0, 100);
}

function draw() {
  background(0, 0, 100);
  display();
}

function chkHover(mX, mY) {
  const distSq = (x - mX) ** 2 + (y - mY) ** 2;
  return distSq <= rad ** 2;
}

function display() {
  noStroke();
  if (isHover) {
    fill(30, 80, 50);
  } else {
    fill(30, 60, 50);
  }

  // 꽃잎
  ellipse(x - 50, y - 50, 100, 100);
  ellipse(x + 50, y - 50, 100, 100);
  ellipse(x - 50, y + 50, 100, 100);
  ellipse(x + 50, y + 50, 100, 100);

  // 꽃잎 중앙
  fill(255, 255, 255);
  ellipse(x, y, 85, 85);
}

function mouseMoved() {
  isHover = chkHover(mouseX, mouseY);
}

function mousePressed() {
  if (isHover) {
    isDragging = true;
    deltaX = mouseX - x;
    deltaY = mouseY - y;
  }
}

function mouseDragged() {
  if (isDragging) {
    x = mouseX - deltaX;
    y = mouseY - deltaY;
  }
}

function mouseReleased() {
  isDragging = false;
}
