// 1. 엔진만들기
// 2. 물체만들기
// 3. 물제를 엔진에 추가
// 4. 러너만들기
// 5. 러너에 엔진 등록해서 뺑뺑이

const {
  Engine,
  Bodies,
  Render,
  Runner,
  Body,
  Composite,
  Composites,
  Constraint,
  Mouse,
  MouseConstraint,
} = Matter;

// 다각형을 분해
Common.setDecomp(decomp);

// 엔진 및 월드 생성
const matterengine = Engine.create(),
  world = engine.world;

// 러너 생성, 실행
const matterrunner = Runner.create();

//도형
const matterxc = [];
const matterRopeB = [];
const matterRopeC = [];

let m;
let mc;

// 넓이 높이
// const oWidth = 800;
// const oHeight = 600;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  matterRopeB.push(new matterRopeB());

  mouse = Mouse.create();
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });
  Composite.add(world, mouseConstraint);

  createCanvas(800, 600);
  background('white');
}

function draw() {
  // mouse.pixelRatio = (pixelDensity() * width) / oWidth;
  background('white');

  stroke(0);
  noFill();

  // 렌더러 생성

  const elem = document.querySelector('#canvas');
  var render = Render.create({
    element: elem,
    engine: engine,
    options: {
      width: 800,
      height: 600,
      showAngleIndicator: true,
      showCollisions: true,
      showVelocity: true,
    },
  });

  Render.run(render);

  // 바디 추가를 위한 그룹 생성
  let group = Body.nextGroup(true);

  // rope A 생성
  const ropeA = Composites.stack(100, 50, 8, 1, 10, 10, function (x, y) {
    return Bodies.rectangle(x, y, 50, 20, {
      collisionFilter: { group },
    });
  });

  // rope A에 연결된 바디들을 체인으로 묶기
  Composites.chain(ropeA, 0.5, 0, -0.5, 0, {
    stiffness: 0.8,
    length: 2,
    render: { type: 'line' },
  });
  Composite.add(
    ropeA,
    Constraint.create({
      bodyB: ropeA.bodies[0],
      pointB: { x: -25, y: 0 },
      pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  // 다음 그룹을 위한 그룹 업데이트
  group = Body.nextGroup(true);

  // rope B 생성
  const ropeB = Composites.stack(350, 50, 10, 1, 10, 10, function (x, y) {
    return Bodies.circle(x, y, 20, {
      collisionFilter: { group },
      render: {
        filleStyle: '#ff0000',
      },
    });
  });

  // ropeB에 연결된 바디들을 체인으로 묶기
  Composites.chain(ropeB, 0.5, 0, -0.5, 0, {
    stiffness: 0.8,
    length: 2,
    render: { type: 'line' },
  });
  Composite.add(
    ropeB,
    Constraint.create({
      bodyB: ropeB.bodies[0],
      pointB: { x: -20, y: 0 },
      pointA: { x: ropeB.bodies[0].position.x, y: ropeB.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  // 다음 그룹을 위한 그룹 업데이트
  group = Body.nextGroup(true);

  // ropeC 생성
  const ropeC = Composites.stack(600, 50, 13, 1, 10, 10, function (x, y) {
    return Bodies.rectangle(x - 20, y, 50, 20, {
      collisionFilter: { group },
      chamfer: 5,
    });
  });

  // ropeC에 연결된 바디들을 체인으로 묶기
  Composites.chain(ropeC, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });
  Composite.add(
    ropeC,
    Constraint.create({
      bodyB: ropeC.bodies[0],
      pointB: { x: -20, y: 0 },
      pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  // 월드에 바디들 추가
  Composite.add(world, [
    ropeA,
    ropeB,
    ropeC,
    Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true }),
  ]);

  // 마우스와 렌더링을 동기화
  render.mouse = mouse;

  // 렌더뷰포트를 씬에 맞춤
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 700, y: 600 },
  });
}
