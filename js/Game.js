class Game {
    constructor()
    {

    }

    getState()
    {
        var gameStateRef = database.ref("gameState") 
        gameStateRef.on("value", function(data){
            gameState = data.val();
        })
    }

    update(state)
    {
        database.ref("/").update({
            gameState: state
        })
    }

    
     async start()
    {

        if(gameState === 0)
        {
            player = new Player();
            var playerCountRef = await database.ref("playerCount").once("value");
            if(playerCountRef.exists())
            {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            
           
            
            form = new Form();
            form.display();
            
        }

        player1 = createSprite(100,200);
        player1.addImage("car1", player1Image);
        player1.scale = 0.5;
        player2 = createSprite(300,200);
        player2.addImage("car2",player2Image);
        player2.scale = 0.5;
        player3 = createSprite(500,200);
        player3.addImage("car3", player3Image);
        player3.scale = 0.5;
        player4 = createSprite(700,200);
        player4.addImage("car4", player4Image);
        player4.scale = 0.5;
        players = [player1,player2,player3,player4];


        
    }

    play()
    {
        form.hide();
        textSize(30);
        text("Game Start", 100,100);
        Player.getPlayerInfo();
        player.getCarsAtEnd();



        

        if(allPlayers !== undefined)
        {
            background("#a5a390");
            image(trackImage,0,-60,displayWidth*4,displayHeight);
            var index = 0;
            var x=150;
            var y = 60;
            
            for(var plr in allPlayers)
            {
                
                index = index + 1;
                y = allPlayers[plr].distanceY + 60 + 115*index;
                x = allPlayers[plr].distanceX+150;
                players[index-1].x = x;
                players[index-1].y = y;
                textSize(16);
                strokeWeight(4);
                stroke("Black");
                text(allPlayers[plr].name, x-20,y+50)
                if(index === player.index)
                {
                
                    players[index-1].shapecolor = "red";
                    camera.position.y = displayHeight/2;
                    camera.position.x = players[index-1].x+650;
                    stroke("Red");
                    ellipse(x,y,60,60);

                    if(keyDown ("space"))
                {
                    var bullet = createSprite(players[index-1].x + 50,players[index-1].y);
                    bullet.addImage("bullet", bullet1);
                    bullet.velocityX = 4;
                    bullet.scale = 0.2;
                }
                    
                    
                }

                

                if(World.frameCount % 100 === 0)
                {
                var obstacle = createSprite(displayWidth*2,players[index-1].y);
                obstacle.addImage("obstacle1Image", obstacleImage);
                obstacle.velocityX = -3
                obstacle.scale = 0.1;
                }

                

            }
        }
            if(keyDown (RIGHT_ARROW) && player.index !== null)
            {
                player.distanceX = player.distanceX + 50;
                player.update();
            }

            if(keyDown (UP_ARROW) && player.index !== null)
            {
                player.distanceY = player.distanceY - 50;
                player.update();
            }

            if(keyDown (DOWN_ARROW) && player.index !== null)
            {
                player.distanceY = player.distanceY + 50;
                player.update();
            }

            if(keyDown (LEFT_ARROW) && player.index !== null)
            {
                player.distanceX = player.distanceX - 50;
                player.update();
            }





            

            if(player.distanceX > 20000)
              {
                 gameState = 2;
                 player.rank = player.rank+1;
                 Player.updateCarsAtEnd(player.rank);
              }
            drawSprites();
    }
      end()
      {
         //alert("Game Ended");
          console.log("Player Rank" + player.rank);
          //alert("Player Rank" + player.rank);
      }
    
}
