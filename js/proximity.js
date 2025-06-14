const statusEl = document.getElementById('status');

if ('ProximitySensor' in window) {
    try {
        const sensor = new ProximitySensor();
        sensor.addEventListener('reading', () => {
            statusEl.textContent = `Відстань: ${sensor.distance} cm`;
        });
        sensor.addEventListener('error', event => {
            statusEl.textContent = `Помилка датчика наближення: ${event.error.name}`;
        });
        sensor.start();
    } catch (error) {
        statusEl.textContent = `Помилка: ${error.message}`;
    }
}

else if ('ondeviceproximity' in window) {
    window.addEventListener('deviceproximity', function(event) {
        statusEl.textContent = `Відстань: ${event.value} cm`;
    });
}

else {
    statusEl.textContent = "Ваш пристрі не підтримує датчик наближення.";
}