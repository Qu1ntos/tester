const colors = [
    'rgb(0, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(0, 255, 0)',
    'rgb(0, 0, 255)',
    'rgb(255, 255, 255)'
];
let index = 0;

function changeBackground() {
    document.body.style.backgroundColor = colors[index];
    index = (index + 1) % colors.length;
}