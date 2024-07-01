const prizes = ['Ödül 1', 'Ödül 2', 'Ödül 3', 'Ödül 4', 'Ödül 5', 'Ödül 6'];
let deg = 0;

function drawWheel() {
    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const numOfSlices = prizes.length;
    const sliceDeg = 360 / numOfSlices;
    const radius = canvas.width / 2;

    for (let i = 0; i < numOfSlices; i++) {
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, (sliceDeg * i) * Math.PI / 180, (sliceDeg * (i + 1)) * Math.PI / 180);
        ctx.closePath();
        ctx.fillStyle = getRandomColor();
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(((sliceDeg * i) + (sliceDeg / 2)) * Math.PI / 180);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText(prizes[i], radius / 2, 10);
        ctx.restore();
    }
}

function spin() {
    const wheel = document.getElementById('wheel');
    deg = Math.floor(5000 + Math.random() * 5000);
    wheel.style.transform = `rotate(${deg}deg)`;

    wheel.addEventListener('transitionend', () => {
        const actualDeg = deg % 360;
        const sliceDeg = 360 / prizes.length;
        const index = Math.floor((360 - actualDeg + (sliceDeg / 2)) % 360 / sliceDeg);
        showPrize(prizes[index]);
    }, { once: true });
}

function showPrize(prize) {
    const prizeWindow = document.getElementById('prize-window');
    const overlay = document.getElementById('overlay');
    const prizeText = document.getElementById('prize-text');
    prizeText.textContent = prize;
    prizeWindow.style.display = 'block';
    overlay.style.display = 'block';
}

function closePrizeWindow() {
    const prizeWindow = document.getElementById('prize-window');
    const overlay = document.getElementById('overlay');
    prizeWindow.style.display = 'none';
    overlay.style.display = 'none';
}

document.getElementById('spin-button').addEventListener('click', spin);
document.getElementById('close-button').addEventListener('click', closePrizeWindow);

window.onload = () => {
    drawWheel();
};

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
