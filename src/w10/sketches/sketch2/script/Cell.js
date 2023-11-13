class Cell {
  constructor(x, y, w, h, state, idx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.state = state;
    this.idx = idx;
    this.friends = [];
  }

  addFriends(cellArray) {
    const idx = [
      this.idx - colNum - 1, //왼위
      this.idx - colNum, //중위
      this.idx - colNum + 1, //오위
      this.idx + 1, //오
      this.idx + colNum + 1, //오아
      this.idx + colNum, //중아
      this.idx + colNum - 1, //왼아
      this.idx - 1, //왼
    ];
    const mycol = this.i % colNum;
    const myRow = floor(this.idx / colNum);

    //왼쪽 귀퉁이
    if (myCol === 0) {
      idxList[0] = -1
      idxList[7] = -1
      idxList[6] = -1
    }
    //오른쪽 귀퉁이
    else if (myCol === colNum -1) {
      idxList[2] = -1
      idxList[3] = -1
      idxList[4] = -1
    
    }
    //위쪽 귀퉁이
    if (myRow === 0) {
      idxList[0] = -1
      idxList[1] = -1
      idxList[2] = -1

    //아래쪽 귀퉁이
    else if (myRow === colNum -1) {
      idxList[4] = -1
      idxList[5] = -1
      idxList[6] = -1
    
      }

    idxList.forEach((eachIdx) => {
      this.friends.push(cells[eachIdx]);
    
    })
    
  }

  calcNextState() { //다음에 내가 무슨 상태로 변할지 계산해보는 함수
    let cnt = 0
    this.friends.forEach (each/friend) => 
    
  }

  display() {
    push();
    translate(this.x, this.y);
    // if (this.state) {
    //   fill(32);
    // } else {
    //   fill(255);
    // }
    fill(this.state ? 32 : 255);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
