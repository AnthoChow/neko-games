const guestPuzzles = [
  { question: "/rgualmee ꖌᒷᒷ!¡╎リ⍊ᒷリℸ𝙹∷ǁ ____", answer: "/gamerule keepInventory true", bg: "bg-guest-1" },
  { question: "-.... .--- ---.. .-.. .-. .- -.", answer: "axolotl", bg: "bg-guest-2" },
  { question: "Dandelion + Poppy + Orchid + Lily", answer: "224", bg: "bg-guest-3" },
  { question: "eTq3RtM5 - Poem Line #23 - Love", answer: "and the universe said I love you because you are love.", bg: "bg-guest-4" },
];

const puzzleIndex = parseInt(localStorage.getItem("puzzleIndex")) || 0;
const puzzleData = guestPuzzles[puzzleIndex];

document.body.className = "";
document.body.classList.add(puzzleData.bg);

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

  if (userText === puzzleData.answer.toLowerCase()) {
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