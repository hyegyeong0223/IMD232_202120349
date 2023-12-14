let emitter;
let emitters = [];
let gravity = 0;
let particles;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);

  emitter = new Emitter();
  gravity = createVector(0, 0.1);

  background(255);
}

function draw() {
  emitter.addParticle();
  background(255);
  for (let i = 0; i < emitters.length; i++) {
    emitters[i].addParticle();
  }

  emitter.update(gravity);
  emitter.display();
  for (let i = 0; i < emitters.length; i++) {
    emitters[i].update(gravity);
    emitters[i].display();
  }
  console.log(emitter.particles.length);
}

function mousePressed() {
  const newEmitter = new Emitter(mouseX, mouseY);
  newEmitter.emitParticles = true;

  for (let i = 0; i < 360; i += 3) {
    newEmitter.addParticle(i);
  }
  while (newEmitter.particles.length < 60) {
    newEmitter.addParticle(random(360));
  }
  emitters.push(newEmitter);
}
