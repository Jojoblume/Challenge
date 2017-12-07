//Source: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

var constraints = { video: true};

navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  /* use the stream */
  var video = document.querySelector('video');
  video.srcObject = stream;
  video.onloadedmetadata = function(e) {
    video.play();
  }
})
.catch(function(err) {
  /* handle the error */
  console.log(err.name + ": " + err.message);
})
