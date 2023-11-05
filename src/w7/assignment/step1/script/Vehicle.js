class Vehicle {
  constructor(x, y, mass, rad, speedMx, forceMx, color) {
    this.pos = createVector(x, y); //위치를 나타내는 벡터 (x, y)
    this.vel = p5.Vector.random2D(); //속도를 나타내는 벡터는 랜덤 방향
    this.acc = createVector(); //작용하는 힘을 나타내는 벡터
    this.mass = mass; //질량
    this.rad = rad; //반지름
    this.speedMx = speedMx; //최대속도
    this.forceMx = forceMx; //최대 작용하는 힘
    this.neighborhooodRad = 50; //다른 vehicle과 상호작용하는 거리는 50
    this.color = color; //vehicle의 색상
  }

  cohesion(others) {
    //주변과 응집
    let cnt = 0; //주변 vehicle의 수
    const steer = createVector(0, 0); //응집 방향 벡터
    others.forEach((each) => {
      if (each !== this) {
        //자신을 제외한 주변 vehicle만 고려한다면
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        if (distSq < this.neighborhooodRad ** 2) {
          //주변 vehicle의 반경 내에 있다면
          steer.add(each.pos); //위치를 합산해 응집 방향 벡터를 조정한다
          cnt++; //주변 vehicle의 수 증가
        }
      }
    });
    if (cnt > 0) {
      //주변에 vehicle이 있다면
      steer.div(cnt); //주변 vehicle의 평균 위치 계산
      steer.sub(this.pos); //자신의 위치에서 평균 위치로의 방향 벡터
      steer.setMag(this.speedMx); //응집 방향 벡터의 크기 조정
      steer.sub(this.vel); //현재 속도 벡터-방향 벡터. 원하는 속도 및 방향으로 조정
      steer.limit(this.forceMx); //응집 방향 벡터의 크기 제한
    }
    return steer; //최종 응집 방향 벡터 반환.
  }

  align(others) {
    //주변과의 정렬
    let cnt = 0; //주변 vehicle의 수
    const steer = createVector(0, 0); //정렬 방향 벡터
    others.forEach((each) => {
      if (each !== this) {
        //자신을 제외한 주변 vehicle만 고려할 때
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        if (distSq < this.neighborhooodRad ** 2) {
          //주변 vehicle 반경 내에 있다면
          steer.add(each.vel); //정렬 방향 벡터 속도 합산
          //   steer.add(p5.Vector.normalize(each.vel));
          cnt++; //주변 vehicle 수 증가
        }
      }
    });
    if (cnt > 0) {
      // 주변 vehicle이 있는 경우
      steer.div(cnt); //주변 vehicle의 평균 속도
      steer.setMag(this.speedMx); //정렬 방향 벡터의 크기 조정
      steer.sub(this.vel); //현재 속도 벡터와 정렬 방향 벡터의 차. 현재 속도 벡터와 vehicle이 원하는 속도 및 방향으로 조정
      steer.limit(this.forceMx); //정렬 방향 크기 제한
    }
    return steer; //최종 정렬 방향 벡터 변환
  }

  separate(others) {
    //주변과 분리. 주변과 충돌하지 않도록.
    let cnt = 0; //분리된 vehicle 수
    const steer = createVector(0, 0);
    others.forEach((each) => {
      // 자기 자신을 제외한 주변만 고려
      if (each !== this) {
        const dist = this.pos.dist(each.pos);
        if (dist > 0 && this.rad + each.rad > dist) {
          // 충돌하는 경우
          const distNormal = dist / (this.rad + each.rad);
          const towardMeVec = p5.Vector.sub(this.pos, each.pos);
          towardMeVec.setMag(1 / distNormal);
          steer.add(towardMeVec); // 분리 방향 벡터 조정
          cnt++; // 분리된 vehicle 수 증가
        }
      }
    });
    if (cnt > 0) {
      // 분리된 vehicle이 있는 경우
      steer.div(cnt); // 분리 방향 벡터 계산
      steer.setMag(this.speedMx); // 분리 방향 벡터의 크기 조정
      steer.sub(this.vel); // 현재 속도 벡터와 분리 방향 벡터의 차. 원하는 속도 및 방향으로 조정
      steer.limit(this.forceMx); // 분리 방향 벡터의 크기 제한
    }
    return steer; // 최종 분리 방향 벡터 반환
  }

  applyForce(force) {
    //주어진 힘을 적용하는 함수
    const forceDivedByMass = p5.Vector.div(force, this.mass);
    this.acc.add(forceDivedByMass); // 힘을 질량에 따라 가속도에 더함
  }

  update() {
    //상태를 업데이트하는 함수
    this.vel.add(this.acc); // 가속도를 속도에 더함
    this.vel.limit(this.speedMx); // 속도의 크기 제한
    this.pos.add(this.vel); // 위치를 업데이트
    this.acc.mult(0); // 가속도를 초기화
  }

  borderInfinite() {
    //화면의 경계를 넘어가지 않게 하는 함수
    if (this.pos.x < -infiniteOffset) {
      this.pos.x = width + infiniteOffset; // 좌측 경계를 벗어난 차량을 우측으로 이동
    } else if (this.pos.x > width + infiniteOffset) {
      this.pos.x = -infiniteOffset; // 우측 경계를 벗어난 차량을 좌측으로 이동
    }
    if (this.pos.y < -infiniteOffset) {
      this.pos.y = height + infiniteOffset; // 상단 경계를 벗어난 차량을 하단으로 이동
    } else if (this.pos.y > height + infiniteOffset) {
      this.pos.y = -infiniteOffset; // 하단 경계를 벗어난 차량을 상단으로 이동
    }
  }

  display() {
    //vehicle을 그리는 함수
    push();
    translate(this.pos.x, this.pos.y); //vehicle의 위치로 이동
    rotate(this.vel.heading()); // 속도의 방향으로 회전
    noStroke();
    fill(this.color); // 색상 설정
    beginShape(); // 다각형 그리기 시작
    vertex(this.rad, 0); // 다각형의 꼭지점
    vertex(this.rad * cos(radians(-135)), this.rad * sin(radians(-135))); // 다각형의 꼭지점
    vertex(0, 0); // 다각형의 중심
    vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135))); // 다각형의 꼭지점
    endShape(CLOSE); // 다각형 그리기 종료
    // noFill();
    // stroke(0, 0, 60);
    // ellipse(0, 0, 2 * this.rad);
    // stroke(0, 0, 80);
    // ellipse(0, 0, 2 * this.neighborhooodRad);
    pop(); // 그리기 상태를 이전 상태로 복원
  }
}
