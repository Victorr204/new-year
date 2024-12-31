const countdownElement = document.getElementById('time');
const messageElement = document.getElementById('message');
const fireworksCanvas = document.getElementById('fireworks');
const ctx = fireworksCanvas.getContext('2d');

fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

const updateCountdown = () => {
  const now = new Date();
  const newYear = new Date('January 1, 2025 00:00:00');
  const diff = newYear - now;

  if (diff <= 0) {
    document.querySelector('.countdown').style.display = 'none';
    messageElement.style.display = 'block';
    startFireworks();
    clearInterval(interval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const interval = setInterval(updateCountdown, 1000);

// Fireworks effect
const particles = [];

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 2 + 1;
    this.alpha = 1;
    this.velocityX = Math.random() * 6 - 3;
    this.velocityY = Math.random() * 6 - 3;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.alpha -= 0.02;
  }
}

const startFireworks = () => {
  setInterval(() => {
    const x = Math.random() * fireworksCanvas.width;
    const y = Math.random() * fireworksCanvas.height / 2;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(x, y, color));
    }
  }, 500);

  animateFireworks();
};

const animateFireworks = () => {
  ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

  particles.forEach((particle, index) => {
    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    } else {
      particle.update();
      particle.draw();
    }
  });

  requestAnimationFrame(animateFireworks);
};

updateCountdown();