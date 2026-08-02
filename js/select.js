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

const players_supported = ["guest", "meowdy"];

