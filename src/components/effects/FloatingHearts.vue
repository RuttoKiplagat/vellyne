<script setup>
import { computed } from 'vue'
import { useReducedMotion } from '@/composables/useReducedMotion'

/** Lightweight floating hearts that drift upwards behind the content. */
const props = defineProps({
  count: { type: Number, default: 14 },
})

const reduced = useReducedMotion()
const colors = ['#f7b4c9', '#c6b2f6', '#fbd2df', '#a98cf0', '#ffffff']

// Generated once; pure CSS handles the motion (no JavaScript per frame).
const hearts = Array.from({ length: props.count }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 8 + Math.random() * 16,
  duration: 16 + Math.random() * 16,
  delay: -Math.random() * 30,
  sway: 10 + Math.random() * 30,
  opacity: 0.14 + Math.random() * 0.24,
  color: colors[i % colors.length],
  // Hide some hearts on small screens to keep things light.
  desktopOnly: i % 2 === 1,
}))

const visible = computed(() => !reduced.value)
</script>

<template>
  <div v-if="visible" class="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
    <span
      v-for="heart in hearts"
      :key="heart.id"
      class="floating-heart absolute bottom-[-40px]"
      :class="{ 'hidden md:block': heart.desktopOnly }"
      :style="{
        left: `${heart.left}%`,
        width: `${heart.size}px`,
        height: `${heart.size}px`,
        color: heart.color,
        '--duration': `${heart.duration}s`,
        '--delay': `${heart.delay}s`,
        '--sway': `${heart.sway}px`,
        '--max-opacity': heart.opacity,
      }"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" class="h-full w-full">
        <path d="M12 21.35 10.55 20C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z" />
      </svg>
    </span>
  </div>
</template>

<style scoped>
.floating-heart {
  opacity: 0;
  will-change: transform, opacity;
  animation: float-up var(--duration) linear var(--delay) infinite;
  filter: drop-shadow(0 0 6px currentColor);
}

@keyframes float-up {
  0% {
    transform: translate3d(0, 0, 0) rotate(-8deg);
    opacity: 0;
  }
  10% {
    opacity: var(--max-opacity);
  }
  50% {
    transform: translate3d(var(--sway), -55vh, 0) rotate(8deg);
  }
  85% {
    opacity: var(--max-opacity);
  }
  100% {
    transform: translate3d(calc(var(--sway) * -0.5), -112vh, 0) rotate(-6deg);
    opacity: 0;
  }
}
</style>
