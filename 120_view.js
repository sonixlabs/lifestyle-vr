$(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var api_key = "YOUR-API-KEY";
    $('#map').attr("src", "https://maps.googleapis.com/maps/api/staticmap?size=640x400&visible="+position.coords.latitude+","+position.coords.longitude+"&sensor=true&zoom=16&key="+api_key);
  });
  
  var video = document.getElementById('camera');
  var localMediaStream = null;
  var hasGetUserMedia = function() {
    return (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  };

  var onFailSoHard = function(e) {
    console.log('エラー!', e);
  };

  if(!hasGetUserMedia()) {
    alert("未対応ブラウザです。");
  } else {
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.getUserMedia({video: true}, function(stream) {
      video.src = window.URL.createObjectURL(stream);
      localMediaStream = stream;
    }, onFailSoHard);
  }
});
