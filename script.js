const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
const OPENAI_API_KEY = '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';

chatForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const message = userInput.value.trim();
  if (message === "") return;

  appendMessage("user", message);
  userInput.value = "";

  const botReply = await fetchBotReply(message);
  appendMessage("bot", botReply);
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
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Fetch error:", error);
    return "Error: Could not reach the AI service.";
  }
}
