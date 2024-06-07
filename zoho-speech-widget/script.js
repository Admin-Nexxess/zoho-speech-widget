window.addEventListener('load', function() {
  // Ensure the browser supports Web Speech API
  if (!('webkitSpeechRecognition' in window)) {
    alert("Your browser does not support speech recognition. Please use Google Chrome.");
    return;
  }

  // Initialize Web Speech API
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = function() {
    console.log('Voice recognition started.');
  };

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    console.log('Voice recognition result: ', transcript);
    
    // Insert the transcribed text into the Zoho Creator form
    ZOHO.CREATOR.API.addRecord({
      appName: "nexxsuite",
      formName: "AI_Prompt",
      data: {
        "Prompt_Text": transcript
      }
    }).then(function(response) {
      console.log(response);
      if(response.code === 3000) {
        alert("Record added successfully!");
        location.reload(); // Reload the page to show the new record
      } else {
        alert("Failed to add record.");
      }
    }).catch(function(error) {
      console.error(error);
    });
  };

  recognition.onerror = function(event) {
    console.error('Speech recognition error detected: ', event.error);
  };

  recognition.onend = function() {
    console.log('Voice recognition ended.');
  };

  // Start recognition when the button is clicked
  document.getElementById('start-recognition-button').addEventListener('click', function() {
    recognition.start();
  });
});
