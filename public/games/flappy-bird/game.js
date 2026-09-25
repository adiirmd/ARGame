// ============================================
//   Flappy Bird — Game Engine
// ============================================

const canvas  = document.getElementById('gameCanvas');
const ctx     = canvas.getContext('2d');

function resize() {
  const maxH = window.innerHeight - 140;
  const maxW = window.innerWidth  - 32;
  const h    = Math.min(520, maxH);
  const w    = Math.min(360, maxW);
  canvas.width  = w;
  canvas.height = h;
}
resize();
window.addEventListener('resize', () => { resize(); if (!running) drawIdle(); });

const GRAVITY     = 0.38;
const JUMP        = -7.5;
const PIPE_W      = 52;
const PIPE_GAP    = () => canvas.height * 0.32;
const PIPE_SPEED  = () => 2.2 + score * 0.04;
const PIPE_EVERY  = 90;
const GROUND_H    = 40;
const BIRD_X      = () => canvas.width * 0.22;
const BIRD_R      = 16;

let bird, pipes, score, frame, running, dead, animId;
let bestScore = 0;

function init() {
  bird  = { y: canvas.height / 2, vy: 0, angle: 0 };
  pipes = [];
  score = 0;
  frame = 0;
  running = true;
  dead    = false;
  updateHUD();
}

const scoreEl     = document.getElementById('score');
const bestEl      = document.getElementById('best');
const startScreen = document.getElementById('startScreen');
const overScreen  = document.getElementById('gameOverScreen');
const finalScore  = document.getElementById('finalScore');
const finalBest   = document.getElementById('finalBest');
const medalEl     = document.getElementById('medal');
const restartBtn  = document.getElementById('restartBtn');

function updateHUD() {
  scoreEl.textContent = score;
  bestEl.textContent  = bestScore;
}

function jump() {
  if (dead) return;
  if (!running) { startGame(); return; }
  bird.vy = JUMP;
}

document.addEventListener('keydown', e => {
  if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); }
});
canvas.addEventListener('click', jump);
canvas.addEventListener('touchstart', e => { e.preventDefault(); jump(); }, { passive: false });
restartBtn.addEventListener('click', startGame);
document.addEventListener('keydown', e => { if (e.code === 'Space' && dead) startGame(); });

function startGame() {
  overScreen.classList.add('hidden');
  startScreen.classList.add('hidden');
  cancelAnimationFrame(animId);
  init();
  loop();
}

function loop() {
  update();
  draw();
  if (running) animId = requestAnimationFrame(loop);
}

function update() {
  frame++;
  bird.vy    += GRAVITY;
  bird.y     += bird.vy;
  bird.angle  = Math.min(Math.max(bird.vy * 3.5, -25), 80);

  if (frame % PIPE_EVERY === 0) spawnPipe();

  const spd = PIPE_SPEED();
  pipes.forEach(p => { p.x -= spd; });
  pipes = pipes.filter(p => p.x + PIPE_W > -10);

  pipes.forEach(p => {
    if (!p.scored && p.x + PIPE_W < BIRD_X()) {
      p.scored = true;
      score++;
      if (score > bestScore) bestScore = score;
      updateHUD();
    }
  });

  if (checkCollision()) die();
  if (bird.y + BIRD_R >= canvas.height - GROUND_H || bird.y - BIRD_R <= 0) die();
}

function spawnPipe() {
  const gap    = PIPE_GAP();
  const minTop = 60;
  const maxTop = canvas.height - GROUND_H - gap - 60;
  const topH   = minTop + Math.random() * (maxTop - minTop);
  pipes.push({ x: canvas.width + 10, topH, gap, scored: false });
}

function checkCollision() {
  const bx = BIRD_X(), by = bird.y;
  for (const p of pipes) {
    if (bx + BIRD_R - 4 > p.x && bx - BIRD_R + 4 < p.x + PIPE_W) {
      if (by - BIRD_R + 4 < p.topH || by + BIRD_R - 4 > p.topH + p.gap) return true;
    }
  }
  return false;
}

function die() {
  running = false;
  dead    = true;
  cancelAnimationFrame(animId);
  let bounces = 0;
  const bounce = () => {
    bird.vy += GRAVITY * 1.5;
    bird.y  += bird.vy;
    if (bird.y + BIRD_R >= canvas.height - GROUND_H) {
      bird.y  = canvas.height - GROUND_H - BIRD_R;
      bird.vy = bounces < 1 ? -4 : 0;
      bounces++;
    }
    draw();
    if (bounces < 2) requestAnimationFrame(bounce);
    else showGameOver();
  };
  requestAnimationFrame(bounce);
}

