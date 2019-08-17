
window.addEventListener("resize", function() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  });

const app = new PIXI.Application(window.innerWidth, window.innerHeight, {
    
    transparent: true,
    resolution: window.devicePixelRatio || 1,

});

document.body.appendChild(app.view);

PIXI.loader
  .add([
    "../resources/recurso1.png",
    "../resources/github1.png",
    "../resources/github2.png",
    "../resources/play1.png",
    "../resources/play2.png"
  ])
  .load(setup);

function setup() {
  //guy
  let sprite = new PIXI.Sprite(
    PIXI.loader.resources["../resources/recurso1.png"].texture,
    );

  //height
  var altura = 90;
  //velocidad
  sprite.vy = 0;

  app.stage.addChild(sprite);

  //button
 const button = buttonSetup();

 app.stage.addChild(button);

  function gameLoop() {
    
    requestAnimationFrame(gameLoop);
    //agregando velocidad
    sprite.vy = altura; 
    //flotando
    sprite.y += sprite.vy;

        if (sprite.y > 120) {
            altura = -.3;
        }else if (sprite.y < 96){
            altura = .3;
        }

        //centrando el monito
        sprite.x = app.renderer.width / 2 - sprite.width / 2;

        //button horizontal
        button.x = app.renderer.width / 2 - button.width / 2;

        //button vertical
        button.y = app.renderer.height / 1 - sprite.height / 1;

    }

  //Start the loop
  gameLoop();
    
}

function buttonSetup() {
  
  //create some textures
  const textureButton = PIXI.Texture.from('../resources/github1.png');
  const textureButtonOver = PIXI.Texture.from('../resources/github2.png');
 
  const button = new PIXI.Sprite(textureButton);
  button.buttonMode = true;
  
  // make the button interactive...
  button.interactive = true;
  button.buttonMode = true;

  button
    // Mouse & touch events are normalized into
    // the pointer* events for handling different
    // button events.
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);

  // add it to the stage
  return button;

  function onButtonDown() {
    this.isdown = true;
    this.texture = textureButtonDown;
    this.alpha = 1;
  }
  
  function onButtonUp() {
    this.isdown = false;
    if (this.isOver) {
        this.texture = textureButtonOver;
    } else {
        this.texture = textureButton;
    }
  }
  
  function onButtonOver() {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
    this.texture = textureButtonOver;
  }
  
  function onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    this.texture = textureButton;
  }

}

