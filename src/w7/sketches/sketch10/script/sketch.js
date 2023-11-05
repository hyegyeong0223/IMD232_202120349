let emitter;
let emitters = [];
let gravity = 0;
let rotationSpeed;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  colorMode(HSL, 360, 100, 100);

  emitter = new Emitter(width / 2, 20);

  // gravity = createVector(0, 0);

  background(255);
}

function draw() {
  emitter.addParticle();
  for (let i = 0; i < emitters.length; i++) {
    emitters[i].addParticle();
  }
  for (let i = 0; i < emitters.length; i++) {
    emitters.splice(i, 1);
  }

  background(255);
  emitter.update(gravity);
  emitter.display();
  for (let i = 0; i < emitters.length; i++) {
    emitters[i].update(gravity);
    emitters[i].display();
  }
  console.log(emitter.particles.length);
}
