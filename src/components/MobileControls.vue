<template>
  <div class="mobile-controls">
    <!-- Left side-zone: D-pad -->
    <div class="mc-dpad">
      <button
        class="mc-btn mc-up"
        @pointerdown="press($event, 'up')"
        @pointerup="release"
        @pointercancel="release"
        aria-label="Вверх"
      >▲</button>
      <button
        class="mc-btn mc-left"
        @pointerdown="press($event, 'left')"
        @pointerup="release"
        @pointercancel="release"
        aria-label="Влево"
      >◀</button>
      <button
        class="mc-btn mc-right"
        @pointerdown="press($event, 'right')"
        @pointerup="release"
        @pointercancel="release"
        aria-label="Вправо"
      >▶</button>
      <button
        class="mc-btn mc-down"
        @pointerdown="press($event, 'down')"
        @pointerup="release"
        @pointercancel="release"
        aria-label="Вниз"
      >▼</button>
    </div>

    <!-- Right side-zone: action button -->
    <button
      class="mc-action"
      @pointerdown="interact"
      aria-label="Действие"
    >А</button>
  </div>
</template>

<script setup>
import { EventBus } from '../game/EventBus';

function press(e, dir) {
  e.preventDefault();
  try { e.target.setPointerCapture(e.pointerId); } catch (_) { /* noop */ }
  EventBus.emit('mobile-move', dir);
}

function release() {
  EventBus.emit('mobile-move', null);
}

function interact(e) {
  e.preventDefault();
  EventBus.emit('mobile-interact');
}
</script>

<style scoped>
/* Full-screen overlay; only the buttons capture taps, the rest passes through */
.mobile-controls {
  position: fixed;
  inset: 0;
  z-index: 2000;
  pointer-events: none;
  font-family: 'Press Start 2P', monospace, sans-serif;
}

/* D-pad pinned to the left side-zone (bottom for thumb reach) */
.mc-dpad {
  position: absolute;
  left: max(10px, env(safe-area-inset-left));
  bottom: max(16px, env(safe-area-inset-bottom));
  width: 150px;
  height: 150px;
}

.mc-btn,
.mc-action {
  pointer-events: auto;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #FFD700;
  background: rgba(0, 0, 0, 0.62);
  color: #FFD700;
  border-radius: 50%;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.mc-btn {
  width: 50px;
  height: 50px;
  font-size: 18px;
  line-height: 1;
}

.mc-btn:active {
  background: rgba(255, 215, 0, 0.85);
  color: #000;
}

.mc-up { left: 50px; top: 0; }
.mc-down { left: 50px; bottom: 0; }
.mc-left { left: 0; top: 50px; }
.mc-right { right: 0; top: 50px; }

/* Action button pinned to the right side-zone */
.mc-action {
  bottom: max(30px, env(safe-area-inset-bottom));
  right: max(16px, env(safe-area-inset-right));
  width: 78px;
  height: 78px;
  font-size: 26px;
  background: rgba(76, 175, 80, 0.9);
  color: #fff;
  border-color: #fff;
}

.mc-action:active {
  background: rgba(56, 142, 60, 0.95);
  transform: scale(0.96);
}

/* Tighter on short (landscape phone) viewports */
@media (max-height: 420px) {
  .mc-dpad { width: 132px; height: 132px; }
  .mc-btn { width: 44px; height: 44px; font-size: 16px; }
  .mc-up, .mc-down { left: 44px; }
  .mc-left, .mc-right { top: 44px; }
  .mc-action { width: 68px; height: 68px; font-size: 22px; }
}
</style>
