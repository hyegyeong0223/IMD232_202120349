class Particle {
  constructor(x, y, h, s, v) {
    this.pos = createVector(random(width), -30);

    let rotationSpeed = random(-0.1, 0.1);

    this.vel = createVector(1, 0);
    this.vel.rotate((TAU / 360) * random(-150, -30));
    this.acc = createVector(0, 0);
    this.rad = 8;
    this.color = color(h, s, v);
    this.lifeSpan = 512;
  }

  applyForce(force) {
    this.acc.set(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifeSpan -= 2;
  }

  display() {
    stroke(0, this.lifeSpan);
    fill(this.color, this.lifeSpan);
    square(this.pos.x, this.pos.y, this.rad * 2);
  }

  isDead() {
    return this.lifeSpan < 0;
  }
}
