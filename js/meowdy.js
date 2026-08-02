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
  let moveCount = 0;

  const pegEls = container.querySelectorAll(".peg");
  const moveCountEl = container.querySelector(".moveCount");

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
        moveCount++;
        if (moveCountEl) moveCountEl.textContent = moveCount;
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

  const letterSlotsEl = document.getElementById("letterSlots");
  const selectorEl = document.getElementById("hanoiSelector");
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

  function renderSelector() {
    selectorEl.innerHTML = "";
    letters.forEach((_, i) => {
      const btn = document.createElement("button");
      btn.className = "hanoi-select-btn" + (revealed[i] ? " solved" : "");
      btn.textContent = i + 1;
      btn.disabled = revealed[i];
      btn.addEventListener("click", () => loadBoard(i));
      selectorEl.appendChild(btn);
    });
  }

  function loadBoard(index) {
    boardWrap.style.display = "block";
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
      boardWrap.style.display = "none";
      renderSlots();
      renderSelector();
    });
  }

  renderSlots();
  renderSelector();
}