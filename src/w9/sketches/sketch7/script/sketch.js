const {
  //ok
  Engine,
  Render,
  Runner,
  Body,
  Composite,
  Composites,
  Constraint,
  MouseConstraint,
  Mouse,
  Bodies,
} = Matter;

// 엔진, 물체, 러너 생성 //ok
const matterEngine = Engine.create();
const matterRunner = Runner.create();
const matterShapes = [];

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  const vertices = [
    { x: 5.5 * 2, y: -4.8 * 2 },
    { x: 7.6 * 2, y: -1.6 * 2 },
    { x: 6.5 * 2, y: 1.8 * 2 },
    { x: 2.7 * 2, y: 4.5 * 2 },
    { x: -1.2 * 2, y: 4.2 * 2 },
    { x: -3.6 * 2, y: 1.9 * 2 },
    { x: -1.3 * 2, y: -2.8 * 2 },
  ];
  const matterShapes.push(
    new MatterShape(width / 2, 50, vertices, {
      velocity: { x: randomVector.x, y: randomVector.y },
      angularVelocity: random(-3, 3),
    })

  );
  

  background('white');
  Runner.run(matterRunner, matterEngine);

  // 엔진 생성
  engine = Engine.create();
  world = engine.world;

  // 러너 생성, 실행
  runner = Runner.create();
  Runner.run(runner, engine);

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

  // 다음 그룹을 위한 그룹 업데이트
  group = Body.nextGroup(true);

  // rope B 생성
  var ropeB = Composites.stack(350, 50, 10, 1, 10, 10, function (x, y) {
    return Bodies.circle(x, y, 20, {
      collisionFilter: { group: group },
      render: {
        fillStyle: '#ff0000',
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
}

function draw() {
  // 매 프레임 업데이트
  Engine.update(engine);

  // 캔버스 갱신
  // 여기에 추가적인 그림 그리기 코드를 작성할 수 있습니다.
}
