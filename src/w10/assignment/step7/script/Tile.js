class Tile {
  constructor(x, y, w, h, col) {
    this.pos = { x: x, y: y };
    this.size = { x: w, y: h };
    this.center = {
      x: this.pos.x + this.size.x * 0.5,
      y: this.pos.y + this.size.y * 0.5,
    };
    this.col = col;
    this.rad = min((this.size.x / 2) * 0.5, (this.size.y / 2) * 0.5);
    this.isRight = false;
  }

  setValues() {
    this.center = {
      x: this.pos.x + this.size.x * 0.5,
      y: this.pos.y + this.size.y * 0.5,
    };
    this.rad = min((this.size.x / 2) * 0.5, (this.size.y / 2) * 0.5);
  }

  isHover(x, y) {
    const distSq = (this.center.x - x) ** 2 + (this.center.y - y) ** 2;
    const distSqLT =
      (this.center.x - this.size.x * 0.5 * 0.5 - x) ** 2 +
      (this.center.y - this.size.y * 0.5 * 0.5 - y) ** 2;
    const distSqRT =
      (this.center.x + this.size.x * 0.5 * 0.5 - x) ** 2 +
      (this.center.y - this.size.y * 0.5 * 0.5 - y) ** 2;
    const distSqRB =
      (this.center.x + this.size.x * 0.5 * 0.5 - x) ** 2 +
      (this.center.y + this.size.y * 0.5 * 0.5 - y) ** 2;
    const distSqLB =
      (this.center.x - this.size.x * 0.5 * 0.5 - x) ** 2 +
      (this.center.y + this.size.y * 0.5 * 0.5 - y) ** 2;

    return (
      distSq < this.rad ** 2 ||
      distSqLT < this.rad ** 2 ||
      distSqRT < this.rad ** 2 ||
      distSqRB < this.rad ** 2 ||
      distSqLB < this.rad ** 2
    );
  }

  display(hoveredTile) {
    stroke('white');
    if (hoveredTile === this) {
      fill(this.col);
    } else {
      noFill();
    }

    // 왼쪽 위쪽 동그라미 그리기
    ellipse(
      this.center.x - this.size.x * 0.5 * 0.5,
      this.center.y - this.size.y * 0.5 * 0.5,
      2 * this.rad
    );

    // 오른쪽 위쪽 동그라미 그리기
    ellipse(
      this.center.x + this.size.x * 0.5 * 0.5,
      this.center.y - this.size.y * 0.5 * 0.5,
      2 * this.rad
    );

    // 오른쪽 아래쪽 동그라미 그리기
    ellipse(
      this.center.x + this.size.x * 0.5 * 0.5,
      this.center.y + this.size.y * 0.5 * 0.5,
      2 * this.rad
    );

    // 왼쪽 아래쪽 동그라미 그리기
    ellipse(
      this.center.x - this.size.x * 0.5 * 0.5,
      this.center.y + this.size.y * 0.5 * 0.5,
      2 * this.rad
    );
    // 중앙 동그라미 그리기
    fill('#E6FFEC');
    ellipse(this.center.x, this.center.y, 1.3 * this.rad);
  }
}
