var ghost, ghost_Image;
var climber,climber_Image;
var door, door_Image;
var tower,tower_Image;
var invisibleBlock;
var doorGroup,climberGroup, invisibleBlockGroup;
var spookySound;

var gameState="PLAY";
function preload(){
tower_Image=loadImage("tower.png");  

door_Image=loadImage("door.png");  
  
climber_Image=loadImage("climber.png");
  
ghost_Image=loadImage("ghost-standing.png"); 

spookySound=loadSound("spooky.wav");  
  
  
  

}

function setup(){
 spookySound.play(); 
 createCanvas(600,600);
  
 //creating tower 
 tower=createSprite(300, 300);
 tower.addImage("tower" ,tower_Image);
 tower.velocityY=10; 
  
  //groups
 doorGroup=createGroup();
 climberGroup=createGroup();
 invisibleBlockGroup=createGroup(); 
  
 //creating ghost
  ghost=createSprite(200, 200, 50, 50);
  ghost.addImage(ghost_Image);
  ghost.scale=0.3;
}

function draw(){
 if(gameState === "PLAY"){ 
 if(tower.y > 400){
   tower.y=300;
 } 
 //calling the functions
  Spawndoors();
  
 //making the ghost movable
  if(keyDown("space")){
    ghost.velocityY = -10;
  }
  if(keyDown("left_Arrow")){
   ghost.velocityX = -3;  
  }
  
  if(keyDown("right_Arrow")){
   ghost.velocityX = 3;  
  }
  
  ghost.velocityY = ghost.velocityY + 1;
 
  //define the depth
 // ghost.depth = door.depth;
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
  ghost.destroy();
  gameState="END";  
  }
 drawSprites(); 
 }  
 if(gameState==="END"){
   textSize(30);
   fill("yellow");
   stroke("yellow");
   text("Game Over", 230,250)
   

 } 
  
}
function Spawndoors(){
 if(frameCount%240 === 0){
  door=createSprite(200,-50);
  door.addImage(door_Image);
  door.velocityY=1; 
  door.x=Math.round(random(120,240)); 
  door.lifetime=800;
  doorGroup.add(door);
   
  climber=createSprite(200, 10);
  climber.addImage(climber_Image);
  climber.velocityY=1; 
  climber.x=door.x;
  climberGroup.add(climber); 
   
  invisibleBlock=createSprite(200, 15);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2; 
  invisibleBlock.x = door.x; 
  invisibleBlock.visible=false;
  invisibleBlockGroup.add(invisibleBlock)


 }
  
}