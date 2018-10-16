// Enemies our player must avoid
var Enemy = function (x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";

  this.x = x;
  this.y = y;
  this.x0 = x;
  this.y0 = y;
  this.dx = 140;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  this.x = this.x + (this.dx * dt);

  if (this.x >= 520) {
    this.x = this.x0;
    this.y = this.y0;
  }


  for (let i = 0; i < allEnemies.length; i++) {

    if (player.x >= allEnemies[i].x - 50 && player.x <= allEnemies[i].x + 50) {
      if (player.y >= allEnemies[i].y - 50 && player.y <= allEnemies[i].y + 50) {
        player.x = 200;
        player.y = 380;
      }
    }
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/char-boy.png";

  this.x = x;
  this.y = y;
};

Player.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  // When the player reaches the water, the game ends, a message of
  // congratulations appears at the top of the screen, and the player
  // appears at the initial position again, restarting the game
  if (this.y + 60 <= 0) {
    this.x = 200;
    this.y = 380;
    document.getElementById("result").innerHTML = "You Win!";
    setTimeout(function () {
      document.getElementById("result").innerHTML = "";
    }, 1000);
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (input) {
  if (input === "up" && this.y > -40) {
    this.y = this.y - 40;
  } else if (input === "down" && this.y < 400) {
    this.y = this.y + 40;
  } else if (input === "left" && this.x > 0) {
    this.x = this.x - 40;
  } else if (input === "right" && this.x < 400) {
    this.x = this.x + 40;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player(200, 380);
let random = Math.ceil(Math.random() * 100);

let e1 = new Enemy(random - 250, 220);
let e2 = new Enemy(random - 450, 150);
let e3 = new Enemy(random - 350, 110);
let e4 = new Enemy(random - 150, 50);

let allEnemies = [];

allEnemies.push(e1, e2, e3, e4);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});