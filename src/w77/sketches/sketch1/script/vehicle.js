class Vehicle {
  constructor(x, y, rad, speedMx, color) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = 1;
    this.rad = rad;
    this.speedMx = speedMx;
    this.foreeMx = forceMx;
    this.color=color;
  }
}

seek(target){
    // target.sub(this.pos);
    let desired = p5.Vector.sub(target, this.pos);
    // desired.normalize();
    // desired.mult(this.spedMx);
    desired.setMag(this.speedMx);
    let steering = p5.Vector.sub(desired, this.vel);
    if(debug) {
        push();
        translate(this.pos.x, this.pos.y);
        noFill();
        stroke(127);
        Line(0,0, desired.x*10, desired.y*10);
        pop();
    }
    steering.limit(this.forceMx);
    this. applyForce(steering);
;
}

applyForce(force){
    // force.div(this.mass);
    let calcedAcc = p5.Vector.div(force,this.mass);
    this.acc. add(calcedAcc);
}

update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
}

display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(this.color);
    beginShape();
    vertex(this.rad, 0);
    vertex(this.rad*cos(radians(-135)), this.rad*sin(radians(-135)))
    vertex(0, 0);
    vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135)));
    endShape(CLOSE);
    pop();
    
}