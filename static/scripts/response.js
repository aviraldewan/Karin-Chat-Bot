// File to handle responses

// Function to output response(depends on input)
function getBotResponse(input) {

    // Array contains responses to unexpected cases or queries
    let errorMsg = ["Sorry, I don't get it!", "Can you say that again please?",
        "What's that?", "Sorry, I don't know about this",
        "Please try asking something else"];

    // Array containing 'rock paper scissors' game responses
    let game = ["rock", "paper", "scissors"];

    // Arrays containing responses to general chat
    let general = ["Fantastic", "It's great here",
        "Great as always", "Cool"];

    let bye = ["GoodBye", "Bye Bye", "Take Care", "Leaving so early",
        "I will miss you", "Come back soon", "Talk to you later"];

    let hi = ["Hi", "Hello there", "Hey", "Hi, What's up?", "Welcome back",
        "Its great that you are back", "Feels great to talk to you"];

    // Convert input string to Upper Case so that
    // valid inputs with non-uniform pattern of
    // Lower/Upper Case alphabets get valid output
    let query = input.toUpperCase();

    // Introduction Queries
    let intro = "Hi, my name is Karen and I'm your Personal Assistant";
    intro += ". A few weeks ago, I was just a vision that Aviral had and now he made me a reality! Yay";

    let functions = "I can do a lot of things like opening websites, playing music,news,you can also tell me to set an alarm";
    functions += " and a lot more!";

    let about = "You are Aviral Dewan, the programmer who programmed me!";

    // Some intorduction queries
    if (query == "WHO ARE YOU?" || query == "WHO ARE YOU")
        return intro;
    else if (query == "INTRODUCE YOURSELF" || query == "WHAT'S YOUR NAME")
        return intro;
    else if (query == "WHO MADE YOU?" || query == "WHO PROGRAMMED YOU?"
        || query == "WHO MADE YOU" || query == "WHO PROGRAMMED YOU")
        return "Aviral Dewan programmed me and here I am, ready to serve you!";
    else if (query == "WHAT CAN YOU DO?" || query == "WHAT CAN YOU DO")
        return functions;
    else if (query == "WHO AM I?" || query == "WHO AM I")
        return about;

    // Response to heart button clicked
    if (input == "Love You!")
        return "Love You too!";
    else if (query == "LOVE YOU")
        return "Love You too!";

    // Responses for play a song command
    if (query == "PLAY A SONG") {
        playSong(query);
        return "DJ Karin is here!";
    }
    else if (query == "PLAY SOME ENERGETIC SONG") {
        playSong(query);
        return "Let's make some noise people!";
    }
    else if (query == "WHAT'S THE BEST SONG YOU HAVE GOT") {
        playSong(query);
        return "This one's my all time favourite";
    }
    else if (query == "STOP THIS SONG") {
        stopSong();
        return "Ah! It was fun";
    }

    //rock paper scissors game
    if (query == "ROCK") {
        return game[Math.floor(Math.random() * game.length)];
    }
    else if (query == "PAPER") {
        return game[Math.floor(Math.random() * game.length)];
    }
    else if (query == "SCISSORS") {
        return game[Math.floor(Math.random() * game.length)];
    }

    // Identify the command for opening new website
    if (query.substring(0, 4) == "OPEN") {
        // Print name of requested website
        return "opening " + input.substring(5);
    }

    // Response for setting an alarm
    if (query[0] == "2") {
        return "Alarm has been set";
    }

    // Response for knowing weather
    if (query == "WHAT'S THE WEATHER") {
        let weather = getWeatherInfo();
        if (weather == undefined)
            return "Check Console for Jammu's current weather";
    }

    // Simple responses
    if (query == "HELLO" || query == "HI" || query == "HEY"
        || query == "HAI") {
        return hi[Math.floor(Math.random() * hi.length)];;
    }
    else if (query == "WHAT'S UP?" || query == "WHAT'S UP") {
        return general[Math.floor(Math.random() * general.length)]
            + " What about you?";
    }
    else if (query == "HOW ARE YOU?" || query == "HOW ARE YOU") {
        return general[Math.floor(Math.random() * general.length)]
            + " What about you?";
    }
    else if (query == "GOODBYE" || query == "GOOD BYE"
        || query == "BYE") {
        return bye[Math.floor(Math.random() * bye.length)];
    }
    else if (query == "I AM FINE" || query == "FANTASTIC")
        return "Great to hear that!";

    // Misc Queries
    let time = getTime();
    if (query == "WHAT IS THE TIME?" || query == "WHAT IS THE TIME?"
        || query == "WHAT'S THE TIME?" || query == "WHAT'S THE TIME")
        return "Its " + time.toString();

    // If all above cases fail
    // Print an error message because an unexpected query was sent
    return errorMsg[Math.floor(Math.random() * errorMsg.length)];
}