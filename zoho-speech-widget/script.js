let recognition;

function startRecognition() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('transcript').value = transcript;
        sendToOpenAI(transcript);
    };

    recognition.onspeechend = function() {
        recognition.stop();
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error detected: ' + event.error);
    };
}

document.getElementById('start-record-btn').addEventListener('click', startRecognition);

function sendToOpenAI(text) {
    const apiKey = 'YOUR_OPENAI_API_KEY';
    const apiUrl = 'https://api.openai.com/v1/assistants/asst_bmwA8jaOqj0VTIXgtYmqlaj2/completions';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'OpenAI-Beta': 'assistants=v2'
        },
        body: JSON.stringify({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: text
                    }
                }
            ],
            max_tokens: 50
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('transcript').value = data.choices[0].text;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
