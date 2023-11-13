// matter.js 라이브러리 변수 정의
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Constraint = Matter.Constraint,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Bodies = Matter.Bodies;

// 엔진 및 월드 생성
var engine = Engine.create(),
  world = engine.world;

// 러너 생성, 실행
var runner = Runner.create();
Runner.run(runner, engine);

// 렌더러 생성
const elem = document.querySelector('#canvas'); //캔버스 element 찾기
var render = Render.create({
  element: elem, //나 어디에 그릴까용
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
var group = Body.nextGroup(true);

// rope A 생성
var ropeA = Composites.stack(100, 50, 8, 1, 10, 10, function (x, y) {
  return Bodies.rectangle(x, y, 50, 20, {
    collisionFilter: { group: group },
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
var ropeB = Composites.stack(350, 50, 10, 1, 10, 10, function (x, y) {
  return Bodies.circle(x, y, 20, {
    collisionFilter: { group: group },
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
var ropeC = Composites.stack(600, 50, 13, 1, 10, 10, function (x, y) {
  return Bodies.rectangle(x - 20, y, 50, 20, {
    collisionFilter: { group: group },
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

// 마우스 컨트롤 추가
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

Composite.add(world, mouseConstraint);

// 마우스와 렌더링을 동기화
render.mouse = mouse;

// 렌더뷰포트를 씬에 맞춤
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 700, y: 600 },
});
