document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('drawCanvas');
    const ctx = canvas.getContext('2d');
    const xCoord = document.getElementById('x-coord');
    const yCoord = document.getElementById('y-coord');
    const clearButton = document.getElementById('clearButton');
    const horizontalGuide = document.getElementById('horizontal-guide');
    const verticalGuide = document.getElementById('vertical-guide');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.clientX, e.clientY];

        horizontalGuide.style.top = `${e.clientY}px`;
        verticalGuide.style.left = `${e.clientX}px`;
        horizontalGuide.style.display = 'block';
        verticalGuide.style.display = 'block';
        updateCoordinates(e);
    });

    canvas.addEventListener('mousemove', (e) => {
        updateCoordinates(e);

        horizontalGuide.style.top = `${e.clientY}px`;
        verticalGuide.style.left = `${e.clientX}px`;
        horizontalGuide.style.display = 'block';
        verticalGuide.style.display = 'block';

        if (!isDrawing) {
            return;
        }

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
        [lastX, lastY] = [e.clientX, e.clientY];
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
        horizontalGuide.style.display = 'none';
        verticalGuide.style.display = 'none';
    });

    clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    function updateCoordinates(e) {
        xCoord.textContent = `X: ${e.clientX}`;
        yCoord.textContent = `Y: ${e.clientY}`;
    }

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });
});
