function setup() {
  setCanvasContainer('canvas', 3, 3, true);
  background('white');
  drawText();
}

function draw() {
  // background('white');  // 이 부분을 주석처리 또는 삭제
}

function drawText() {
  fill('black');
  textSize(14 * 2); // 텍스트 크기를 2배로 키움
  textAlign(LEFT, TOP);
  text(
    '●느ㅎ┣己ㄷ ㄱ┃부ㅈ으●┃■┣∧Hㄱ┃ㄱ┃\n┻己　　┳┳....　　 ┗┻┗ 己　┗　● ...... 己。。',
    10,
    10
  );
}
