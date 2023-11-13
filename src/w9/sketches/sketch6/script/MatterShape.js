class MatterShape {
  constructor(x, y, vertices, options) {
    this.body = Bodies.fromVertices(x, y, vertices, options);
    Composite.add(matterEngine.world, this.body);
    // console.log(this.body);
  }
  display() {
    beginShape();
    this.body.vertices.forEach((each) => {
      vertex(each.x, each.y);
    });
    endShape(CLOSE);
  }
}
