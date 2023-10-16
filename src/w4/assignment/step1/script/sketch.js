class Body {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = 6;
    this.radius = random(20, 50);
    this.velocityVisualization = createVector(0, 0);
    this.accelerationVisualization = createVector(0, 0);
  }

  attract(body) {
    let force = p5.Vector.sub(this.position, body.position);
    let distance = constrain(force.mag(), 5, 25);
    let strength = (G * (this.mass * body.mass)) / distance ** 2;
    force.setMag(strength);
    return force;
  }

  applyForce(force) {
    let forceDividedByMass = p5.Vector.div(force, this.mass);
    this.acceleration.add(forceDividedByMass);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.velocityVisualization.set(this.velocity);
    this.velocityVisualization.mult(5);

    this.accelerationVisualization.set(this.acceleration);
    this.accelerationVisualization.mult(0);

    this.acceleration.set(0, 0);
  }

  display() {
    stroke('PINK');
    strokeWeight(2);
    fill(50, 50);
    circle(this.position.x, this.position.y, this.radius * 2);
    // circles.push({ x, y, radius });
  }
}
