var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,monkey_Image;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score,ground,bananaGot,bananaSound;

function preload(){
monkey_Image = loadAnimation("sprite_7.png")  
  
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
bananaSound =loadSound("135936__bradwesson__collectcoin.wav");
}



function setup() {
createCanvas(600,400);
background("aqua");
 
monkey = createSprite(50,325,20,20);  
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.17;  
  
ground = createSprite(200,380,1500,20);
ground.shapeColor  = ("black");
ground.x = ground.width/2;  
ground.velocityX = -4;  
  
  
 obstacleGroup = createGroup();
  foodGroup = createGroup();  
  bananaGot = 0;
  score = 0;
}


function draw() {



background("lightblue")
textSize(18);
textFont("algerian")  
fill("black")
text("Score:"+score,450,50,100);   
text("banana Got:"+bananaGot,50,50,100);

    

 if (gameState === PLAY){
monkey.setCollider("rectangle",0,0,550,590);
monkey.debug = false;    
    //add gravity
monkey.velocityY = monkey.velocityY + 0.45
score = score + Math.round(getFrameRate()/50);


score = score + Math.round(getFrameRate()/50);
 if(keyDown("space")&& monkey.y >= 317) {
monkey.velocityY = -13;
 }
   
if (ground.x < 0){
ground.x = ground.width/4;
}
 monkey.velocityY = monkey.velocityY + 0.1 ;

 if( monkey.isTouching(foodGroup)){
 foodGroup.destroyEach();
 bananaGot = bananaGot+1
 bananaSound.play();
 }
obstacles();  
banana();  
     

 
 }
 if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  
  else if (gameState === END) {
    

    monkey.addAnimation("moving",monkey_Image);
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
  
    //change the trex animation
   
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    
    
  }  
  
  
  
  
  
  
  

monkey.collide(ground) 
  
drawSprites();
}

function banana(){
if ( frameCount%80 === 0){
var banana = createSprite(600,(random(120,200)),20,20)    
banana.addImage(bananaImage);
banana.scale = 0.15;  
banana.velocityX =  -7;    
banana.lifetime = 90;  
foodGroup.add(banana);  
    }
}

function obstacles(){
if( frameCount%300 === 0){
var obstacle = createSprite(600,350,20,20);
obstacle.addImage(obstacleImage);  
obstacle.scale = 0.2;    
obstacle.velocityX = -7  
obstacle.lifetime  = 90; 
    
obstacleGroup.add(obstacle)    
    } 
}



