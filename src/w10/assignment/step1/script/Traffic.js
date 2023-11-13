class Traffic {
  constructor() {
    this.vehicles = []; // vehicle을 저장할 빈 배열을 생성
  }

  run() {
    this.vehicles.forEach((eachVehicle) => {
      const separate = eachVehicle.separate(this.vehicles); // 각 vehicle을 다른 vehicle과의 분리
      eachVehicle.applyForce(separate); // 계산된 분리 값을 vehicle에 적용
      const align = eachVehicle.align(this.vehicles); // 각 vehicle의 다른 vehicle들과의 정렬을 계산
      eachVehicle.applyForce(align); // 계산된 정렬 값을 vehicle에 적용
      const cohesion = eachVehicle.cohesion(this.vehicles); // 각 vehicle의 다른 vehicle들과의 응집을 계산
      eachVehicle.applyForce(cohesion); // 계산된 응집 값 적용
      eachVehicle.update(); // 상태를 업데이트
      eachVehicle.borderInfinite(); // 경계를 넘어가는 것을 제어
      eachVehicle.displaly(); // 화면에 표시
    });
  }

  addVehicle(x, y) {
    const mass = floor(random(1, 3)); // 질량을 무작위로 설정
    this.vehicles.push(
      new Vehicle(x, y, mass, mass * 12, 5, 0.1, color(random(360))) // 새롭게 생성하여 배열에 추가
    );
  }
}
