function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
}

function draw() {
  background(255);

  //꽃잎
  fill(0, 0, 0);
  ellipse(50, 50, 100, 100);
  ellipse(150, 50, 100, 100);
  ellipse(50, 150, 100, 100);
  ellipse(150, 150, 100, 100);

  //꽃잎 중앙
  fill(255, 255, 255);
  ellipse(100, 100, 85, 85);
}
