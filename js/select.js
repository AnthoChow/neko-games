document.querySelectorAll(".player-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const player = btn.dataset.player;
    localStorage.setItem("currentPlayer", player);
    localStorage.setItem("puzzleIndex", "0");
    window.location.href = "./puzzle.html";
  });
});

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

const guestPuzzles = [
  { question: "General public clue #1 goes here...", answer: "answer1" },
  { question: "General public clue #2 goes here...", answer: "answer2" },
];

const puzzleIndex = parseInt(localStorage.getItem("puzzleIndex")) || 0;

// Set guest background
document.body.classList.add("bg-guest");

const puzzleData = guestPuzzles[puzzleIndex];

const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const puzzleQuestion = document.getElementById("puzzleQuestion");

puzzleQuestion.textContent = puzzleData.question;

function submitAnswer() {
  const userText = answerInput.value.trim().toLowerCase();

  if (userText === "") {
    message.textContent = "Please type something first!";
    message.className = "message error";
    return;
  }

  if (userText === puzzleData.answer) {
    message.textContent = "Correct!";
    message.className = "message success";

    const nextIndex = puzzleIndex + 1;

    setTimeout(() => {
      if (nextIndex < guestPuzzles.length) {
        localStorage.setItem("puzzleIndex", nextIndex);
        window.location.reload();
      } else {
        window.location.href = "./finished.html";
      }
    }, 1000);
  } else {
    message.textContent = "Incorrect. Try again!";
    message.className = "message error";
  }
}

submitBtn.addEventListener("click", submitAnswer);
answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    submitAnswer();
  }
});