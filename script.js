const container = document.querySelector('.content');
const restartBtn = document.querySelector('.button');
const LOCAL_KEY_X = 'player X';
const LOCAL_KEY_O = 'player O';
const LOCAL_KEY_PLAYER = 'current player';
let markUp = '';
let player = localStorage.getItem(LOCAL_KEY_PLAYER) || 'X';
let x = JSON.parse(localStorage.getItem(LOCAL_KEY_X)) || [];
let o = JSON.parse(localStorage.getItem(LOCAL_KEY_O)) || [];

console.log('x', x);

for (let i = 1; i <= 9; i += 1) {
  markUp += `<div class="item" data-id="${i}"></div>`;
}
container.insertAdjacentHTML('beforeend', markUp);
container.addEventListener('click', onClick);
restartBtn.addEventListener('click', restartGame);
for (const item of container.children) {
  const id = Number(item.dataset.id);
  if (x.includes(id)) {
    item.textContent = 'X';
  } else if (o.includes(id)) {
    item.textContent = 'O';
  }
}

function onClick(e) {
  if (!e.target.textContent) {
    const id = e.target.dataset.id;
    let result;
    if (player === 'X') {
      x.push(Number(id));
      result = isWinner(x);
      localStorage.setItem(LOCAL_KEY_X, JSON.stringify(x));
    } else {
      o.push(Number(id));
      result = isWinner(o);
      localStorage.setItem(LOCAL_KEY_O, JSON.stringify(o));
    }
    e.target.textContent = player;
    if (result) {
      console.log(`player ${player} winner`);
      restartGame();
      return;
    }
    player = player === 'X' ? 'O' : 'X';
    localStorage.setItem(LOCAL_KEY_PLAYER, player);
  }
}

function restartGame() {
  container.innerHTML = markUp;
  x = [];
  o = [];
  player = 'X';
  localStorage.clear();
}

function isWinner(arr) {
  const result = win.some(element => element.every(item => arr.includes(item)));
  return result;
}

const win = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [1, 5, 9],
  [3, 5, 7],
];