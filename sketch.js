const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var bridge, base;
var rightWall, leftWall;
var jointPoint;
var jointLink;
var zombie;
var zombie1, zombie2, zombie3, zombie4, sadZombie;
var breakButton;
var bg;

var stones = [];
var collided = false;

function preload(){
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");

  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");
  sadZombie = loadImage("./assets/sad_zombie.png");

  bg = loadImage("./assets/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  base = new Base(width-1520,height-50,width, height/15);
  rightWall = new Base(1398, 300, 100, 400);
  leftWall = new Base(2, 300, 100, 400);

  bridge = new Bridge(30, {x:50, y:height/2 - 140});
  jointPoint = new Base(width-250 ,height/2 - 100 , 40, 20);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for(var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-100, 100);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }

  zombie = createSprite(width / 2, height - 100, 50, 50);
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.addImage("sad", sadZombie);

  zombie.scale = 0.1
  zombie.velocityX = 10;
 
  breakButton = createImg("./assets/axe.png");
  breakButton.size(50,50);
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);
}

function draw() {
  background(bg);
  Engine.update(engine);

  //base.display();
  //rightWall.display();
  //leftWall.display();

  bridge.show();

  for(var stone of stones){
    stone.display();
    var pos = stone.body.position;
    var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y);
    if(distance <= 50){
      zombie.velocityX = 0;
      Matter.Body.setVelocity(stone.body, {x:10, y:-10});
      zombie.chngeImage("sad");
      collided = true;
    }
  }

  if(zombie.position.x >= width-300 && !collided){
    zombie.velocityX = -10;
    zombie.changeAnimation('rigthtoleft');
  }

  if(zombie.position.x <= 300 && !collided){
    zombie.velocityX = 10;
    zombie.changeAnimation('lefttoright');
  }
  
  drawSprites();
}

function handleButtonPress(){
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}