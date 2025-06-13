const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> учасники'
}).addTo(map);

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            map.setView([lat, lon], 13);

            L.marker([lat, lon])
                .addTo(map)
                .bindPopup("Ви тут!")
                .openPopup();
        },
        (error) => {
            alert("Не вдалося отримати вашу геолокацію: " + error.message);
        }
    );
} else {
    alert("Ваш браузер не підтримує геолокацію.");
}