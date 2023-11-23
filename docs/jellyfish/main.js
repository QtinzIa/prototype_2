title = "King of the Ocean";

description = `
[Tap] Turn
[Hold] Attack
`;

characters = [];

options = {
  theme: "shapeDark",
  viewSize: {x:300, y:300},
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 3
};

let player;
let move;
let speed;
let speed2;
let speed3;
let fish;
let enemies;

function update() {
  if (!ticks) {
    player = vec(150, 285);
    move = vec(0, 2);
    speed = 2;
    speed2 = 2;
    speed3 = 3;
    fish = [];
    enemies = [];
  }

  // draw the player object
  color("yellow");
  box(player,7);
  
  // make the player move
  player.add(move);

  // Bounce back when hitting the top boundary
  if (player.y < 1) {
    player.y = 1;
    move.y *= -1;
  }

  // Bounce back when hitting the left boundary
  if (player.x < 1) {
    player.x = 1;
    move.x *= -1;
  }

  // Bounce back when hitting the bottom boundary
  if (player.y > 299) {
    player.y = 299;
    move.y *= -1;
  }

  // Bounce back when hitting the right boundary
  if (player.x > 299) {
    player.x = 299;
    move.x *= -1;
  }

  // change direction after attacking
  if (input.isJustPressed) {
    speed = move.y;
  }

  // change direction
  if (input.isJustReleased) {
    move.y = -1 * speed;
  }

  // stop and attack
  if (input.isPressed) {
    color("cyan");
    arc(player, 25, 3, 360);
    move.y = 0;
  }

  // update fish
  updateFish();

  updateEnemies();
}

function updateFish() {
  if (rnd() < 0.02) {

    // either from left or from right; move to other side
    const fromLeft = rnd() < 0.5;
    const xPosition = fromLeft ? 0 : 300;
    const directionX = fromLeft ? 1 : -1;

    fish.push({
      pos: vec(xPosition, rnd(5, 295)),
      direction: vec(rnd(0.5, 0.8) * speed2 * directionX, rnd(-0.5, 0.5)),
    });
  }
  color("black");

  // make the fish move
  fish.forEach((f, index) => {
    f.pos.add(f.direction);

    // check collision
    if (box(f.pos,5).isColliding.rect.cyan) {
      play("coin");
      console.log(1);
      addScore(5);
      fish.splice(index, 1);
    }
  });
}

function updateEnemies() {
  if (rnd() < 0.004) {

    // either from left or from right; move to other side
    const fromLeft = rnd() < 0.5;
    const xPosition = fromLeft ? 0 : 300;
    const directionX = fromLeft ? 1 : -1;

    enemies.push({
      pos: vec(xPosition, rnd(5, 295)),
      direction: vec(rnd(0.5, 0.8) * speed3 * directionX, 0),
    });
  }
  color("red");

  // make the enemies move
  enemies.forEach((enemy, index) => {
    enemy.pos.add(enemy.direction);

    // check collision
    if (box(enemy.pos,20).isColliding.rect.yellow) {
      play("hit");
      end();
    }
  });
}