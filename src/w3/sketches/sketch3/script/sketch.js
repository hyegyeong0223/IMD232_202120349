//매프레임마다 무작위 방향으로 가속도를 생성한다 ㅇㅇ (가속도의 속력 길이가 2 넘지 않게)
//이 가속도를 속도에 더한다 ㅇㅇ
//그 속도를 위치에 더한다 ㅇㅇ
// 속도의 상한선을 둔다. ㅇㅇ (p5.Vector 의 레퍼런스의 limit() 참고)
// 원을 그린다ㅇㅇ
//이를 중심점으로 삼아 움직이게 한다dd
//원의 중심점에서 마우스로 향하는 벡터를 구한다
//이를 원을 중심점 삼아 시각화한다d
//(line(pos.x, pos.y, mouseX, mouseY) 와 같이 벡터를 산출해서 시각화하지 않은 경우는 인정x)

//가속도와 속도 벡터를 원을 중심점 삼아 시각화한다
//(원래의 크기로 시각화하면 너무 작아 보이지 않을 것이니, 가속도는 100배, 속도는 10배로 확대해 시각화)
//위치가 화면을 벗어나지 않도록 조정한다.
//( 좌측을 넘어서면 우측으로, 우측을 넘어서면 좌측으로, 아래를 넘어서면 위로, 위를 넘어서면 아래로 위치하도록 )
// -> step 1 코드

//(좌표로 사용된 벡터 A와 B에 대해 A에서 B로 향하는 벡터를 구하고, 시각화 -> 10번 예제)
// c벡터에 a벡터에서 b벡터를 뺀 결과를 assign하는 방식은 c = p5.Vector.sub(a, b)
// -> a벡터는 변하지 않은채 그 결과를 다른 벡터에 assign하는 방식 사용

// 공의 위치
let position;
// 공의 속력
let velocity;
let acceleration;
// 속도 상한선
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
  // 매 프레임 공의 위치에 공의 속도를 더해 이동
  position.add(velocity);

  // 공이 화면을 벗어나는지: 충돌하는지 확인
  // 속도에 -1을 곱해 뒤집는다.
  if (position.x > width || position.x < 0) {
    velocity.x *= -1;
  }
  if (position.y > height || position.y < 0) {
    velocity.y *= -1;
  }

  // 마우스 좌표 벡터
  let mouse = createVector(mouseX, mouseY);
  // 캔버스의 중심 좌표 벡터
  let center = createVector(width / 2, height / 2);

  // 위 두개의 벡터를 나타낸다
  strokeWeight(4);
  stroke(200);
  line(0, 0, mouse.x, mouse.y);

  // 마우스 좌표 벡터에서 캔버스 중심 좌표 벡터를 뺀다.
  mouse.sub(center);

  //

  // 위 결과를 원점을 캔버스 중심으로 옮겨 그린다.
  // 원점을 캔버스 중심: 마우스 좌표 벡터에 빼기 했던 벡터의 좌표로 옮기지 않고서야 화면에 제대로 나타낼 수 없다.
  push();
  stroke(0);
  translate(mouseX, mouseY);
  line(0, 0, mouse.x, mouse.y);
  pop();

  stroke(0);
  fill('black');
  strokeWeight(2);

  // 위치 변수를 나타낸다.
  circle(position.x, position.y, 30);

  //중심에 대한 마우스 벡터의 길이
  const m = mouse.mag();
  fill(0);
  line(0, 0, mouse.x, mouse.y);
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
