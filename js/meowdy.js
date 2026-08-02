const meowdyPuzzles = [
  { type: "hanoi-multi", diskCount: 3, letters: ["C","h","i","i","k","a","w","a"], answer: "chiikawa", bg: "bg-meowdy" },
  { question: "Meowdy's clue #2 goes here...", answer: "answer2", bg: "bg-meowdy" },
  { question: "Meowdy's clue #3 goes here...", answer: "answer3", bg: "bg-meowdy" },
  { question: "Meowdy's clue #4 goes here...", answer: "answer4", bg: "bg-meowdy" },
  { question: "Meowdy's clue #5 goes here...", answer: "answer5", bg: "bg-meowdy" },
];

function initHanoi(diskCount, container, onSolved) {
  const pegs = [[], [], []];
  for (let i = diskCount; i >= 1; i--) pegs[0].push(i);

  let selectedPeg = null;
  const pegEls = container.querySelectorAll(".peg");

  function render() {
    pegEls.forEach((pegEl, i) => {
      pegEl.querySelectorAll(".disk").forEach(d => d.remove());
      pegs[i].forEach(diskSize => {
        const disk = document.createElement("div");
        disk.className = "disk";
        disk.style.width = `${diskSize * 15 + 20}px`;
        pegEl.appendChild(disk);
      });
      pegEl.classList.remove("selected");
    });
    if (selectedPeg !== null) pegEls[selectedPeg].classList.add("selected");
  }

  function handleClick(index) {
    if (selectedPeg === null) {
      if (pegs[index].length === 0) return;
      selectedPeg = index;
    } else {
      const from = pegs[selectedPeg];
      const to = pegs[index];
      const moving = from[from.length - 1];
      const top = to[to.length - 1];

      if (selectedPeg !== index && (to.length === 0 || moving < top)) {
        to.push(from.pop());
      }
      selectedPeg = null;
    }
    render();
    if (pegs[2].length === diskCount) onSolved();
  }

  pegEls.forEach((el, i) => el.addEventListener("click", () => handleClick(i)));
  render();
}

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