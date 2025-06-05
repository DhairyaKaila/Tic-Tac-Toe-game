// localStorage.removeItem("player");

const gameBoard = document.getElementById("game");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let board = Array(9).fill("");

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

let player = {};

function onLoad() {
  if (JSON.parse(localStorage.getItem("player"))) {
    player = JSON.parse(localStorage.getItem("player"));
    p1 = player["player1"];
    p2 = player["player2"];
    document.getElementById("player1-SC").innerText = `${p1}:  ${player[`${p1}`]}`;
    document.getElementById("player2-SC").innerText = `${p2}:  ${player[`${p2}`]}`;
    document.getElementById("Draw").innerText = `Draw:  ${player[`Draw`]}`;
    document.getElementById("player-name").classList.remove("show");
    document.getElementById("player-name").classList.add("hidden");
    document.getElementById("game-main").classList.remove("hidden");
    document.getElementById("game-main").classList.add("show");
    resetGame();
  } else {
    document.getElementById("game-main").classList.remove("show");
    document.getElementById("game-main").classList.add("hidden");
    document.getElementById("player-name").classList.add("show");
    console.log("helo");
  }
}

onLoad();

function playerDetail() {
  let player1 =
    document.getElementById("player1").value.toString() != ""
      ? document.getElementById("player1").value.toString()
      : "player 1";
  let player2 =
    document.getElementById("player2").value.toString() != ""
      ? document.getElementById("player2").value.toString()
      : "player 2";

  player[`player1`] = `${player1}`;
  player[`player2`] = `${player2}`;
  player[`${player1}`] = 0;
  player[`${player2}`] = 0;
  player[`Draw`] = 0;
  localStorage.setItem("player", JSON.stringify(player));

  document.getElementById("player-name").classList.remove("show");
  document.getElementById("player-name").classList.add("hidden");
  document.getElementById("game-main").classList.remove("hidden");
  document.getElementById("game-main").classList.add("show");
  
    p1 = player["player1"];
    p2 = player["player2"];
    document.getElementById("player1-SC").innerText = `${p1}:  ${player[`${p1}`]}`;
    document.getElementById("player2-SC").innerText = `${p2}:  ${player[`${p2}`]}`;
    document.getElementById("Draw").innerText = `Draw:  ${player[`Draw`]}`;
  resetGame();
}

function createBoard() {
  gameBoard.innerHTML = "";
  board.forEach((val, idx) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = idx;
    cell.innerText = val;
    cell.addEventListener("click", handleClick);
    gameBoard.appendChild(cell);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "") return;

//   board[index] = currentPlayer;
//   e.target.innerText = currentPlayer;

  board[index] = currentPlayer === `${player["player1"]} (X)` ? "X" : "0";
  e.target.innerText = currentPlayer === `${player["player1"]} (X)` ? "X" : "0";

  if (checkWin()) {
    statusText.innerText = `${currentPlayer} wins! 🎉`;
    let playerName = currentPlayer.substring(0, (currentPlayer.length)-4);
    player[playerName] = player[playerName] + 1;
    localStorage.setItem("player",JSON.stringify(player));
    p1 = player["player1"];
    p2 = player["player2"];
    document.getElementById("player1-SC").innerText = `${p1}:  ${player[`${p1}`]}`;
    document.getElementById("player2-SC").innerText = `${p2}:  ${player[`${p2}`]}`;
    document.getElementById("Draw").innerText = `Draw:  ${player[`Draw`]}`;
    gameBoard
      .querySelectorAll(".cell")
      .forEach((cell) => cell.removeEventListener("click", handleClick));
  } else if (board.every((cell) => cell !== "")) {
    statusText.innerText = "It's a Draw! 😐";
    player["Draw"] = player["Draw"] + 1;
    localStorage.setItem("player",JSON.stringify(player));
    p1 = player["player1"];
    p2 = player["player2"];
    document.getElementById("player1-SC").innerText = `${p1}:  ${player[`${p1}`]}`;
    document.getElementById("player2-SC").innerText = `${p2}:  ${player[`${p2}`]}`;
    document.getElementById("Draw").innerText = `Draw:  ${player[`Draw`]}`;
  } else {
    currentPlayer = currentPlayer === `${player["player1"]} (X)` ? `${player["player2"]} (0)` : `${player["player1"]} (X)`;
    statusText.innerText = `Turn: ${currentPlayer}`;
  }
}

function checkWin() {
  return winningCombos.some((combo) => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = `${player["player1"]} (X)`;
  statusText.innerText = `Turn: ${currentPlayer}`;
  createBoard();
}
