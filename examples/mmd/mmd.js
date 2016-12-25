var videos = [];
var localMediaStream = null;

function gotSources(sourceInfos) {
  for (var i = 0; i !== sourceInfos.length; ++i) {
    var sourceInfo = sourceInfos[i];
    if (sourceInfo.kind === 'video') {
      videos.push(sourceInfo);
    } else {
      console.log('Some other kind of source: ', sourceInfo);
    }
  }
  config = {
    video: {
      optional: [{
        sourceId: videos[videos.length-1].id
      }]
    }
  };
  setVideoSphere(config);
}

function setVideoSphere(config) {
  var onFailSoHard = function(e) {
    console.log('エラー!', e);
  };
  
  navigator.getUserMedia(config, function(stream) {
    var video = document.getElementById('camera');
    video.src = window.URL.createObjectURL(stream);
    localMediaStream = stream;
    html  = '<a-entity position="0 0 0.25" rotation="0 -30 0">';
    html += '<a-sphere src="#camera" offset="0 -0.16666" radius="12" repeat="1 1.33333" shader="flat" phi-length="-120" phi-start="0" theta-length="120" theta-start="30"></a-sphere>';
    html += '</a-entity>';
    $('a-camera').append(html);
  }, onFailSoHard);
}

$(function() {
  var hasGetUserMedia = function() {
    return (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  };

  if(!hasGetUserMedia()) {
    alert("未対応ブラウザです。");
  } else {
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (typeof MediaStreamTrack === 'undefined' || typeof MediaStreamTrack.getSources === 'undefined') {
      setVideoSphere({video: true});
    } else {
      MediaStreamTrack.getSources(gotSources);
    }
  }
});
