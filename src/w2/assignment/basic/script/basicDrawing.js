function setup() {
  setCanvasContainer('p5-canvas', 3, 2, true);
  background('white');
}

function draw() {
  background('#dda0dd');

  rectMode(CENTER);
  fill(255);
  colorMode(RGB);
  stroke(0);

  //desk
  fill('#ff69b4');
  rect(400, 300, 360, 20, 5);
  fill('#db7093');
  rect(400, 320, 320, 20, 5);
  rect(500, 410, 25, 210, 5);
  rect(300, 410, 25, 210, 5);
  fill('#ba55d3');
  rect(300, 520, 20, 15);
  rect(500, 520, 20, 15);

  //chair1
  rectMode(CORNER);
  rect(100, 400, 200, 20);
  rect(100, 250, 20, 150);
  rect(120, 520, 15, 10);
  rect(240, 520, 15, 10);
  fill('#c71585');
  rect(100, 420, 180, 10);
  rect(120, 420, 20, 100);
  rect(240, 420, 20, 100);

  //chair2
  rectMode(CORNER);
  fill('#8a2be2');
  rect(520, 400, 200, 20);
  rect(550, 520, 150, 10);

  fill('#8b008b');
  rect(525, 420, 160, 10);
  rect(550, 420, 150, 100);

  //window
  rectMode(CENTER);
  fill('#dc143c');
  square(150, 150, 150);
  square(300, 150, 150);
  fill('#8a2be2');
  square(150, 150, 140);
  square(300, 150, 140);

  //sky
  fill('#6b8e23');
  triangle(150, 150, 100, 220, 200, 220);
  triangle(300, 100, 250, 220, 350, 220);
  fill('#ffd700');
  ellipse(200, 130, 40, 40);

  //light
  rect(500, 50, 10, 120);
  fill('#ffa500');
  ellipse(500, 120, 50, 25);
  ellipse(500, 130, 25, 25);

  //picture
  square(730, 120, 40);
  square(700, 190, 60);
  square(800, 200, 100);
  fill('#8b008b');
  square(700, 190, 50);
  square(730, 120, 30);
  square(800, 200, 90);

  //carpet
  fill('#ba55d3');
  rect(500, 580, 1000, 100);
  fill('#8b008b');
  rect(500, 545, 1000, 5);

  //glass
  fill('#9acd32');
  rect(400, 270, 30, 40);
  rect(470, 270, 30, 40);
  rect(495, 270, 20, 25);
  fill('#ffa500');
  rect(400, 280, 20, 10);
  rect(470, 275, 20, 25);

  //bear
  fill('#ffa500');
  ellipse(640, 370, 90);
  ellipse(640, 320, 70);
  ellipse(610, 300, 30);
  ellipse(670, 300, 30);
  ellipse(610, 350, 25);
  ellipse(670, 350, 25);
  ellipse(610, 400, 30);
  ellipse(670, 400, 30);
  fill('#ff69b4');
  ellipse(640, 370, 50);
  fill('black');
  ellipse(630, 320, 6);
  ellipse(650, 320, 6);
}
