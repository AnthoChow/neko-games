const finishKeys = {
  meowdy: "MEOWDY_KEY_HERE",
  gh0st: "GH0ST_KEY_HERE",
  ieme: "IEME_KEY_HERE",
  recal: "RECAL_KEY_HERE",
  doodles: "DOODLES_KEY_HERE",
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
