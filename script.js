const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

chatForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const message = userInput.value.trim();
  if (message === "") return;

  appendMessage("user", message);
  userInput.value = "";

  const reply = await fetchBotReply(message);
  appendMessage("bot", reply);
});

function appendMessage(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchBotReply(message) {
  try {
    const response = await fetch("https://free-unoficial-gpt4o-mini-api-g70n.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    return data.reply || "No response from AI.";
  } catch (error) {
    console.error("Error fetching reply:", error);
    return "Error: Could not reach AI service.";
  }
}
