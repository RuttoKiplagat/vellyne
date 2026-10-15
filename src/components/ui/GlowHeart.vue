<script setup>
import { useId } from 'vue'

/**
 * A softly glowing gradient heart.
 *
 * Props:
 *  - size:   width/height in pixels
 *  - pulse:  gentle heartbeat animation
 *  - rings:  soft rings radiating outwards
 */
defineProps({
  size: { type: Number, default: 96 },
  pulse: { type: Boolean, default: true },
  rings: { type: Boolean, default: false },
})

const gradientId = `heart-gradient-${useId()}`
</script>

<template>
  <div
    class="glow-heart relative inline-grid place-items-center"
    :style="{ width: `${size}px`, height: `${size}px` }"
    aria-hidden="true"
  >
    <!-- Soft halo -->
    <span class="halo absolute inset-[-35%] rounded-full" />

    <!-- Radiating rings -->
    <template v-if="rings">
      <span class="ring-wave absolute inset-0 rounded-full border border-blush-300/40" />
      <span class="ring-wave absolute inset-0 rounded-full border border-lilac-300/40 [animation-delay:1.3s]" />
      <span class="ring-wave absolute inset-0 rounded-full border border-blush-200/30 [animation-delay:2.6s]" />
    </template>

    <svg
      viewBox="0 0 24 24"
      class="relative h-full w-full drop-shadow-[0_0_22px_rgba(241,144,176,0.65)]"
      :class="{ 'beat': pulse }"
    >
      <defs>
        <linearGradient :id="gradientId" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fbd2df" />
          <stop offset="45%" stop-color="#f190b0" />
          <stop offset="100%" stop-color="#8d6ce6" />
        </linearGradient>
      </defs>
      <path
        :fill="`url(#${gradientId})`"
        d="M12 21.35 10.55 20C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"
      />
      <!-- Little highlight for depth -->
      <ellipse cx="7.6" cy="7.6" rx="2.1" ry="1.3" fill="white" opacity="0.35" transform="rotate(-35 7.6 7.6)" />
    </svg>
  </div>
</template>

<style scoped>
.halo {
  background: radial-gradient(circle, rgb(241 144 176 / 0.45) 0%, rgb(141 108 230 / 0.25) 40%, transparent 70%);
  animation: glow-pulse 3.2s ease-in-out infinite;
}
.beat {
  transform-origin: center;
  animation: heartbeat 2.4s ease-in-out infinite;
}
.ring-wave {
  animation: ring 3.9s ease-out infinite;
}
</style>
