//creates the variables
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg;

//creates the score
var treasure = 0;

//creates groups
var cashG,diamondsG,jwelleryG,swordG;

//creates the state of game variable
var GameState = "PLAY";

//creates the end pic
var Endgame;

//preloads the images
function preload(){
  pathImg = loadImage("Road.png");
  
  boyImg = loadAnimation("runner1.png","runner2.png");
  
  cashImg = loadImage("cash.png");
  
  diamondsImg = loadImage("diamonds.png");
  
  jwelleryImg = loadImage("jwell.png");
  
  swordImg = loadImage("sword.png");
  
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  //creates the canvas
  createCanvas(400,400);
  
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70,330,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.07;
  
  //assigns a new group to the following variables
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordG=new Group();

}

//draws the game
function draw() {
  
  //sets the color of the background
  background(0);
  
  //logic based on the different states of the game
  if (GameState == "PLAY") {
    //allows player to control boy using mouse
    boy.x = World.mouseX;
    
    //creates the edges and collision
    edges= createEdgeSprites();
    boy.collide(edges);
  
    //code to reset the background
    if(path.y > 400 ){
      path.y = height/2;
    } 
  
    //calls the functions for treasure and sword
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
     //reduces the collision radius of the boy
    boy.setCollider("circle",0,0,500)

     //if boy touches treasure or sword,what happens      =>
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasure = treasure + 100;

    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasure = treasure + 100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasure = treasure + 100;
      
    }else if(swordG.isTouching(boy)) {
      swordG.destroyEach();
      GameState = "END";
      
    }
  }else if(GameState == "END") {
    //stops path from moving
    path.velocityY = 0;
    
    //stops and destroys the sprites
    swordG.setVelocityYEach(0);
    swordG.setLifetimeEach(-1);
    swordG.destroyEach();
    
    jwelleryG.setVelocityYEach(0);
    jwelleryG.setLifetimeEach(-1);
    jwelleryG.destroyEach();
    
    diamondsG.setVelocityYEach(0);
    diamondsG.setLifetimeEach(-1);
    diamondsG.destroyEach();
    
    cashG.setVelocityYEach(0);
    cashG.setLifetimeEach(-1);
    cashG.destroyEach();
    
     //adds the game over image
    Endgame = createSprite(200,200);
    Endgame.addImage(endImg);
  }
  
  
  //draws the sprites
  drawSprites();
  
  //displays the score of treasure collected
  textSize(20);
  fill(255);
  text("Treasure: "+ treasure,150,30);

}

//functions for creating the treasure and obstacles
function createCash() {
  if (World.frameCount % 50 == 0) {
    
  //creation and properties of cash
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  
  //adds cash image
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
    
    //creation and properties of diamonds
    var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
    
    //adds diamond image
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
    
  //creation and properties of jwellery
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
    
  //adds jwellery image
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
    
  //creation and properties of sword
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10)); 
    
  //adds sword image
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordG.add(sword);
  }
}