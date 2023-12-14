// sketch.js

// Pixel Display 인스턴스 생성
var pixelDisplay;

function setup() {
  // p5.js의 setup 함수: 초기화
  createCanvas(400, 400); // 화면 크기 설정
  pixelDisplay = new Display('#display'); // Pixel Display 인스턴스 생성
}

function draw() {
  // p5.js의 draw 함수: 반복적으로 호출되는 함수
  background(255); // 화면을 흰색으로 지움
  // 여기에 원하는 그림 그리기 등을 추가할 수 있음

  // Pixel Display의 renderArray 함수 호출
  var myData = [
    1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
  ];
  pixelDisplay.renderArray(myData);
}

function Display(canvasSelector = '#display') {
  this.canvasSelector = canvasSelector;
  this.c = document.querySelector(this.canvasSelector);
  this.pixelHeight = 10;
  this.pixelWidth = 10;
  this.backColor = '#FFF';
  this.foreColor = '#000';

  if (this.c.dataset.backgroundColor != undefined)
    this.backColor = this.c.dataset.backgroundColor;
  if (this.c.dataset.foregroundColor != undefined)
    this.foreColor = this.c.dataset.foregroundColor;

  if (
    this.c.attributes.getNamedItem('width') == undefined ||
    this.c.attributes.getNamedItem('height') == undefined
  ) {
    throw new Error('Must set height and width on canvas element (in html).');
  }
  if (
    this.c.dataset.density == undefined &&
    this.c.dataset.pixelHeight == undefined &&
    this.c.dataset.pixelWidth == undefined
  ) {
    throw new Error(
      "Must set 'data-density', or 'data-pixel-height' and 'data-pixel-width' on canvas element."
    );
  }
  if (this.c.dataset.density == undefined) {
    this.pixelHeight = this.c.dataset.pixelHeight;
    this.pixelWidth = this.c.dataset.pixelWidth;
  } else {
    this.pixelHeight = this.c.height / this.c.dataset.density;
    this.pixelWidth = this.c.width / this.c.dataset.density;
  }
  this.cx = this.c.getContext('2d');
}

Display.prototype.renderArray = function (array) {
  var height = this.c.height / this.pixelHeight;
  var width = this.c.width / this.pixelWidth;

  if (array.length != height * width) {
    throw new Error(
      'Trying to render array with a different amount of pixels from the canvas. Array must be ' +
        height +
        ' by ' +
        width +
        '.'
    );
  }

  var k = 0;
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      if (array[k] == 1) {
        this.cx.fillStyle = this.foreColor;
      } else {
        this.cx.fillStyle = this.backColor;
      }
      this.cx.fillRect(
        j * this.pixelWidth,
        i * this.pixelHeight,
        this.pixelWidth,
        this.pixelHeight
      );
      k++;
    }
  }
};

// 나머지 코드는 동일...

Display.prototype.clear = function () {
  this.cx.clearRect(0, 0, this.c.width, this.c.height);
};

function Animation(display, frames, delay = 500) {
  if (!display instanceof Display) {
    throw new Error('Display must be a valid Display object.');
  }
  this.display = display;
  this.frames = frames;
  this.delay = delay;
  this.running = false;
}

Animation.prototype.start = function () {
  this.running = true;
  var i = 0;
  this.intervalId = window.setInterval(
    function (self) {
      self.display.renderArray(self.frames[i]);
      i++;
      if (self.frames.length == i) {
        i = 0;
      }
    },
    this.delay,
    this
  );
};

Animation.prototype.stop = function () {
  window.clearInterval(this.intervalId);
  this.running = false;
};
