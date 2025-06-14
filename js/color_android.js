function toggleFullscreen(img) {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        img.requestFullscreen().catch(err => {
            console.error('Ошибка при переходе в полноэкранный режим:', err);
        });
    }
}