const luxOutput = document.getElementById('luxValue');

if ('AmbientLightSensor' in window) {
    try {
        const sensor = new AmbientLightSensor();
        sensor.addEventListener('reading', () => {
            luxOutput.textContent = `Освітленість: ${sensor.illuminance} люкс`;
        });

        sensor.addEventListener('error', event => {
            luxOutput.textContent = `Помилка: ${event.error.name}`;
        });

        sensor.start();
    } catch (err) {
        luxOutput.textContent = `Сенсор недоступний: ${err.message}`;
    }
} else if ('ondevicelight' in window) {
    window.addEventListener('devicelight', (event) => {
        luxOutput.textContent = `Освітленість: ${event.value} люкс`;
    });
} else {
    luxOutput.textContent = 'Датчик освітлення не підтримується цим пристроєм або браузером.';
}