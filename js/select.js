document.querySelectorAll(".player-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const player = btn.dataset.player;
    localStorage.setItem("currentPlayer", player);
    localStorage.setItem("puzzleIndex", "0");
    window.location.href = "./puzzle.html";
  });
});