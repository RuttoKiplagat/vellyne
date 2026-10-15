<script setup>
import { useReducedMotion } from '@/composables/useReducedMotion'

/** Soft petals falling slowly. Place inside a `relative overflow-hidden` container. */
const props = defineProps({
  count: { type: Number, default: 16 },
})

const reduced = useReducedMotion()

const petals = Array.from({ length: props.count }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 10 + Math.random() * 12,
  duration: 12 + Math.random() * 12,
  delay: -Math.random() * 24,
  sway: 30 + Math.random() * 60,
  spin: 180 + Math.random() * 360,
  tint: i % 3,
  desktopOnly: i % 3 === 2,
}))
</script>

<template>
  <div v-if="!reduced" class="pointer-events-none absolute inset-0 overflow-hidden [container-type:size]" aria-hidden="true">
    <span
      v-for="p in petals"
      :key="p.id"
      class="petal absolute top-[-30px]"
      :class="[`tint-${p.tint}`, { 'hidden md:block': p.desktopOnly }]"
      :style="{
        left: `${p.left}%`,
        width: `${p.size}px`,
        height: `${p.size * 0.8}px`,
        '--duration': `${p.duration}s`,
        '--delay': `${p.delay}s`,
        '--sway': `${p.sway}px`,
        '--spin': `${p.spin}deg`,
      }"
    />
  </div>
</template>

<style scoped>
.petal {
  border-radius: 150% 0 150% 0;
  opacity: 0;
  will-change: transform, opacity;
  animation: petal-fall var(--duration) linear var(--delay) infinite;
}
.tint-0 { background: linear-gradient(135deg, #fde8ef, #f190b0); }
.tint-1 { background: linear-gradient(135deg, #fbd2df, #c6b2f6); }
.tint-2 { background: linear-gradient(135deg, #ffffff, #f7b4c9); }

@keyframes petal-fall {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
    opacity: 0;
  }
  10% { opacity: 0.75; }
  50% { transform: translate3d(var(--sway), 50cqh, 0) rotate(calc(var(--spin) * 0.5)); }
  90% { opacity: 0.6; }
  100% {
    transform: translate3d(calc(var(--sway) * -0.4), 102cqh, 0) rotate(var(--spin));
    opacity: 0;
  }
}
</style>
