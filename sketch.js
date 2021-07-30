var START=0;
var PLAY=1;
var END=2;
var OVER=3;
var gameState=START;

var virus,virusImage,virusImage2,virusGroup,enemyGroup;
var hero,heroImage;
var banner,bannerImage;
var spray,sprayImage,sprayImage2,sprayGroup,sprayGroup2;
var backGround,backGroundImage;
var gameOver,gameOverImage;
var restart,restartImage;
var reset,resetImage;
var backgroundSound;
var endSound;
var killSound;
var live = 3;
var count=0;
var musicCount=0;
var score;
var music=0;
var musicSp;


function preload(){
  virusImage=loadImage("Virus.png");
  virusImage2=loadImage("Virus 2.png");
  heroImage=loadImage("Hero.png");
  bannerImage=loadImage("Banner.jpeg");
  sprayImage=loadImage("Spray.png");
  sprayImage2=loadImage("Spray 2.png");
  backGroundImage=loadImage("backGround.jpg");
  gameOverImage=loadImage("gameOver.jpeg");
  resetImage=loadImage("reset.png");
  backgroundSound=loadSound("background sound.mp3");
  endSound=loadSound("end sound.mp3");
  killSound=loadSound("kill sound.mp3");
} 

function setup() {
  createCanvas(600, 400);
  
  
 

  //hero = createSprite(100,170,20,20);
  //hero.addImage(heroImage);
  //hero.scale=0.45;

   // banner = createSprite(300,200);
  //banner.addImage(bannerImage);
  //banner.scale=0.01;

  reset = createSprite(310,250);
  reset.addImage(resetImage);
  reset.scale=0.5;
  reset.visible=false;

  restart = createSprite(310,100);
  restart.visible= false;

  

  score=0;

  virusGroup = createGroup(); 
  sprayGroup = createGroup();
  enemyGroup = createGroup();
  //sprayGroup2 = createGroup();
  
  
}

function draw() {

  if(gameState===START){
    imageMode(CENTER);
    image(bannerImage,300,200,600,400);
    //backGround.visible=false;
    //hero.visible=false;
    //gameOver.visible=false;
    
    
  }

  if(keyDown("space")&&gameState===START){
    gameState= PLAY;
   }
  
   
   if(gameState===PLAY){
     
    if(musicCount===0){
      backgroundSound.loop();
      musicCount=1;
    }

    if(count===0){

      backGround= createSprite(300,180,600,20);
      backGround.addImage(backGroundImage);
      backGround.scale=1;
      backGround.velocityX=-3;

      hero = createSprite(290,170,20,20);
      hero.addImage(heroImage);
      hero.scale=0.45;
      count=1;
      //hero.debug = true;
      hero.setCollider("circle",0,0,100);

      musicSp = createSprite(30,30,30,30);
      musicSp.visible= false;
    }

     musicSp.visible= true;
     if(music===0){
       if(mousePressedOver(musicSp)){
         music===1;
         backgroundSound.stop();
         console.log("stopMusic");
       }
     }
      if(music===1){
       if(mousePressedOver(musicSp)){
         music===0;
         backgroundSound.loop();
         console.log("startMusic");
       }
     }
    
    //backGround.visible=true;
    //hero.visible=true;
    //banner.visible=false;
    //gameOver.visible=false;
    
    if(backGround.x<0){
    backGround.x=backGround.width/2;
  }
    hero.y= World.mouseY;
  
    if(sprayGroup.isTouching(virusGroup)){
    virusGroup.destroyEach();
    sprayGroup.destroyEach();
    //sprayGroup2.destroyEach();
    score= score+1;
    killSound.play();
    }

  // if(sprayGroup.isTouching(enemyGroup)){
  //   enemyGroup.destroyEach();
  //   sprayGroup.destroyEach();
  //   sprayGroup2.destroyEach();
  //   score= score+1;
  // }

  // if(sprayGroup2.isTouching(virusGroup)){
  //   virusGroup.destroyEach();
  //   sprayGroup.destroyEach();
  //   sprayGroup2.destroyEach();
  //   score= score+1;
  // }

  if(sprayGroup.isTouching(enemyGroup)){
    enemyGroup.destroyEach();
    sprayGroup.destroyEach();
    //sprayGroup2.destroyEach();
    score= score+1;
    killSound.play();
  }

   spawnVirus();
   spawnEnemy();
   if(keyWentDown(LEFT_ARROW)||keyWentDown(RIGHT_ARROW)){
    spray(); 
   }
   

   //console.log(hero);
    if(hero.isTouching(virusGroup)||hero.isTouching(enemyGroup)){
    gameState=END;
    endSound.play();
  }
  }
   
  
  if(gameState===END){
    hero.destroy();
    virusGroup.destroyEach();
    enemyGroup.destroyEach();
    sprayGroup.destroyEach();
    //sprayGroup2.destroyEach();
    backGround.destroy();
    backgroundSound.stop();
    if(live!==0&& live>0)
    background("black");
    //gameOver.visible=true;
    reset.visible=true;
    
   
  
    if(live>0){
      if(mousePressedOver(reset)){
      gameState=PLAY;
      count=0;
      live-=1;
      musicCount=0;
    }}

     if(live<=0){
       gameState=OVER;
      imageMode(CENTER);
      image(gameOverImage,300,200,600,400);
      restart.visible=true;
      reset.visible=false;
     
      if(mousePressedOver(restart)){
      gameState=START;
      count=0;
      live=3;
      
      restart.visible=false;
      //banner.depth= restart.depth+1;
    }
  }
  
  }
  
    drawSprites();
    
    textSize(15);
    stroke("black");
    fill("black");
    text("SCORE:"+score,530,20);
}

function spawnVirus(){
  if(frameCount%150===0){
    virus= createSprite(650,100,40,10);
    virus.y = Math.round(random(10,200));
    virus.addImage(virusImage);
    virus.scale = 0.4;
    virus.velocityX = -6;
    virus.lifetime=240;
    virusGroup.add(virus);
  }
}

function spawnEnemy(){
  if(frameCount%400===0){
    virus= createSprite(-10,100,40,10);
    virus.y = Math.round(random(10,200));
    virus.addImage(virusImage2);
    virus.scale = 0.4;
    virus.velocityX = 3;
    virus.lifetime=220;
    enemyGroup.add(virus);
  }
}

function spray(){
  if(keyWentDown("LEFT_ARROW")){
    var spray= createSprite(hero.x-74,hero.y-33,20,20);
  spray.addImage(sprayImage2);        
  spray.scale=0.45;
  
  spray.velocityX = -6;
  spray.lifetime = 180;
  sprayGroup.add(spray);
  }

  if(keyWentDown("RIGHT_ARROW")){
    var spray= createSprite(hero.x+74,hero.y-33,20,20);
  spray.addImage(sprayImage);        
  spray.scale=0.45;
  spray.velocityX = 3;
  spray.lifetime = 180;
  sprayGroup.add(spray);
  }
   
}
