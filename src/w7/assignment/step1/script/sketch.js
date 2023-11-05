let traffic; //vehicle 변수
let infiniteOffset = 80; //화면을 벗어날 때의 오프셋

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true); //3:2 비율로 캔버스 생성
  colorMode(HSL, 360, 100, 100, 100); //컬러 모드를 HSL로 설정
  background('white'); //배경색 흰색
  traffic = new Traffic(); //traffic 초기화
  for (let n = 0; n < 10; n++) {
    traffic.addVehicle(random(width), random(height)); //랜덤한 위치에 vehicle 생성 후 traffic 객체에 추가
  }
}

function draw() {
  background('white'); //배경색 흰색
  traffic.run(); //traffic에 속한 vehicle을 실행해 그리기
}

function mouseDragged() {
  traffic.addVehicle(mouseX, mouseY); //마우스가 드래그될 때마다 마우스 위치에 새로운 vehicle 추가
}
