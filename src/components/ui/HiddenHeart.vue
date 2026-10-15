<script setup>
import { ref } from 'vue'
import { love } from '@/config/love'

/** A small, shimmering heart that reveals a secret note when tapped. */
const open = ref(false)
</script>

<template>
  <div v-if="love.hiddenMessage" class="flex flex-col items-center">
    <button
      type="button"
      class="hidden-heart group relative grid h-12 w-12 place-items-center rounded-full"
      :aria-expanded="open"
      aria-controls="secret-note"
      :aria-label="open ? 'Hide the secret note' : 'A little secret — tap the heart'"
      :title="open ? '' : 'psst… tap me'"
      @click="open = !open"
    >
      <span class="absolute inset-0 rounded-full bg-blush-400/20 blur-md transition duration-500 group-hover:bg-blush-400/40" />
      <svg viewBox="0 0 24 24" class="relative h-6 w-6 transition duration-500 group-hover:scale-110" :class="open ? 'scale-125 fill-blush-200' : 'fill-blush-300'">
        <path d="M12 21.35 10.55 20C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z" />
      </svg>
    </button>
    <p v-if="!open" class="mt-2 text-xs tracking-widest text-white/35">psst… tap the heart</p>

    <Transition name="secret">
      <div v-if="open" id="secret-note" class="glass mt-4 max-w-md rounded-3xl px-6 py-5 text-center">
        <p class="mb-1 text-[0.7rem] uppercase tracking-[0.3em] text-blush-200/70">A little secret</p>
        <p class="font-serif text-lg italic leading-relaxed text-white/90 sm:text-xl">
          {{ love.hiddenMessage }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.hidden-heart svg {
  animation: heartbeat 3s ease-in-out infinite;
}
.secret-enter-active,
.secret-leave-active {
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.secret-enter-from,
.secret-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}
</style>
