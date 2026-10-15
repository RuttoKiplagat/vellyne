<script setup>
import { ArrowUp } from 'lucide-vue-next'
import Sparkles from '@/components/effects/Sparkles.vue'
import { ending } from '@/content/messages'
import { herDisplayName, love } from '@/config/love'

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer id="ending" class="relative flex min-h-svh items-center overflow-hidden bg-navy-950 px-6 py-28" aria-label="Ending">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(141,108,230,0.22),_transparent_60%)]" />
    </div>
    <Sparkles :count="45" />

    <div v-reveal class="ending relative mx-auto flex max-w-2xl flex-col items-center text-center">
      <!-- The heart draws itself, fills with color, then glows -->
      <div class="relative mb-14 h-40 w-40 sm:h-48 sm:w-48" aria-hidden="true">
        <span class="ending-halo absolute inset-[-40%] rounded-full" />
        <span class="ending-ring absolute inset-0 rounded-full border border-blush-300/40" />
        <span class="ending-ring absolute inset-0 rounded-full border border-lilac-300/40 [animation-delay:1.5s]" />
        <svg viewBox="0 0 24 24" class="ending-heart relative h-full w-full overflow-visible">
          <defs>
            <linearGradient id="ending-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#fbd2df" />
              <stop offset="50%" stop-color="#f190b0" />
              <stop offset="100%" stop-color="#8d6ce6" />
            </linearGradient>
          </defs>
          <path
            class="heart-fill"
            fill="url(#ending-gradient)"
            d="M12 21.35 10.55 20C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"
          />
          <path
            class="heart-stroke"
            fill="none"
            stroke="#fde8ef"
            stroke-width="0.35"
            stroke-linejoin="round"
            pathLength="100"
            d="M12 21.35 10.55 20C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"
          />
        </svg>
      </div>

      <p class="ending-text font-serif text-2xl italic leading-relaxed text-white sm:text-3xl sm:leading-relaxed">
        “{{ ending.line }}”
      </p>

      <p class="ending-text ending-text--late mt-12 font-script text-4xl text-glow sm:text-5xl">
        {{ ending.thanks }}, {{ herDisplayName }}
      </p>
      <p v-if="love.yourName || love.apologyDate" class="ending-text ending-text--late mt-4 text-sm tracking-[0.25em] text-white/50 uppercase">
        <template v-if="love.yourName">{{ love.yourName }}</template>
        <template v-if="love.yourName && love.apologyDate"> · </template>
        <template v-if="love.apologyDate">{{ love.apologyDate }}</template>
      </p>

      <button type="button" class="ending-text ending-text--late btn-soft mt-14" @click="backToTop">
        <ArrowUp class="h-4 w-4" aria-hidden="true" />
        Read it again from the beginning
      </button>
    </div>
  </footer>
</template>

<style scoped>
/* Initial (hidden) state */
.heart-stroke {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}
.heart-fill {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  transform: scale(0.85);
}
.ending-halo {
  opacity: 0;
  background: radial-gradient(circle, rgb(241 144 176 / 0.5), rgb(141 108 230 / 0.25) 40%, transparent 70%);
}
.ending-ring {
  opacity: 0;
}
.ending-text {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 1.4s ease 2.6s, transform 1.4s cubic-bezier(0.2, 0.7, 0.2, 1) 2.6s;
}
.ending-text--late {
  transition-delay: 3.6s;
}

/* When the ending scrolls into view (v-reveal adds .is-visible) */
.is-visible .heart-stroke {
  animation: draw 2.4s ease-in-out forwards;
}
.is-visible .heart-fill {
  animation: fill-in 1.4s ease-out 1.8s forwards;
}
.is-visible .ending-heart {
  filter: drop-shadow(0 0 26px rgb(241 144 176 / 0.7));
  animation: heartbeat 2.6s ease-in-out 3.4s infinite;
}
.is-visible .ending-halo {
  animation: halo-in 1.6s ease-out 2s forwards, glow-pulse 3.4s ease-in-out 3.6s infinite;
}
.is-visible .ending-ring {
  animation: ring 4s ease-out 3s infinite;
}
.is-visible .ending-text {
  opacity: 1;
  transform: none;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}
@keyframes fill-in {
  to { opacity: 1; transform: scale(1); }
}
@keyframes halo-in {
  to { opacity: 0.9; }
}

@media (prefers-reduced-motion: reduce) {
  .heart-stroke { stroke-dashoffset: 0; }
  .heart-fill { opacity: 1; transform: none; }
  .ending-halo { opacity: 0.8; }
  .ending-text { opacity: 1; transform: none; transition: none; }
}
</style>
