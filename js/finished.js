const finishKeys = {
  meowdy: "To strike",
  gh0st: "Name",
  ieme: "Console",
  recal: "Game of Go",
  doodles: "Fuji",
};

const currentPlayer = localStorage.getItem("currentPlayer");
const key = finishKeys[currentPlayer] || "UNKNOWN";

document.body.classList.add("bg-finished");

const finishedMessage = document.getElementById("finishedMessage");
finishedMessage.innerHTML = `
  Congrats! You made it to the end—<br><br>
  Or did you..?<br><br>
  Your key is:<br>
  <strong>${key}</strong>
`;
