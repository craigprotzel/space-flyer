var player;
var playerImg;

var playerW = 60;
var playerH = 60;

var playerSound;

var walls;

var timer;
var timeLimit = 600;

var gameIsOver;
var gameWon;

var winText = ["You are such a winner!", "You are amazing!", "I can't believe you actually won!", "Winner, Winner, Winner"];
var loseText = ["You are such a loser.","You are not very good at this.", "So close. Try again.", "Game Over. You did not win."];
var ranTextVal;

function initGame(){

	var ranTotal = Math.min(winText.length, loseText.length);
	ranTextVal = Math.floor(random(0,ranTotal));
	timer = 0;
	gameIsOver = false;
	gameWon = false;

	player = createSprite(playerW/2,height/2,playerW,playerH);
	//player.shapeColor = color(250,100,50);
	playerImg = loadImage("assets/rocket.png");
	player.addImage(playerImg);

	walls = new Group();
	for (var i = 0; i < 7; i++){
		var skipY = Math.floor(random(0,7));
		//console.log(skipY);
		for (var j = 0; j < 7; j++){
			if (j === skipY){
				continue;
			}
			var wall = createSprite(width/8 + (width/8 * i),height/14 + (height/7 * j), 30, 100);
			wall.shapeColor = color(255 * i/7,50,50);
			walls.add(wall);
		}
	}
}

function preload(){
	// playerSound = loadSound('assets/rocket_sound.mp3');
	playerSound = loadSound('assets/space.wav');
	// playerSound.playMode = 'restart';
}

var theVoice;
var triggerVoice = false;

function setup(){
	createCanvas(800,600);
	background(125);
	initGame();
	playerSound.setVolume(0.05);
	theVoice = new p5.Speech(27); // new P5.Speech object
}

function draw(){
	background(20,40,150);

  if (gameIsOver){
		fill(255);
		textAlign(CENTER);
		textSize(48);

		if (gameWon){
			if (triggerVoice){
				theVoice.speak(winText[ranTextVal]);
				triggerVoice = false;
			}
			text(winText[ranTextVal], width/2, height/2);
		}
		else{
			if (triggerVoice){
				theVoice.speak(loseText[ranTextVal]);
				triggerVoice = false;
			}
			text(loseText[ranTextVal], width/2, height/2);
		}
		textSize(16);
		text("(Click to play again)", width/2, height/2 + 50);
  }
  else{
		checkKeyPress();
		checkEdges();
		player.collide(walls);
		drawSprites();

		timer++;
		var curTime = timeLimit/60 - Math.floor(timer/60);
		fill(255);
		textAlign(CENTER);
		textSize(32);
		text(curTime, width/2, height/2);
		if (timer > timeLimit){
			gameIsOver = true;
			triggerVoice = true;
			console.log("Game Is Over!");
		}
  }
}

var playTheSound = false;

function checkKeyPress(){
	if (keyDown('a')){
		player.position.x -= 4;
		if (!playerSound.isPlaying()){
			playerSound.play();
		}
	}
	if (keyDown('d')){
		player.position.x += 4;
		if (!playerSound.isPlaying()){
			playerSound.play();
		}
	}
	if (keyDown('w')){
		player.position.y -= 4;
		if (!playerSound.isPlaying()){
			playerSound.play();
		}
	}
	if (keyDown('s')){
		player.position.y += 4;
		if (!playerSound.isPlaying()){
			playerSound.play();
		}
	}
}

function checkEdges(){
	if (player.position.x < playerW/2){
		player.position.x = playerW/2;
	}
	if (player.position.y < playerH/2){
		player.position.y = playerH/2;
	}
	if (player.position.y > height - playerH/2){
		player.position.y = height - playerH/2;
	}
	if (player.position.x > width){
		gameIsOver = true;
		gameWon = true;
		triggerVoice = true;
	}
}

function mousePressed(){
	if (gameIsOver){
		walls.removeSprites();
		player.remove();
		initGame();
	}
}