// Web Audio API sound effects — no external files needed
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let ctx = null;

function getCtx() {
  if (!ctx) ctx = new AudioCtx();
  return ctx;
}

export function playCorrect() {
  try {
    const c = getCtx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.connect(g); g.connect(c.destination);
    o.type = 'sine';
    o.frequency.setValueAtTime(523, c.currentTime);     // C5
    o.frequency.setValueAtTime(659, c.currentTime + 0.1); // E5
    o.frequency.setValueAtTime(784, c.currentTime + 0.2); // G5
    g.gain.setValueAtTime(0.15, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.4);
    o.start(c.currentTime);
    o.stop(c.currentTime + 0.4);
  } catch {}
}

export function playWrong() {
  try {
    const c = getCtx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.connect(g); g.connect(c.destination);
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(200, c.currentTime);
    o.frequency.setValueAtTime(150, c.currentTime + 0.15);
    g.gain.setValueAtTime(0.1, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.3);
    o.start(c.currentTime);
    o.stop(c.currentTime + 0.3);
  } catch {}
}

export function playFlip() {
  try {
    const c = getCtx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.connect(g); g.connect(c.destination);
    o.type = 'sine';
    o.frequency.setValueAtTime(800, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(1200, c.currentTime + 0.08);
    g.gain.setValueAtTime(0.06, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1);
    o.start(c.currentTime);
    o.stop(c.currentTime + 0.1);
  } catch {}
}

export function playAchievement() {
  try {
    const c = getCtx();
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, c.currentTime + i * 0.12);
      g.gain.setValueAtTime(0, c.currentTime + i * 0.12);
      g.gain.linearRampToValueAtTime(0.15, c.currentTime + i * 0.12 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i * 0.12 + 0.3);
      o.start(c.currentTime + i * 0.12);
      o.stop(c.currentTime + i * 0.12 + 0.3);
    });
  } catch {}
}

export function playMatch() {
  try {
    const c = getCtx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.connect(g); g.connect(c.destination);
    o.type = 'triangle';
    o.frequency.setValueAtTime(600, c.currentTime);
    o.frequency.setValueAtTime(900, c.currentTime + 0.07);
    g.gain.setValueAtTime(0.1, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
    o.start(c.currentTime);
    o.stop(c.currentTime + 0.15);
  } catch {}
}
