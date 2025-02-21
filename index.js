var colors = ["red", "blue", "green", "yellow"];
var gameSequence = [];
var userClickedPattern = [];
var toggle = true;
var level = 1;
$(".btn").click(function () {
  var id = $(this).attr("id");
  userClickedPattern.push(id);
  makeSound(id);
  buttonAnimation(id);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
  if (toggle) {
    nextSequence();
    toggle = false;
  }
});

function checkAnswer(le) {
  if (gameSequence[le] === userClickedPattern[le]) {
    if (gameSequence.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    makeSound('wrong');
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
    userClickedPattern = [];
  $("#level-title").text("Level " + level);
  level++;
  var randNum = Math.floor(Math.random() * 4);
  var randColor = colors[randNum];
  gameSequence.push(randColor);
  makeSound(randColor);
  $("#" + randColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function makeSound(key) {
  var audio = new Audio("sounds/" + key + ".mp3");
  audio.play();
}

function buttonAnimation(randColor) {
  $("#" + randColor).addClass("pressed");
  setTimeout(function () {
    $("#" + randColor).removeClass("pressed");
  }, 100);
}

function startOver() {
    level = 1;
    gameSequence = [];
    toggle = true;
  }  