let dom;
let htmlDom;
let canvasW = 600;
let canvasH = 400;

function setup() {
  let dom = select('#hereGoesMyP5Sketch');
  //   console.log('p5 select', dom);
  //   console.log('p5 select', dom.width);

  htmlDom = document.querySelector('#hereGoesMyP5Sketch');
  //   console.log('querySelectort', htmldom.width);
  //   console.log('querySelector', htmldom.clientWidth);

  let canvas = createCanvas(600, 400);
  canvas.parent(dom);
  background('black');

  //   setCanvasContainer('id', w, h, true);
}

function draw() {}

function windowResized() {
  console.log('리자이즈됩니다.');
  //   dom = select('#hereGoesMyP5Sketch');
  //   console.log(dom);
  if (htmlDom.clientWidth < canvasW) {
    resizeCanvas(
      htmldom.clientWidth,
      (htmlDom.clientWidth * canvasH) / canvasW
    );
  } else if (width !== canvasW) {
    console.log('리사이즈됩니다.');
    resizeCanvas(canvasW, canvasH);
    background('black');
  }

  //   console.log('너무 작아서 잘림.');
}
