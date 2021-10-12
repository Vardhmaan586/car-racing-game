class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');

    this.reset = createButton("Reset the Firebase");
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2 - 50, 0);

    //image(winnerImage,displayWidth/2,displayHeight/2,400,300);

    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);

    this.reset.position(displayWidth/2+displayWidth/3,displayHeight/4-displayHeight/5);

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      console.log("Name of the Player : "+this.input.value());
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name);
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });

    this.reset.mousePressed(function (){
      player.updateCount(0);
      game.update(0);
      Player.updateCarsAtEnd(0);
    });

  }
}
