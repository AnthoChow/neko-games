document.querySelectorAll(".player-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const player = btn.dataset.player;

    if (player === "guest") {
      localStorage.setItem("currentPlayer", "guest");
      localStorage.setItem("puzzleIndex", "0");
      window.location.href = "./puzzle.html";
    } else {
      // Other player buttons don't do anything yet
      console.log(`${player} path not built yet`);
    }
  });
});

