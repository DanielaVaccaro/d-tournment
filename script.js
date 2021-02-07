

var lastPos = document.body.scrollTop || document.documentElement.scrollTop,
    perspective = 800,
    zSpacing = -300;
    zVals = [],
    $frames = $(".frame"),
    frames = $frames.toArray(),
    scrollMsg = document.getElementById("instructions-overlay");
    numFrames = $frames.length;

for(var i=0; i<numFrames;i++) { zVals.push((numFrames-i)*zSpacing);}

$(window).scroll(function(d,e) {
  var top = document.body.scrollTop || document.documentElement.scrollTop,
      delta = lastPos - top;
  lastPos = top;
  for(var i=0;i<numFrames;i++){
    var newZVal = (zVals[i]+=(delta*-1.5)),
        frame = frames[i],
        transform = "translateZ("+newZVal+"px)",
        opacity = newZVal < 1000 ? 1 : 1 - parseInt((newZVal-200)/(perspective-200)*10)/10,
        display = newZVal > perspective ? "none" : "block";
    frame.setAttribute("style",
      "-webkit-transform:"+transform+";-moz-transform:"+transform+";display:"+display+";opacity:"+opacity);
    if(scrollMsg && zVals[numFrames-1] > 200) {
      scrollMsg.parentNode.removeChild(scrollMsg);
      scrollMsg = null;
    }
  }
});



$(function(){
  var $refreshButton = $('#refresh');
  var $results = $('#css_result');

  function refresh(){
    var css = $('style.cp-pen-styles').text();
    $results.html(css);
  }

  refresh();
  $refreshButton.click(refresh);

  // Select all the contents when clicked
  $results.click(function(){
    $(this).select();
  });
});
