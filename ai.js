function cloneBoard(b) {
  return b.map(r => r.slice());
}

function evaluate(b) {
  let s = 0;
  for (let r of b)
    for (let c of r)
      s += c;
  return s;
}

function moves(b) {
  let m = [];
  for (let y=0;y<SIZE;y++)
    for (let x=0;x<SIZE;x++)
      if (b[y][x] === EMPTY)
        m.push({x,y});
  return m;
}

function aiPlay() {
  let best = -Infinity;
  let bestMove = null;

  for (let m of moves(board)) {
    let b1 = cloneBoard(board);
    b1[m.y][m.x] = AI;

    let worst = Infinity;
    for (let p of moves(b1)) {
      let b2 = cloneBoard(b1);
      b2[p.y][p.x] = PLAYER;
      worst = Math.min(worst, evaluate(b2));
    }

    if (worst > best) {
      best = worst;
      bestMove = m;
    }
  }

  if (bestMove)
    board[bestMove.y][bestMove.x] = AI;
}
