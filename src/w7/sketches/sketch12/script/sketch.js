let emitter;
let emitters = [];
let gravity = 0;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);

  emitter = new Emitter();
  gravity = createVector(0, 0.1);

  background(255);
}

function draw() {
  emitter.addParticle();
  for (let i = 0; i < emitters.length; i++) {
    emitters[i].addParticle();
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

function mousePressed() {
  const newEmitter = new Emitter(mouseX, mouseY);
  newEmitter.emitParticles = true;

  for (let i = 0; i < 360; i += 3) {
    newEmitter.addParticle(i);
  }
  while (newEmitter.particles.length < 100) {
    newEmitter.addParticle(random(360));
  }
  emitters.push(newEmitter);
}
