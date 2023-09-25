// 과제 STEP 1

// 매프레임마다 무작위 방향으로 가속도 생성 -> acc = p5.Vector.random2D();
// (무작위 가속도의 속력: 길이 2이하 추천) -> acc.limit(1);
// 가속도에 속도를 더한 후, 그 속도를 위치에 더해 -> -> acc.add(vel); pos.add(acc); ?
// 이를 중심점으로 삼아 움직이는 원을 그린다.
// (속도의 상한선을 둘  것. -> limit)
// (-> Velocity & Acceleration 5: 35)

// 원의 중심점으로부터 마우스로 향하는 벡터 산출후 시각화
// 가속도와 속도 벡터를 원을 중심점 삼아 시각화 (-> Magenitude Vector)
// (가속도:100배, 속도:10배 확대해야 보임)
// (c벡터에 'a벡터 - b벡터' assign하는 방식 사용)
//위치가 화면을 벗어나지 않도록 조정 -> infiniteEdge

//힌트
//원이 마우스로 향하는 벡터를 구하는 방법
// 벡터 섭트렉션 예제. 화면 중앙에서 마우스를 향하는 벡터를 구할 수 있음.
//반대로 원의 위치에서 마우스로 향하는 벡터를 구할 수 있고, 좀 줄여서. (그대로 더하면 안 됨.)
// 한번에 더하면 안 되고 일정 속도를 감쇄시켜서 가속도 값으로 매번 더하면 그 친구를 향해 가까워짐.

// 01. Magenitude Vector
// // -> 벡터가 가진 길이감을 수치로 보여주는 기능
// let cv;
// let mv;
// let cvToMv;

// function setup() {
//   setCanvasContainer('mySketchGoesHere', 3, 2, true);
//   background('pink');
//   cv = createVector(width / 2, height / 2);
//   mv = createVector();
//   cvToMv = createVector();
// }

// function draw() {
//   background('pink');

//   mv.set(mouseX, mouseY);
//   cvToMv = p5.Vector.sub(mv, cv);
//   let mag = cvToMv.mag();
//   console.log(mag);
//   noStroke();
//   fill('white');
//   rect(10, 10, mag, 10);

//   strokeWeight(2);
//   stroke('white');
//   translate(cv, x, cv, y);
//   Line(0, 0, cvToMv.x, cvToMv.y);
// }

// 02. Multiplying Vector ->
// 마우스로 향하는 힘을 주고 싶다 -> 그 힘에 해당하는 만큼을 특정한 좌표에 더한다

// 03. Velocity & Acceleration
let pos;
let vel;
let acc;
let radius = 20;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background('black');
  pos = createVector(width / 2, height / 2);
  vel = createVector(0, 0);
  acc = p5.Vector.random2D();
  acc.mult(0.1);
  console.log('pos', pos);
  console.log('vel', vel);
  console.log('acc', acc);

  console.log('velMag', vel.mag());
  console.log('accMag', acc.mag());

  ellipse(pos.x, pos.y, 50);

  // console.log(pos);
  // console.log(vel);
  // ellipse(pos.x, pos.y, 50);
}

function draw() {
  background('black');
  update();
  infiniteEdge();
  display();
  ellipse(pos.x, pos.y, 2 * radius);
}

function update() {
  acc = p5.Vector.random2D();
  // -> 무작위 가속도 생성
  acc.limit(0.5);
  // -> 무작위 가속도 2 이하로 리미트
  acc.add(vel);
  pos.add(acc);
  // -> 가속도에 속도를 더한 후, 그 속도를 위치에 더해

  acc.mult(0.5);
  vel.add(acc);
  pos.add(vel);
}

function infiniteEdge() {
  if (pos.x < 0) {
    pos.x = width;
  } else if (pos.x > width) {
    pos.x = 0;
  }
  if (pos.y < 0) {
    pos.y = height;
  } else if (pos.y > height) {
    pos.y = 0;
  }
}

function display() {
  fill('pink');
}
