// File to handle the working of Chat Bot

// Global variable to play song
let song = new Audio();
// Global variable used to store number of remaining alarms
let alarmleft = 0;

// Collapsible chat area
// When clicked, it expands the chat area if it is collapsed
// or it collapses the chat area if it is expanded
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}

// This functions returns the time when chat has begun
// It is called only when program is started
function getTime() {

    // Get present time and date
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    // Display time in 24 Hour format
    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

// Tells the weather info using an API
// Check console for weather data
function getWeatherInfo() {
    let lat, lon;
    let temp;
    const kelvin = 273;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            // API ID
            const api = "316f51bba3a923a37115df7c318faaa0";

            // API URL
            const base =
                `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
                `lon=${lon}&appid=316f51bba3a923a37115df7c318faaa0`;

            // Calling the API
            fetch(base)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    // Convert kelvin to celcus scale
                    temp = Math.floor(data.main.temp - kelvin) + "°C";
                    console.log("Current Weather in Jammu is ");
                    console.log(temp);
                });
        })
    };
}

// Loads the audio when alarm is over
function ringBell() {

    // Speak alarm message
    const speech = new SpeechSynthesisUtterance();

    speech.lang = 'en-GB';
    speech.text = "Aviral, wake up. Time to do the work!"

    // Display alarm message
    let botHtml = '<p class="botText"><span>' + speech.text + '</span></p>';
    $("#chatbox").append(botHtml);

    speech.volume = 1;
    speech.rate = 0.95;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
    content.textContent = '';

    let audio = new Audio();
    audio.src = "songs/alarmsound.mp3";
    setTimeout(() => {
        // Play alarm sound 3 times
        for (let i = 0; i < 3; i++)
            audio.play();
    }, 5000);

    // Decrement number of alarms left
    alarmleft--;
}

// Sets an alarm for inputted time
function setAlarm(query) {

    const duration = new Date(query);
    let now = new Date();

    // Increment number of alarms left
    alarmleft++;

    let timetoAlarm = duration - now;
    if (timetoAlarm >= 0) {
        setTimeout(() => {
            // Display message in console
            console.log("Ringing now...");
            ringBell();
        }, timetoAlarm);
    }
}

// Plays a song
function playSong(query) {
    if (query == "PLAY A SONG") {
        song.src = 'songs/kc.mp3';
        song.play();
    }
    else if (query == "PLAY SOME ENERGETIC SONG") {
        song.src = 'songs/mal.mp3';
        song.play();
    }
    else if (query == "WHAT'S THE BEST SONG YOU HAVE GOT") {
        song.src = 'songs/lt.mp3';
        song.play();
    }
}

// Stops current playing song
function stopSong() {
    song.pause();
}

// Sends first message of bot
function firstBotMessage() {
    let firstMessage = "How's it going?"
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

// This funciton gets called when program starts
firstBotMessage();

// Retrieves the response
function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

//Gets the text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();
    let query = userText.toUpperCase();

    // Opens inputted website in new tab
    if (query.substring(0, 4) == "OPEN") {
        setTimeout(() => {
            window.open("https://www." + userText.substring(5), "_blank");
        }, 1500)
    }

    // Sets an alarm for inputted time
    if (query[0] == "2") {
        setAlarm(query);
    }

    if (userText != "") {
        let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

        $("#textInput").val("");
        $("#chatbox").append(userHtml);
        document.getElementById("chat-bar-bottom").scrollIntoView(true);

        setTimeout(() => {
            getHardResponse(userText);
        }, 1000)
    }
}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(sampleText);
    }, 1000)
}

// Function to send user's message
function sendButton() {
    getResponse();
}

// Function for heart button
function heartButton() {
    buttonSendText("Love You!");
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});