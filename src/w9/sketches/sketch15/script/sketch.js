const {
  Engine,
  Render,
  Runner,
  Body,
  Composite,
  Composites,
  Constraint,
  MouseConstraint,
  Mouse,
  Vertices,
  Bodies,
} = Matter;
//------------------------------------------------------------

// 엔진 생성
var engine = Engine.create(),
  world = engine.world;

// 러너 만들고 실행하기
var runner = Runner.create();
Runner.run(runner, engine);

const matterShapes = [];
const oWidth = 600;
const oHeight = 600;

//draw에서 쓸 수 있게 변수 선언 여기서
var group;
var ropeA;
var ropeB;
var ropeC;
var mouse;
var mouseConstraint;
var pathA;
var vertices;
var arrow;
var vertices;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  arrow = Vertices.fromPath('40 0 40 20 100 20 100 80 40 80 40 100 0 50');
  rectMode(CENTER);

  // 바디 만들기
  // 변수 할당은 여기서
  group = Body.nextGroup(true);

  //A
  // pathA = [
  //   // { x: 0, y: 0 },
  //   // { x: 50, y: 0 },
  //   // { x: 50, y: 20 },
  //   // { x: 0, y: 20 },
  // ];

  ropeA = Composites.stack(100, 50, 8, 1, 10, 10, function (x, y) {
    // Vertices.fromPath('0 0 50 0 50 20 0 20');
    return Bodies.rectangle(x, y, 50, 20, {
      collisionFilter: { group: group },
    });
  });

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

  group = Body.nextGroup(true);
  //------------------------------------------------------------
  //B
  ropeB = Composites.stack(350, 50, 10, 1, 10, 10, function (x, y) {
    return Bodies.circle(x, y, 20, { collisionFilter: { group: group } });
  });

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

  group = Body.nextGroup(true);
  //------------------------------------------------------------
  //C
  ropeC = Composites.stack(600, 50, 10, 1, 10, 10, function (x, y) {
    vertices = Vertices.fromPath('0 0 50 0 50 20 0 20');
    return Bodies.fromVertices(x - 20, y, vertices, {
      collisionFilter: { group: group },
      chamfer: 5,
    });
  });

  Composites.chain(ropeC, 0.5, 1, -0.3, 0, { stiffness: 1, length: 0 });
  Composite.add(
    ropeC,
    Constraint.create({
      bodyB: ropeC.bodies[0],
      pointB: { x: -20, y: 0 },
      pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
      stiffness: 0.5,
    })
  );
  //------------------------------------------------------------
  //하...
  Composite.add(world, [
    ropeA,
    ropeB,
    ropeC,
    Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true }),
  ]);

  engine = Engine.create();
  world = engine.world;
  runner = Runner.create();

  // //------------------------------------------------------------
  // // Composite.add(world)
  // // 마우스
  // mouse = Mouse.create(canvas.elt);
  // mouse.pixelRatio = (pixelDensity() * width) / oWidth;
  // mouseConstraint = MouseConstraint.create(engine, {
  //   mouse: mouse,
  //   constraint: {
  //     stiffness: 0.2,
  //   },
  // });
  // Composite.add(world, mouseConstraint);

  mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = (pixelDensity() * width) / oWidth;
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
    },
  });
  Composite.add(world, mouseConstraint);

  background('white');
  Runner.run(runner, engine);
}

function draw() {
  mouse.pixelRatio = (pixelDensity() * width) / oWidth;
  background('white');

  //------------------------------------------------------------
  // ropeA 그리기
  fill('black');
  for (let i = 0; i < ropeA.bodies.length; i++) {
    let body = ropeA.bodies[i];
    let vertices = body.vertices;
    beginShape();
    for (let j = 0; j < vertices.length; j++) {
      vertex(vertices[j].x, vertices[j].y);
    }
    endShape(CLOSE);
  }

  //------------------------------------------------------------
  // ropeB 그리기
  fill('black');
  for (let i = 0; i < ropeB.bodies.length; i++) {
    let body = ropeB.bodies[i];
    if (body.circleRadius) {
      ellipse(body.position.x, body.position.y, body.circleRadius * 2);
    } else {
      let vertices = body.vertices;
      beginShape();
      for (let j = 0; j < vertices.length; j++) {
        vertex(vertices[j].x, vertices[j].y);
      }
      endShape(CLOSE);
    }
  }

  //------------------------------------------------------------
  // ropeC 그리기
  fill('black');

  for (let i = 0; i < ropeC.bodies.length; i++) {
    let body = ropeC.bodies[i];
    let vertices = body.vertices;
    beginShape();
    for (let j = 0; j < vertices.length; j++) {
      vertex(vertices[j].x, vertices[j].y);
    }
    endShape(CLOSE);
  }
}
