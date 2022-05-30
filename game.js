var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var started = false;

$(".btn").click(function() {
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  chackAnswer(userClickedPattern.length-1);
});

$(document).keydown(function() {
  if(started===false) {
    nextSequence();
    $("h1").text("Level 0");
    started=true;
  }

});


function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 3 + 1);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level "+level);
}

function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  },100);
}


function chackAnswer(currentLevel) {
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
    if(userClickedPattern.length===gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      },1000);
    }
    } else {
      console.log("fail");
      playSound("wrong");
      $("body").addClass("game-over");
      $("h1").text("Game over, Press Any Key to Restart")
      setTimeout(function() {
        $("body").removeClass("game-over");
      },200);
      startOver();
  }
}

function startOver() {
  level=0;
  gamePattern = [];
  started=false;
}
