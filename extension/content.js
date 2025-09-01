let video = null;
let lastStart = null;

function trackVideo() {
  video = document.querySelector("video");
  if (!video) return;

  video.addEventListener("play", () => {
    lastStart = Date.now();
  });

  video.addEventListener("pause", () => {
    if (lastStart) {
      let watched = Date.now() - lastStart;
      chrome.runtime.sendMessage({ event: "watched", time: watched });
      lastStart = null;
    }
  });

  video.addEventListener("ended", () => {
    if (lastStart) {
      let watched = Date.now() - lastStart;
      chrome.runtime.sendMessage({ event: "watched", time: watched });
      lastStart = null;
    }
  });
}

setInterval(trackVideo, 2000);