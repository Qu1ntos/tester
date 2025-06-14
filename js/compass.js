const compass = document.getElementById('compass');
const angleDisplay = document.getElementById('angle');
const permissionBtn = document.getElementById('requestPermission');

function handleOrientation(event) {
    let alpha = event.alpha;
    if (typeof event.webkitCompassHeading !== "undefined") {
        alpha = event.webkitCompassHeading;
    } else {
        alpha = 360 - alpha;
    }

    compass.style.transform = `rotate(${alpha}deg)`;
    angleDisplay.textContent = `Кут: ${Math.round(alpha)}°`;
}

function initCompass() {
    if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
        permissionBtn.style.display = 'block';
        permissionBtn.addEventListener('click', () => {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation, true);
                        permissionBtn.style.display = 'none';
                    }
                })
                .catch(console.error);
        });
    } else {
        window.addEventListener('deviceorientation', handleOrientation, true);
    }
}

window.addEventListener('load', initCompass);