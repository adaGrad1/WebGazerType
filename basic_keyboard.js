var ctx

function init(){
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');
  canvas.style.backgroundColor = "#33FFFF";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Call this 20fps
  window.setInterval(function(){
      loop();
  }, 1000 / 20)
}

function loop(){
  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
  ctx.rect(20, 20, 150, 100);
  ctx.stroke();
}

window.onload = init()