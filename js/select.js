document.querySelectorAll(".player-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const player = btn.dataset.player;

    if (players_supported.includes(player)) {
      localStorage.setItem("currentPlayer", player);
      localStorage.setItem("puzzleIndex", "0");
      window.location.href = "./puzzle.html";
    } else {
      console.log(`${player} path not built yet`);
    }
  });
});

const players_supported = ["guest", "meowdy", "gh0st", "ieme", "recal", "doodles"];

const secretInput = document.getElementById("secretInput");
const secretSubmitBtn = document.getElementById("secretSubmitBtn");

function checkSecret() {
  const enteredPassword = secretInput.value.trim().toLowerCase();

  if (enteredPassword === "Atari") {
    window.location.href = "./final.html";
  } else {
    secretInput.value = "";
    secretInput.placeholder = "incorrect, try again...";
  }
}

secretSubmitBtn.addEventListener("click", checkSecret);
secretInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkSecret();
  }
});