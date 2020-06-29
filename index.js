// var order=[];
// var playerorder=[];
// var good;
// var re=document.querySelector("#green");
// var gr=document.querySelector("#red");
// var bl=document.querySelector("#blue");
// var ye=document.querySelector("#yellow");
// document.querySelector("#green").addEventListener("click",handleClick);
// document.querySelector("#red").addEventListener("click",handleClick);
// document.querySelector("#blue").addEventListener("click",handleClick);
// document.querySelector("#yellow").addEventListener("click",handleClick);
// document.addEventListener("keypress",function(event){
//   document.querySelector("h1")
// })
//
// function handleClick()
// {
//   var audio=new Audio("butt/button-click-sound-effect.mp3");
//   audio.play();
//   this.classList.add("pressed");
//   setTimeout(function()
//   {
//     this.classList.remove("pressed");
//   },300);
// }
var buttons = [
  $("#green"),
  $("#red"),
  $("#yellow"),
  $("#blue")
];

var sounds = [
  new Audio("sounds/green.mp3"),
  new Audio("sounds/red.mp3"),
  new Audio("sounds/yellow.mp3"),
  new Audio("sounds/blue.mp3")
];

var wrongAudio = new Audio("sounds/wrong.mp3");
var startGameAudio = new Audio("sounds/Air Horn.mp3");

var level,series,userClicks;

function idToNumber(color){
  switch(color){
    case "green": return 0; break;
    case "red": return 1; break;
    case "yellow": return 2; break;
    case "blue": return 3; break;
  }
}

function generateFlash(number){
  sounds[number].play();
  buttons[number].addClass("pressed");
  setTimeout(function(){
    buttons[number].removeClass("pressed");
  },300);
}

$(document).on("keydown",startGame);

$(".box").on("click",function(){
  number = idToNumber(this.getAttribute("id"));
  generateFlash(number);
  userClicks.push(number);
  verifyClicks();
});

function startGame(){
  startGameAudio.play();
  level = 1;
  series = [];
  userClicks = [];
  $("h2").html("Score:"+1);
  setTimeout(generateSeries,2000);
  //$("h1").before("<h4>press any key to restart the game</h4>");

}

function generateSeries(){
  $("h1").html("Level " + level);
  var randNumber = Math.floor(Math.random() * 4);
  series.push(randNumber);
  generateFlash(randNumber);
}

function verifyClicks(){
  index = userClicks.length - 1;
  if (userClicks[index] != series[index])
  {
    endGame();
  }
  else if (userClicks.length >= series.length)
  {
    level++;
    $("h2").html("Score:"+level);
    userClicks = [];
    setTimeout(generateSeries,1000);
  }
}

function endGame(){
  wrongAudio.play();
  $("body").addClass("endGame");
  $("h1").html("Game over");
  //$("h2").html("Score:"+level);
  //setTimeout(score,100);
  setTimeout(function(){$("body").removeClass("endGame");}, 100);
}
