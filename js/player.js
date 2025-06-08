const audio = document.getElementById('player');

function playAudio() {
    audio.play();
}

function pauseAudio() {
    audio.pause();
}

audio.volume = 1;

function rewind() {
    audio.currentTime = Math.max(0, audio.currentTime - 5);
}

function forward() {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
}