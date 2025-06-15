window.addEventListener("load", startup, false);

function startup() {
    const video = document.getElementById("video");

    document.addEventListener("keypress", function(e) {
        if (e.key === 'Enter') {
            toggleFullScreen(video);
        }
    }, false);
}

function toggleFullScreen(video) {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}