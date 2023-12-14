function setup() {
  setCanvasContainer('canvas', 3, 3, true);
  background('white');
  drawText();
}

function drawText() {
  fill('black');
  textSize(14 * 2);
  textAlign(LEFT, TOP);
  text(
    '●느ㅎ┣己ㄷ ㄱ┃부ㅈ으●┃■┣∧Hㄱ┃ㄱ┃\n┻己　　┳┳....　　 ┗┻┗ 己　┗　● ...... 己。。',
    10,
    10
  );
}
