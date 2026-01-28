const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const SIZE = 10;
const CELL = 60;
const EMPTY = 0, PLAYER = 1, AI = -1;

let board, turn;

function init() {
  board = Array.from({length: SIZE}, () => Array(SIZE).fill(EMPTY));
  turn = PLAYER;
  draw();
}

function restart() {
  init();
}

function draw() {
  ctx.clearRect(0,0,600,600);
  for (let y=0;y<SIZE;y++) {
    for (let x=0;x<SIZE;x++) {
      ctx.strokeStyle = "#333";
      ctx.strokeRect(x*CELL, y*CELL, CELL, CELL);

      if (board[y][x] === PLAYER) {
        ctx.fillStyle = "#4af";
        ctx.fillRect(x*CELL+5, y*CELL+5, CELL-10, CELL-10);
      }
      if (board[y][x] === AI) {
        ctx.fillStyle = "#f44";
        ctx.fillRect(x*CELL+5, y*CELL+5, CELL-10, CELL-10);
      }
    }
  }
}

canvas.addEventListener("click", e => {
  if (turn !== PLAYER) return;

  let x = Math.floor(e.offsetX / CELL);
  let y = Math.floor(e.offsetY / CELL);
  if (board[y][x] !== EMPTY) return;

  board[y][x] = PLAYER;
  turn = AI;
  draw();

  setTimeout(() => {
    aiPlay();
    turn = PLAYER;
    draw();
  }, 300);
});

init();
