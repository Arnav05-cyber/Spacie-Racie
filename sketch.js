var gameState = 0, playerCount = 0;
var database, form,game,player;
var allPlayers;
var distanceX = 0;
var distanceY = 0;
var players, player1, player2, player3, player4;
var bigShip;
var line;
var bullet;


function preload()
{
    player1Image = loadImage("images/Player.png");
    player2Image = loadImage("images/Player.png");
    player3Image = loadImage("images/Player.png");
    player4Image = loadImage("images/Player.png");
    //groundImage = loadImage("images/ground.png");
    trackImage = loadImage("images/Background.jpg");
    spaceRace = loadImage("images/Spceracer.jpg");
    obstacleImage = loadImage("images/Obstacle.png");
    bigShipImage = loadImage("images/Ship.png");
    lineImage = loadImage("images/line.jpg");
    bullet1 = loadImage("images/bullet1.png");
}

function setup(){
    createCanvas(displayWidth-30,displayHeight-130);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
}

function draw(){



    if(gameState === 0)
    {
        image(spaceRace, 0,-70,displayWidth,displayHeight);
    }
    
    if(playerCount === 4)
    {
        game.update(1);
    }

    if(gameState === 1)
    {
        clear();
        game.play();
    }

    

    if(gameState === 2)
    {
        game.end();
    }

  
}




