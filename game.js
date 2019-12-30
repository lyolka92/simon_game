// Common params

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

// Game Sequence

var gameIsStarted = false;
var level = 0;

$(document).keydown(function() {
    if (gameIsStarted = false) {
        gameIsStarted = true;
        nextSequence();
    }
})

function nextSequence() {

    userClickedPattern = [];
    level++;
    $('#level-title').text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);

    $('#' + randomChoosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);

}

function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('success');
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log('wrong');
        var audio = new Audio('sounds/wrong.mp3');
        
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);

        $('#level-title').text('Game Over, Press Any Key to Restart');

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameIsStarted = false;
}

// User Click Detection

$('.btn').click(function() {

    var userChoosenColour = this.id;
    userClickedPattern.push(userChoosenColour);

    animatePress(userChoosenColour);
    playSound(userChoosenColour);

    checkAnswer(userClickedPattern.length - 1);

})

// Additional Functions

function playSound(name) {

    var audioLink = 'sounds/' + name + '.mp3';
    var audio = new Audio(audioLink);
    audio.play();

}

function animatePress(currentColour) {

    $('#' + currentColour).addClass("pressed");
    setTimeout(function() {
        $('#' + currentColour).removeClass("pressed")
    }, 100);

}