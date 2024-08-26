const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const gptResponse = document.getElementById('gpt-response');

sendButton.addEventListener('click', async () => {
    const prompt = userInput.value.trim();
    if (prompt !== '') {
        try {
            const response = await fetch(`https://api.chatgpt.com/v1/converse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });
            const data = await response.json();
            const responseText = data.response;
            gptResponse.innerText = responseText;
            userInput.value = '';
        } catch (error) {
            console.error(error);
        }
    }
});
