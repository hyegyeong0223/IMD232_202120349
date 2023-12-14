class Particle {
  constructor(x, y, h, s, v) {
    this.pos = createVector(random(width), -20);
    this.rotationSpeed = random(0, 0.3);
    this.rotationAngle = 0;
    this.vel = createVector(0, 3);
    this.vel.rotate;
    this.acc = createVector(0, 0);
    this.rad = 8;
    this.color = color(h, s, v);
    this.lifeSpan = 650;
  }

  applyForce(force) {
    this.acc.set(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.lifeSpan -= 2;
    this.acc.mult(0);
    this.rotationAngle += this.rotationSpeed;
  }

  display() {
    push();

    translate(this.pos.x, this.pos.y);
    rotate(this.rotationAngle);
    stroke(0);
    fill(0);
    square(0, 0, this.rad * 2);

    pop();
  }

  isDead() {
    return this.lifeSpan < 0;
  }
}
