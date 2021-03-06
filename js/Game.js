class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];

    car1.addImage(car1Image);
    car2.addImage(car2Image);
    car3.addImage(car3Image);
    car4.addImage(car4Image);
  }

  play(){
    form.hide();

    background(75,75,75);

    player.getCarsAtEnd();

    image(track,0,-displayHeight*4,displayWidth,displayHeight*5);

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y = 0;

      

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 190;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance-70;
        cars[index-1].x = x;
        cars[index-1].y = y;

        //console.log(allPlayers[plr].distance);

        if (index === player.index){
          //cars[index - 1].shapeColor = "red";
          fill("red");
          ellipseMode(RADIUS);
          ellipse(x,y,50,50)
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
      carSound.play();
    }


    if(player.distance>3400){
      gameState = 2;
      player.rank+=1;
      player.update();
      console.log("Player "+player.index+"  rank "+player.rank);
      Player.updateCarsAtEnd(player.rank);
      image(winnerImage,displayWidth/2-150,-(displayHeight*4+50),400,300);
      text(player.rank,displayWidth/2,-(displayHeight*4+50))
    }

    

    drawSprites();
  }

  end(){
    //console.log("Game Has Ended")
  }
}
