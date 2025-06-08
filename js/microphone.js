const sourceSelect = document.getElementById('source-select');
const startBtn = document.getElementById('start-test');
const stopBtn = document.getElementById('stop-test');
const micBar = document.getElementById('mic-bar');
const micStatus = document.getElementById('mic-status');
const delayDisplay = document.getElementById('delay-display');
const delayMinus = document.getElementById('delay-minus');
const delayPlus = document.getElementById('delay-plus');
const video = document.getElementById('video');

let audioContext, analyser, microphone, dataArray, animationId;
let delayNode;
let stream;

let delayTime = 1.5;

function updateDelayDisplay() {
    delayDisplay.textContent = delayTime.toFixed(1);
}

async function startTest() {
    stopTest();

    let constraints = { audio: true, video: false };
    const source = sourceSelect.value;

    if (source === 'front-camera' || source === 'rear-camera') {
        constraints.video = {
            facingMode: (source === 'front-camera') ? 'user' : 'environment'
        };
        constraints.audio = true;
    } else if (source === 'mic') {
        constraints.audio = true;
        constraints.video = false;
    }

    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch(err) {
        micStatus.textContent = 'Помилка доступу: ' + err.message;
        return;
    }

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    microphone = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    microphone.connect(analyser);

    delayNode = audioContext.createDelay(5);
    delayNode.delayTime.value = delayTime;

    microphone.connect(delayNode);
    delayNode.connect(audioContext.destination);

    micStatus.textContent = 'Мікрофон активний';
    startBtn.disabled = true;
    stopBtn.disabled = false;
    sourceSelect.disabled = true;

    dataArray = new Uint8Array(analyser.frequencyBinCount);

    function updateMeter() {
        analyser.getByteFrequencyData(dataArray);
        let values = 0;
        for (let i = 0; i < dataArray.length; i++) {
            values += dataArray[i];
        }
        let average = values / dataArray.length;
        micBar.style.width = Math.min(100, average) + '%';
        animationId = requestAnimationFrame(updateMeter);
    }
    updateMeter();

    if (source === 'front-camera' || source === 'rear-camera') {
        video.style.display = 'block';
        video.srcObject = stream;
    } else {
        video.style.display = 'none';
        video.srcObject = null;
    }
}

function stopTest() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
    micStatus.textContent = 'Мікрофон не активний';
    micBar.style.width = '0%';
    startBtn.disabled = false;
    stopBtn.disabled = true;
    sourceSelect.disabled = false;
    cancelAnimationFrame(animationId);

    video.style.display = 'none';
    video.srcObject = null;
}

delayMinus.onclick = () => {
    delayTime = Math.max(0, delayTime - 0.5);
    updateDelayDisplay();
    if (delayNode) delayNode.delayTime.value = delayTime;
};

delayPlus.onclick = () => {
    delayTime = Math.min(5, delayTime + 0.5);
    updateDelayDisplay();
    if (delayNode) delayNode.delayTime.value = delayTime;
};

startBtn.onclick = startTest;
stopBtn.onclick = stopTest;

updateDelayDisplay();