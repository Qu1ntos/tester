const field = document.getElementById("field");
const ball = document.getElementById("ball");

let x = 130, y = 130;

const fieldSize = 300;
const ballSize = 40;
const maxX = fieldSize - ballSize;
const maxY = fieldSize - ballSize;

const sensitivity = 1.5;

window.addEventListener('devicemotion', function(event) {
    if (!event.accelerationIncludingGravity) return;

    const ax = event.accelerationIncludingGravity.x;
    const ay = event.accelerationIncludingGravity.y;

    x += ax * sensitivity;
    y -= ay * sensitivity;

    x = Math.max(0, Math.min(maxX, x));
    y = Math.max(0, Math.min(maxY, y));

    ball.style.left = x + "px";
    ball.style.top = y + "px";
});