function showGameOver() {
  finalScore.textContent = score;
  finalBest.textContent  = bestScore;
  medalEl.textContent    = score >= 30 ? '🥇' : score >= 15 ? '🥈' : score >= 5 ? '🥉' : '';
  overScreen.classList.remove('hidden');
}

function draw() {
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  drawSky(W, H);
  drawClouds(W, H);
  drawPipes(H);
  drawGround(W, H);
  drawBird(H);
}

function drawIdle() { draw(); }

function drawSky(W, H) {
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0,   '#060d1f');
  grad.addColorStop(0.6, '#0d2040');
  grad.addColorStop(1,   '#0a1628');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
}

let cloudOffset = 0;
const clouds = [
  { x: 0.1, y: 0.12, w: 80, h: 22 },
  { x: 0.45, y: 0.2,  w: 60, h: 18 },
  { x: 0.75, y: 0.1,  w: 90, h: 24 },
];

function drawClouds(W, H) {
  if (running) cloudOffset = (cloudOffset + 0.3) % W;
  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  clouds.forEach(c => {
    const cx = ((c.x * W - cloudOffset) % W + W) % W;
    ctx.beginPath();
    ctx.ellipse(cx, c.y * H, c.w, c.h, 0, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawPipes(H) {
  pipes.forEach(p => {
    const botY = p.topH + p.gap;
    const botH = H - GROUND_H - botY;
    drawPipe(p.x, 0, PIPE_W, p.topH, true);
    drawPipe(p.x, botY, PIPE_W, botH, false);
  });
}

function drawPipe(x, y, w, h, isTop) {
  const capH = 18, capOff = 4;
  const bodyGrad = ctx.createLinearGradient(x, 0, x + w, 0);
  bodyGrad.addColorStop(0,   '#16a34a');
  bodyGrad.addColorStop(0.3, '#22c55e');
  bodyGrad.addColorStop(0.7, '#16a34a');
  bodyGrad.addColorStop(1,   '#0f7734');
  ctx.fillStyle = bodyGrad;
  ctx.fillRect(x, y, w, h);

  const capY = isTop ? y + h - capH : y;
  const capGrad = ctx.createLinearGradient(x - capOff, 0, x + w + capOff, 0);
  capGrad.addColorStop(0,   '#15803d');
  capGrad.addColorStop(0.3, '#4ade80');
  capGrad.addColorStop(0.7, '#15803d');
  capGrad.addColorStop(1,   '#0f6127');
  ctx.fillStyle = capGrad;
  ctx.fillRect(x - capOff, capY, w + capOff * 2, capH);

  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.fillRect(x + 6, y, 8, h);
}

let groundOffset = 0;
function drawGround(W, H) {
  if (running) groundOffset = (groundOffset + PIPE_SPEED()) % 40;
  ctx.fillStyle = '#92400e';
  ctx.fillRect(0, H - GROUND_H, W, GROUND_H);
  ctx.fillStyle = '#65a30d';
  ctx.fillRect(0, H - GROUND_H, W, 12);
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  for (let i = -40; i < W + 40; i += 40) {
    ctx.fillRect(i - groundOffset, H - GROUND_H, 20, 12);
  }
  ctx.fillStyle = '#78350f';
  ctx.fillRect(0, H - GROUND_H + 14, W, 2);
}

function drawBird(H) {
  const bx = BIRD_X(), by = bird.y;
  ctx.save();
  ctx.translate(bx, by);
  ctx.rotate((bird.angle * Math.PI) / 180);

  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(2, BIRD_R + 4, BIRD_R * 0.8, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  const bodyGrad = ctx.createRadialGradient(-4, -4, 2, 0, 0, BIRD_R);
  bodyGrad.addColorStop(0, '#fde047');
  bodyGrad.addColorStop(0.6, '#facc15');
  bodyGrad.addColorStop(1, '#ca8a04');
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.arc(0, 0, BIRD_R, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.ellipse(-2, 4, 10, 6, -0.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(7, -5, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(9, -4, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(10, -5, 1.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.moveTo(12, -1);
  ctx.lineTo(20, 2);
  ctx.lineTo(12, 5);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function makeStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 80; i++) {
    const s    = document.createElement('div');
    const size = Math.random() * 2 + 1;
    s.className = 'star';
    s.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${2+Math.random()*3}s;--del:${Math.random()*3}s;`;
    container.appendChild(s);
  }
}

makeStars();
bird    = { y: canvas.height / 2, vy: 0, angle: 0 };
pipes   = [];
score   = 0;
running = false;
dead    = false;

function idleLoop() {
  if (!running) {
    bird.y = canvas.height / 2 + Math.sin(Date.now() / 400) * 18;
    drawIdle();
    requestAnimationFrame(idleLoop);
  }
}
idleLoop();
