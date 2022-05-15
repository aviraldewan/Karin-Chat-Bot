// File handles speech of bot

const btn = document.querySelector('.talk');
const content = document.querySelector('.stot');

// Boolean variable which tells whether to speak
// current response or not
let speakResponse = false;

const SpeechRecognition = window.SpeechRecognition ||
    window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

// When 'Talk' button is clicked it prints 'Listening...'
// to let the user know that speech command is running
recognition.onstart = function () {
    content.textContent = "Listening...";
}

// When user's speech is over then print it
recognition.onresult = function (event) {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    content.textContent = '';
    readOutLoud(transcript);
}

// When 'Talk' button is clicked the program starts
btn.addEventListener('click', () => {
    speakResponse = true;
    recognition.start();
});

// To speak out the response of bot
function readOutLoud(message) {

    // Speak the response only when query was spoken
    if (speakResponse) {
        const speech = new SpeechSynthesisUtterance();

        speech.lang = 'en-GB';
        let answer = getBotResponse(message);
        speech.text = answer;

        // Display user's verbal query
        let userHtml = '<p class="userText"><span>' + message + '</span></p>';
        $("#chatbox").append(userHtml);
        document.getElementById("chat-bar-bottom").scrollIntoView(true);

        setTimeout(() => {
            getHardResponse(userText);
        }, 500)

        // Display the bot's verbal response
        let botHtml = '<p class="botText"><span>' + answer + '</span></p>';
        $("#chatbox").append(botHtml);

        speech.volume = 1;
        speech.rate = 0.95;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
        content.textContent = '';
        speakResponse = false;

        if (message.includes('open'))
        {
            setTimeout(() => {
                window.open("https://www." + message.substring(5), "_blank");
            }, 1000)
        }
    }
}