

var sound = new Howl({
  src: ['../resources/chill.mp3'],
  autoplay: true,
  loop: true
});

sound.play();

const app = new PIXI.Application({
    
    width: 375,
    height: 812,
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

    }

  //Start the loop
  gameLoop();
    
}

