const car = document.getElementById('car');
const track = document.getElementById('track');
const scoreElement = document.getElementById('score');

let score = 0;
let isGameOver = false;

document.addEventListener('keydown', function(event) {
    if (!isGameOver) {
        if (event.key === 'ArrowLeft' && car.offsetLeft > 0) {
            car.style.left = car.offsetLeft - 10 + 'px';
        } else if (event.key === 'ArrowRight' && car.offsetLeft < track.offsetWidth - car.offsetWidth) {
            car.style.left = car.offsetLeft + 10 + 'px';
        }
    }
});

function moveTrack() {
    if (!isGameOver) {
        track.style.top = parseInt(track.style.top || '0') + 1 + 'px';
        score++;
        scoreElement.textContent = 'Score: ' + score;
    }
}

function checkCollision() {
    const carRect = car.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();

    if (
        carRect.bottom >= trackRect.bottom ||
        carRect.top <= trackRect.top ||
        carRect.right >= trackRect.right ||
        carRect.left <= trackRect.left
    ) {
        gameOver();
    }
}

function gameOver() {
    isGameOver = true;
    alert('Game Over! Your score: ' + score);
    window.location.reload();
}

setInterval(moveTrack, 20);
setInterval(checkCollision, 20);
