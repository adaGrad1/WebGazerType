$().ready(function(){

  // webgazer.showVideo(false);
  webgazer.saveDataAcrossSessions(false)
  // this starts the library
  f = webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    var xprediction = data.x; //these x coordinates are relative to the viewport
    var yprediction = data.y; //these y coordinates are relative to the viewport
  }).begin();

  // these store the last 50 coordinates of eye pos
  queuex = [];
  queuey = [];

  function mean(arr) {
    if(arr.length < 1) {
      return 0;
    }
    return arr.reduce((a, b) => a +b) / arr.length;
  }


  $("#webgazerGazeDot").ready(function(){
    setInterval(function(){
      var OF = $("#webgazerGazeDot").offset();

      queuex.push(OF.left);
      if(queuex.length > 20) {
        queuex.shift();
      }
      queuey.push(OF.top);
      if(queuey.length > 20) {
        queuey.shift();
      }
    }, 10);
  });

  setInterval(function() {
    xbar = mean(queuex);
    ybar = mean(queuey);
    $("#gamepos").offset({top:ybar, left:xbar});
    // console.log(xbar, ybar);
  }, 50)
});

function getX() {
  return $("#gamepos").offset().left;
  // return mean(queuex);
}

function getY() {
  return $("#gamepos").offset().top;
  // return mean(queuey);
}
