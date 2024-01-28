"use strict";

const tiles = document.querySelectorAll(".tile");
const button = document.querySelector(".btn");
const PLAYER_X = { innerText: "X", color: "#005a00" };
const PLAYER_O = { innerText: "O", color: "#cc0000" };
let turn = PLAYER_X;

const boardState = Array(tiles.length);
boardState.fill(null);

// Elements
const strike = document.getElementById("strike");

// Tile Click
tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function tileClick(event) {
  const tile = event.target;
  const tileNumber = tile.dataset.index;
  if (tile.innerText != "") {
    return;
  }
  if (turn === PLAYER_X) {
    tile.innerText = PLAYER_X.innerText;
    tile.style.color = PLAYER_X.color;
    boardState[tileNumber - 1] = PLAYER_X;
    turn = PLAYER_O;
  } else {
    tile.innerText = PLAYER_O.innerText;
    tile.style.color = PLAYER_O.color;
    boardState[tileNumber - 1] = PLAYER_O;

    turn = PLAYER_X;
  }

  checkWinner();
}
function checkWinner() {
  for (const winningCombination of winningCombinations) {
    //Object Destructuring
    const { combo, strikeClass, strikeClassType } = winningCombination;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];
    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      strike.classList.add(strikeClass, strikeClassType);
    }
  }

  // Check for draw
  const alltilesFilledIn = boardState.every((tile) => tile != null);
  if (alltilesFilledIn) {
    gameOverScreent(null);
    retun;
  }
}
function gameOverScreent(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `winner is ${winnerText}`;
  }
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
}

const winningCombinations = [
  // Rows
  {
    combo: [1, 2, 3],
    strikeClass: "strike-row-1",
    strikeClassType: "strike-row",
  },
  {
    combo: [4, 5, 6],
    strikeClass: "strike-row-2",
    strikeClassType: "strike-row",
  },
  {
    combo: [7, 8, 9],
    strikeClass: "strike-row-3",
    strikeClassType: "strike-row",
  },
  // Columns
  {
    combo: [1, 4, 7],
    strikeClass: "strike-column-1",
    strikeClassType: "strike-column",
  },
  {
    combo: [2, 5, 8],
    strikeClass: "strike-column-2",
    strikeClassType: "strike-column",
  },
  {
    combo: [3, 6, 9],
    strikeClass: "strike-column-3",
    strikeClassType: "strike-column",
  },
  // Diagonal
  {
    combo: [1, 5, 9],
    strikeClass: "strike-diagonal-1",
    strikeClassType: "strike-diagonal",
  },
  {
    combo: [7, 5, 3],
    strikeClass: "strike-diagonal-2",
    strikeClassType: "strike-diagonal",
  },
];

button.addEventListener("click", function () {
  turn = PLAYER_X;
  strike.className = "strike";
  tiles.forEach((tile) => (tile.innerText = ""));
  boardState.fill(null);
  console.log("hej");
});
