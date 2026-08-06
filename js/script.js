const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

// Function to check the answer
function submitAnswer() {
  const userText = answerInput.value.trim().toLowerCase();

  if (userText === "") {
    message.textContent = "Please type something first!";
    message.className = "message error";
    return;
  }

  if (userText === "valve") {
    message.textContent = "Access Granted! Welcome!";
    message.className = "message success";
    
    // Redirect after 1 second
    setTimeout(() => {
      window.location.href = "./players.html";
    }, 1000);
  } else {
    message.textContent = "Incorrect word. Try again!";
    message.className = "message error";
  }
}

// Event 1: Click the button
submitBtn.addEventListener("click", submitAnswer);

// Event 2: Press "Enter" key inside the input box
answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    submitAnswer();
  }
});