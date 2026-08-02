const meowdyPuzzles = [
  { type: "hanoi-multi", diskCount: 3, letters: ["C","h","i","i","k","a","w","a"], answer: "chiikawa", bg: "bg-meowdy" },
  { question: "Meowdy's clue #2 goes here...", answer: "answer2", bg: "bg-meowdy" },
  { question: "Meowdy's clue #3 goes here...", answer: "answer3", bg: "bg-meowdy" },
  { question: "Meowdy's clue #4 goes here...", answer: "answer4", bg: "bg-meowdy" },
  { question: "Meowdy's clue #5 goes here...", answer: "answer5", bg: "bg-meowdy" },
];

function initHanoiMulti(puzzleData) {
  const container = document.getElementById("hanoiMultiContainer");
  container.style.display = "block";

  const letters = puzzleData.letters;
  const revealed = new Array(letters.length).fill(false);
  let currentBoard = 0;

  const letterSlotsEl = document.getElementById("letterSlots");
  const boardWrap = document.getElementById("hanoiBoardWrap");

  function renderSlots() {
    letterSlotsEl.innerHTML = "";
    letters.forEach((letter, i) => {
      const slot = document.createElement("span");
      slot.className = "letter-slot";
      slot.textContent = revealed[i] ? letter : "_";
      letterSlotsEl.appendChild(slot);
    });
  }

  function loadBoard(index) {
    if (index >= letters.length) {
      boardWrap.innerHTML = "";
      return;
    }

    boardWrap.innerHTML = `
      <div class="hanoi-game">
        <div class="peg" data-peg="0"></div>
        <div class="peg" data-peg="1"></div>
        <div class="peg" data-peg="2"></div>
      </div>
      <p class="hanoi-moves">Moves: <span class="moveCount">0</span></p>
    `;

    initHanoi(puzzleData.diskCount || 3, boardWrap, () => {
      revealed[index] = true;
      renderSlots();
      currentBoard++;
      loadBoard(currentBoard);
    });
  }

  renderSlots();
  loadBoard(currentBoard);
}