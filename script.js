//your JS code here. If required.
let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let gameActive = true;

const winningCombinations = [
  [1,2,3], [4,5,6], [7,8,9], // rows
  [1,4,7], [2,5,8], [3,6,9], // cols
  [1,5,9], [3,5,7]           // diagonals
];

// Submit button logic
document.getElementById("submit").addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  if(player1 === "" || player2 === "") {
    alert("Please enter names for both players!");
    return;
  }

  // Hide input, show board
  document.getElementById("player-input").classList.add("hidden");
  document.getElementById("board").style.display = "block";

  currentPlayer = player1;
  document.querySelector(".message").textContent = `${currentPlayer}, you're up`;
});

// Handle cell clicks
document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", () => {
    if(!gameActive || cell.textContent !== "") return;

    cell.textContent = currentSymbol;

    if(checkWin()) {
      document.querySelector(".message").textContent = `${currentPlayer}, congratulations you won!`;
      gameActive = false;
      return;
    }

    // Switch player
    if(currentPlayer === player1) {
      currentPlayer = player2;
      currentSymbol = "O";
    } else {
      currentPlayer = player1;
      currentSymbol = "X";
    }

    document.querySelector(".message").textContent = `${currentPlayer}, you're up`;
  });
});

// Check for win
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return document.getElementById(index.toString()).textContent === currentSymbol;
    });
  });
}
