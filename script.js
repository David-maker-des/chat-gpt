const chatLog = document.getElementById("chat-log");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Load the GPT model and tokenizer
const model = await transformers.AutoModelForSequenceClassification.fromPretrained("chatgpt");
const tokenizer = await transformers.AutoTokenizer.fromPretrained("chatgpt");

// Define a function to generate a response to a user input
async function generateResponse(userInput) {
    const inputs = tokenizer(userInput, return_tensors="pt");
    const outputs = await model(inputs["input_ids"], attention_mask=inputs["attention_mask"]);
    const response = tokenizer.decode(outputs["logits"].argmax(-1), skip_special_tokens=true);
    return response;
}

// Add an event listener to the send button
sendBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const userInputValue = userInput.value.trim();
    if (userInputValue !== "") {
        const response = await generateResponse(userInputValue);
        const chatLogHtml = `
            <p>You: ${userInputValue}</p>
            <p>ChatGPT: ${response}</p>
        `;
        chatLog.innerHTML += chatLogHtml;
        userInput.value = "";
    }
});
