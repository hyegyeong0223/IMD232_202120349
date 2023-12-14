let isDrawing = true; // Assuming isDrawing should be initially true
let size = 3; // Initial size value

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  divideContainer(size);
  background(255);
}

function draw() {
  // Add any drawing-related logic here if needed
}

// container를 넘어가면 drawing 취소하기
window.addEventListener('mousemove', (e) => {
  if (e.target.className == 'pixel' || e.target.className == 'container') {
    return;
  } else {
    isDrawing = false;
  }
});

// reset button click event
resetBtn.addEventListener('click', () => {
  resetContainer();
  divideContainer(size);
});

// reset container event
function resetContainer() {
  container.innerHTML = '';
}

// input size change event
sizeEl.addEventListener('change', (e) => {
  if (e.target.value < 1) {
    sizeEl.value = 1;
    alert('1 ~ 60까지 입력 가능합니다.');
    setPixelSize(1);
  } else if (e.target.value > 60) {
    sizeEl.value = 60;
    alert('1 ~ 60까지 입력 가능합니다.');
    setPixelSize(60);
  } else {
    size = e.target.value;
    setPixelSize(size);
  }
});

// div pixel 만들기
function divideContainer(s) {
  container.style.setProperty('--size', s);
  for (let i = 0; i < s * s; i++) {
    const div = document.createElement('div');
    div.classList.add('pixel');
    container.appendChild(div);
    div.addEventListener('mouseover', () => {
      if (isDrawing) {
        div.style.backgroundColor = color.value;
      }
    });
    div.addEventListener('mousedown', () => {
      div.style.backgroundColor = color.value;
    });
  }
}

async function getColorData() {
  const response = await fetch('data/colors.json');
  const json = await response.json();
  return json.colors;
}

getColorData()
  .then((items) => {
    const colors = document.querySelector('.colors');
    colors.innerHTML = items
      .map((items) => {
        return `<div class="color-chips" style="background-color:${items.color}" data-color="${items.color}"></div>`;
      })
      .join('');
    colors.addEventListener('click', (e) => {
      const targetColor = e.target.dataset.color;
      color.value = targetColor;
    });
  })
  .catch(console.log);
