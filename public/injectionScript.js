// Code here.
// If you want to use a variable, use $ and curly braces.
// For example, to use a fixed random number:
// var someFixedRandomValue = "weerwe";

// Also in react based content script it doesnt work right from the load, need some small time to mount

document.addEventListener("seek_to_event", function (e) {
  console.log("seek_to_event received with data", e);
  document.getElementById("movie_player").seekTo(e.detail.seconds);
});

document.addEventListener("pause_video", function (e) {
  console.log("pause_video received", e);
  document.getElementById("movie_player").pauseVideo();
});

/* Example: Send data from the page to your Chrome extension 
          document.dispatchEvent(new CustomEvent('RW759_connectExtension', {
              detail: document.getElementById('movie_player').getCurrentTime()  
          }));
          */

// NOTE: Do not insert unsafe variables in this way, see below
// at "Dynamic values in the injected code"
