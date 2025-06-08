const range = document.getElementById('duration');
const valueDisplay = document.getElementById('value');

range.addEventListener('input', () => {
    valueDisplay.textContent = range.value;
});

function vibrate() {
    const duration = Number(range.value);
    if ('vibrate' in navigator) {
        navigator.vibrate(duration);
    } else {
        alert('Ваш браузер не підтримує вібрацію.');
    }
}