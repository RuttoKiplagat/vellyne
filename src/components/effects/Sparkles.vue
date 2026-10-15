<script setup>
/**
 * Delicate twinkling sparkles. Place inside a `relative` container.
 * Set `drift` to make them slowly float like dust in soft light.
 */
const props = defineProps({
  count: { type: Number, default: 24 },
  drift: { type: Boolean, default: false },
})

const sparkles = Array.from({ length: props.count }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: 1.5 + Math.random() * 2.5,
  duration: 2.5 + Math.random() * 4,
  delay: -Math.random() * 6,
  driftDuration: 14 + Math.random() * 14,
  pink: i % 3 === 0,
}))
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <span
      v-for="s in sparkles"
      :key="s.id"
      class="absolute"
      :class="{ 'sparkle-drift': drift }"
      :style="{ top: `${s.top}%`, left: `${s.left}%`, '--drift-duration': `${s.driftDuration}s`, animationDelay: `${s.delay}s` }"
    >
      <span
        class="sparkle block rounded-full"
        :class="s.pink ? 'bg-blush-200' : 'bg-white'"
        :style="{
          width: `${s.size}px`,
          height: `${s.size}px`,
          animationDuration: `${s.duration}s`,
          animationDelay: `${s.delay}s`,
        }"
      />
    </span>
  </div>
</template>

<style scoped>
.sparkle {
  opacity: 0;
  box-shadow: 0 0 8px 2px rgb(255 255 255 / 0.6);
  animation: twinkle ease-in-out infinite;
}
.sparkle-drift {
  animation: sparkle-drift var(--drift-duration) ease-in-out infinite alternate;
}
@keyframes sparkle-drift {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(24px, -60px, 0); }
}
</style>
