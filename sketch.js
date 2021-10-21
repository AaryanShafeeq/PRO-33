const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Composite = Matter.Composite;
const Composites = Matter.Composites;
const Constraint = Matter.Constraint;

let rope1, rope2;
let bubble, bubbleImg;
let button1, button2;
let shelf;
let bunny;
let link1, link2;

let bgImg;
let blink;
let eat, sad;
let fruitImg, fruit;

function preload() {
  bgImg = loadImage("./assets/background.png");
  fruitImg = loadImage("./assets/melon.png");
  bubbleImg = loadImage("./assets/bubble.png");

  sad = loadAnimation("./assets/sad.png");
  blink = loadAnimation("./assets/blink_1.png", "./assets/blink_2.png", "./assets/blink_3.png");
  eat = loadAnimation("./assets/eat_1.png", "./assets/eat_2.png");
}

function setup() {
  createCanvas(600, 700);
  engine = Matter.Engine.create();
  world = engine.world;

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(270, 100);
  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("crying", sad);
  bunny.addAnimation("eating", eat);
  bunny.scale = 0.2;

  bubble = createSprite(300, 300, 20);
  bubble.addAnimation("bubble", bubbleImg);
  bubble.scale = 0.1;

  button1 = createImg("./assets/cut_btn.png");
  button1.position(200, 320);
  button1.size(50, 50);
  button1.mouseClicked(cut1);

  button2 = createImg("./assets/cut_button.png");
  button2.position(30, 420);
  button2.size(50, 50);
  button2.mouseClicked(cut2);

  shelf = new Ground(300, 170, 100, 10);

  rope1 = new Rope(5, { x: 230, y: 330 });
  rope2 = new Rope(4, { x: 50, y: 450 });

  fruit = Bodies.circle(100, 400, 15, { restitution: 0.8 });
  World.add(world, fruit);

  link1 = new Link(rope1, fruit);
  link2 = new Link(rope2, fruit);
}

function draw() {
  background("blue");
  image(bgImg, 0, 0, width, height);

  Matter.Engine.update(engine);

  shelf.show();

  rope1.show();
  rope2.show();

  push();
  imageMode(CENTER);
  if (fruit != null) {
    image(fruitImg, fruit.position.x, fruit.position.y, 70, 70);
  }
  pop();

  if (collide(fruit, bunny, 80)) {
    cut1();
    bubble.visible = false;
    bunny.changeAnimation("eating")

    World.remove(engine.world.fruit);
    fruit = null;
  }

  drawSprites();
}

function collide(body, sprite, x) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= x) {
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }
}

function cut1() {
  rope1.break();
  link1.detach();
  link1 = null;
}

function cut2() {
  rope2.break();
  link2.detach();
  link2 = null;
}