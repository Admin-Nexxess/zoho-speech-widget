// Initialize the speech recognition API
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();

// Set the recognition settings
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';

// Function to handle the speech recognition results
function onSpeechResult(transcript) {
    console.log('Transcript:', transcript);

    // Set the value of the 'Prompt Text' field using Zoho Creator API
    ZOHO.CREATOR.init()
        .then(function(data) {
            var formInstance = ZOHO.CREATOR.UTIL.getCurrentFormInstance();
            formInstance.setFieldValue('Prompt_Text', transcript); // Use the correct field name
        });
}

// Function to start the speech recognition
function startSpeechRecognition() {
    recognition.start();
}

// Event handler for when speech recognition results are received
recognition.onresult = function(event) {
    var transcript = event.results[0][0].transcript;
    onSpeechResult(transcript);
};

// Event handler for speech recognition errors
recognition.onerror = function(event) {
    console.error('Speech recognition error detected: ' + event.error);
};

// Event handler for speech recognition end
recognition.onend = function() {
    console.log('Speech recognition service disconnected');
}

// Attach the startSpeechRecognition function to a button click event or similar
document.getElementById('start-recognition-button').addEventListener('click', startSpeechRecognition);
