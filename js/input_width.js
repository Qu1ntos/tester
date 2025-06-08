function updateWidth() {
  const width = window.innerWidth;
  const seventyFivePercent = Math.round(width * 0.75);
  const input = document.getElementById('duration');
  input.style.width = seventyFivePercent + 'px';

  console.log("Ширина экрана: " + width + "px");
  console.log("75% ширины экрана: " + seventyFivePercent + "px");
}

window.addEventListener('resize', updateWidth);
updateWidth();