// Dimensions
const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const RECT_WIDTH = 100;
const RECT_HEIGHT = 200;

// Colors
const BACKGROUND_COLOUR = "#000000";
const RECT_COLOR = "#FFFFFF";
const BALL_COLOUR = "#FFFFFF";

// Get the middle y-value to draw the Letter using the relationship between
// the height of the canvas and the height of the Letter
const MIDDLE_Y = (GAME_HEIGHT-RECT_HEIGHT)/2

/* Entities in the game */
var player = new Player();
var computer = new Computer();
var ball = new Ball(GAME_WIDTH/2, GAME_HEIGHT/2);

/* Letter */
function Letter(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

Letter.prototype.render = function(colour) {
  context.fillStyle = colour;
  context.fillRect(this.x, this.y, this.width, this.height);
}

Letter.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if (this.y < 0) {
    // all the way to the bottom
    this.y = 0;
    this.y_speed = 0;
  } else if (this.y + this.height > GAME_HEIGHT) {
    // all the way to the top
    this.y = GAME_HEIGHT - this.height;
    this.y_speed = 0;
  }
}

/* BALL */
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 3;
  this.y_speed = 0;
  this.radius = 10;
}

Ball.prototype.render = function(colour) {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = colour;
  context.fill();
}

Ball.prototype.update = function(Letter1, Letter2) {
  this.x += this.x_speed;
  this.y += this.y_speed;

  var top_x = this.x - 5;
  var top_y = this.y - 5;

  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if (this.y - 5 < 0) { // hitting the top wall
    this.y = 5;
    this.y_speed = -this.y_speed;
  } else if (this.y + 5 > GAME_HEIGHT) { // hitting the bottom wall
    this.y = GAME_HEIGHT-5;
    this.y_speed = -this.y_speed;
  }

  // A point was score, reset the ball
  if (this.x < 0 || this.x > GAME_WIDTH) {
    this.x_speed = 3;
    this.y_speed = 0;
    this.x = GAME_WIDTH/2;
    this.y = GAME_HEIGHT/2;
    Letter1.y = MIDDLE_Y;
    Letter2.y = MIDDLE_Y;
  }

  if (top_x < 300) {
    if (top_y < (Letter1.y + Letter1.height) && bottom_y > Letter1.y
      && top_x < (Letter1.x + Letter1.width) && bottom_x > Letter1.x) {
      // hit the player's Letter
      this.x_speed = 3;
      this.y_speed += (Letter1.y_speed / 2);
      this.x += this.x_speed;
    }
  } else {
    if (top_y < (Letter2.y + Letter2.height) && bottom_y > Letter2.y
      && top_x < (Letter2.x + Letter2.width) && bottom_x > Letter2.x) {
      // hit the computer's Letter
      this.x_speed = -3;
      this.y_speed += (Letter2.y_speed / 2);
      this.x += this.x_speed;
    }
  }
};

/* PLAYER */
function Player() {
  this.Letter = new Letter(10, MIDDLE_Y, RECT_WIDTH, RECT_HEIGHT);
}

Player.prototype.update = function() {
  for (var key in keysDown) {
    var value = Number(key);

    if (value == KEY_LEFT) {
      this.Letter.move(-4, 0);
    } else if (value == KEY_RIGHT) {
      this.Letter.move(4, 0);
    } else {
      this.Letter.move(0, 0);
    }
  }
}

Player.prototype.render = function(colour) {
  this.Letter.render(colour);
}

/* COMPUTER */
function Computer() {
  this.Letter = new Letter(GAME_WIDTH-20, MIDDLE_Y, RECT_WIDTH, RECT_HEIGHT);
}

Computer.prototype.update = function(ball) {
  
}

// Tell the browser we wish to perform animation
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };

// Set up a 2D canvas
var canvas = document.createElement('canvas');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
var context = canvas.getContext('2d');

// When the page loads, attach the canvas to the screen
window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};

var step = function() {
  update();       // Update all our objects
  render();       // Render those objects
  animate(step);  // Use requestAnimationFrame to call step()
};

var update = function() {
  player.update();
  computer.update(ball);
  ball.update(player.Letter, computer.Letter);
};

var render = function() {
  context.fillStyle = BACKGROUND_COLOUR;
  context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  player.render(RECT_COLOR);
  ball.render(BALL_COLOUR);
}

/* CONTROLS */
var keysDown = {}; // Keep track of which key is pressed

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
})