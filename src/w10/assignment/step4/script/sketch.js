const wrongColors = ['#EA91FF', '#FF93DA', '#E815576', '#FF8A89', '#A7E7F6'];
const rightColor = '#04BF8A';
const tiles = [];
const rowNum = 8,
  colNum = 8;
let hoveredTile = null;
const rightTileIdx = [];

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
    // 맞는 타일을 클릭하면 새로운 페이지로 이동
    window.location.href = './script/luck.js';
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
