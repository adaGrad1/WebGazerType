$().ready(function(){
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;
  const MARGIN_HEIGHT = HEIGHT * 0.1
  const MARGIN_WIDTH = WIDTH * 0.1
  const BOX_HEIGHT = (HEIGHT - MARGIN_HEIGHT*3)/2;
  const BOX_WIDTH = (WIDTH - MARGIN_WIDTH*4)/3;
  const BOX_COLOR = "#FFC0CB";


  var canvas = document.getElementById('keyboard');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  ctx = canvas.getContext("2d");

  function Box(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  Box.prototype.render = function(color, ctx) {
    ctx.strokeStyle = color;
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.stroke();
  }

  b = new Box(MARGIN_WIDTH, MARGIN_HEIGHT, BOX_WIDTH, BOX_HEIGHT);
  b2 = new Box(MARGIN_WIDTH, MARGIN_HEIGHT*2 + BOX_HEIGHT, BOX_WIDTH, BOX_HEIGHT);
  // console.log(WIDTH, HEIGHT, BOX_WIDTH, BOX_HEIGHT);
  // b = new Box(WIDTH * 0.1, 0, 10, 10);
  b.render(BOX_COLOR, ctx);
  b2.render(BOX_COLOR, ctx);
});
