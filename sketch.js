var bg,bgImg;
var player, shooterImg, shooter_shooting;
var gameState = "PLAY";
var score = 0;


function preload(){
  
  shooterImg = loadImage("assets/2.jpg")
  shooter_shooting = loadImage("assets/3.jpg")

  bgImg = loadImage("assets/nightbg.jpg.webp")
  zombieImg  = loadImage("assets/zombie 1.jpg")
  bulletImg = loadImage("assets/bullet.jpg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1

zombiesGroup = createGroup();
bulletGroup = createGroup();
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-150, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.7
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   


}

function draw() {
  background(0); 

  

  if(gameState === "PLAY"){
     //release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
spawnBullets();
spawnZombies();

  if(zombiesGroup.isTouching(player)){
    gameState = "END";
  }
  }
  else if(gameState === "END"){
    bulletGroup.setVelocityXEach(0);
    
  }



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}



drawSprites();


}

function spawnZombies() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    zombie = createSprite(displayWidth-100, displayHeight-150, 50, 50);
   zombie.addImage(zombieImg)
   zombie.scale = 0.2
    //zombie.y = Math.round(random(80,120));
    zombie.velocityX = -5;
    zombiesGroup.add(zombie);
    zombie.lifetime = 200;
    }
  }
  function spawnBullets(){
   if(frameCount % 55 ==0){
    bullet = createSprite(displayWidth-1075, displayHeight-175, 10, 20);
    bullet.addImage(bulletImg)
    bullet.scale = 0.10;
    bullet.velocityX = 10;
    bullet.lifetime = 140;
    bulletGroup.add(bullet);
  }
}