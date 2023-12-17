const wrongColors = [
  '##F2526E',
  '#F17A97',
  '#F3BCC8',
  '#F2E307',
  '#F28705',
  '#1BB8FA',
  '#FF293B',
];
//진분홍, 중분홍, 연분홍, 노랑, 주황, 파랑, 빨강

const rightColor = '#00CC7E';
const tiles = [];
const rowNum = 8,
  colNum = 8;
let hoveredTile = null;
const rightTileIdx = [];
const numSets = 8; // 동그라미 세트의 수
const gap = 10; // 동그라미 세트 간의 간격

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  const w = width / colNum;
  const h = height / rowNum;
  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      const x = col * w;
      const y = row * h;
      const wrongColorsIdx = floor(random(wrongColors.length));
      tiles.push(new Tile(x, y, w, h, wrongColors[wrongColorsIdx]));
    }
  }
  for (let n = 0; n < 1; n++) {
    const rightTileIdx = floor(random(rowNum * colNum));
    tiles[rightTileIdx].col = rightColor;
    tiles[rightTileIdx].isRight = true;
  }

  background('black');
}

function draw() {
  background('black');

  chkHover();

  tiles.forEach((eachTile) => {
    eachTile.display(hoveredTile);
  });
}

function chkHover() {
  let nothingHovered = true;
  for (let idx = 0; idx < tiles.length; idx++) {
    if (tiles[idx].isHover(mouseX, mouseY)) {
      hoveredTile = tiles[idx];
      nothingHovered = false;
      break;
    }
  }
  if (nothingHovered) {
    hoveredTile = null;
  }
}

function mousePressed() {
  if (!hoveredTile) return;
  if (hoveredTile.isRight) {
    window.location.href = './script2/index.html';
    console.log('A');
  }
}

function windowResized() {
  if (!isCanvasFlexible) return;
  const canvasContainer = select(`#${canvasContainerId}`);
  if (canvasAspectRatio === 0) {
    resizeCanvas(canvasContainer.width, canvasContainer.height);
  } else {
    resizeCanvas(
      canvasContainer.width,
      (canvasContainer.width * 1) / canvasAspectRatio
    );
  }
  const w = width / colNum;
  const h = height / rowNum;
  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      const idx = colNum * row + col;
      const x = col * w;
      const y = row * h;
      tiles[idx].pos.x = x;
      tiles[idx].pos.y = y;
      tiles[idx].size.x = w;
      tiles[idx].size.y = h;
      tiles[idx].setValues();
    }
  }
}
