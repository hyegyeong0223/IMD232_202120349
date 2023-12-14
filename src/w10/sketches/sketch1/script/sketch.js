//https://www.youtube.com/watch?v=hBJJJWm2bUQ&t=249s

// 초기 레퍼런스
let container = document.querySelector('.container');
let gridButton = document.getElementById('submit-grid');
let clearGridButton = document.getElementById('clear-grid');
let gridWidth = document.getElementById('width-range');
let gridHeight = document.getElementById('height-range');

let colorButton = document.getElementById('color-input');

let eraseBtn = document.getElementById('erase-btn');
let paintBtn = document.getElementById('paint-btn');
let widthValue = document.getElementById('width-value');
let heightValue = document.getElementById('height-value');

// 이벤트 오브젝트
let events = {
  mouse: {
    down: 'mousedown',
    move: 'mousemove',
    up: 'mouseup',
  },
  touch: {
    down: 'touchstart',
    move: 'touchmove',
    up: 'touchend',
  },
};

let deviceType = '';

// 초기에는 draw와 erase가 모두 false여야 한다
let draw = false;
let erase = false;

// Touch 디바이스 여부 체크
const isTouchDevice = () => {
  try {
    document.createEvent('TouchEvent');
    deviceType = 'touch';
    return true;
  } catch (e) {
    deviceType = 'mouse';
    return false;
  }
};

isTouchDevice();

// 그리드 만들기
gridButton.addEventListener('click', () => {
  // 초기에 그리드를 지웁니다.
  container.innerHTML = '';
  // 고유한 ID를 생성하기 위한 count 변수
  let count = 0;
  // 행 생성을 위한 루프
  for (let i = 0; i < gridHeight.value; i++) {
    // count를 2씩 증가시킵니다.
    count += 2;
    let div = document.createElement('div');
    div.classList.add('gridRow');
    // 열 생성
    for (let j = 0; j < gridWidth.value; j++) {
      count += 2;
      let col = document.createElement('div');
      col.classList.add('gridCol');
      col.setAttribute('id', `gridCol${count}`);

      // 마우스 또는 터치 다운 이벤트
      col.addEventListener(events[deviceType].down, () => {
        draw = true;
        if (erase) {
          col.style.backgroundColor = 'transparent';
        } else {
          col.style.backgroundColor = colorButton.value;
        }
      });

      col.addEventListener(events[deviceType].move, (e) => {
        let elementId = document.elementFromPoint(
          !isTouchDevice() ? e.clientX : e.touches[0].clientX,
          !isTouchDevice() ? e.clientY : e.touches[0].clientY
        )[0].id;
        checker(elementId);
      });

      // stop drawing
      col.addEventListener(events[deviceType].up, () => {
        draw = false;
      });

      // 그리드에 열 추가
      div.appendChild(col);
    }
    // 그리드에 행 추가
    container.appendChild(div);
  }
});

function checker(elementId) {
  let gridColumns = document.querySelectorAll('.gridCol');
  gridColumns.forEach((element) => {
    if (elementId == element.id) {
      if (draw && !erase) {
        element.style.backgroundColor = colorButton.value;
      } else if (draw && erase) {
        element.style.backgroundColor = 'transparent';
      }
    }
  });
}

// clear Grid
clearGridButton.addEventListener('click', () => {
  container.innerHTML = '';
});

// Erase Button
eraseBtn.addEventListener('click', () => {
  erase = true;
});

// Paint button
paintBtn.addEventListener('click', () => {
  erase = false;
});

//display gird width and height
gridWidth.addEventListener('input', () => {
  widthValue.innerHTML =
    gridWidth.value < 9 ? '0$ {gridWidth.value}' : grideWidth.value;
});

gridHeight.addEventListener('input', () => {
  heightValue.innerHTML =
    girdHeight.value < 9 ? '0${grideHeight.value}' : girdHeight.value;
});

window.onload = () => {
  grideWidth.value = 0;
  gridHeight.value = 0;
};
