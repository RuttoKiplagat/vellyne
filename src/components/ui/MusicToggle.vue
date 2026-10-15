<script setup>
import { Music, VolumeX } from 'lucide-vue-next'
import { useMusic } from '@/composables/useMusic'

/** Floating music button. Music never starts on its own. */
const { isPlaying, toggle } = useMusic()
</script>

<template>
  <button
    type="button"
    class="music-toggle glass fixed right-4 top-4 z-50 flex h-12 items-center gap-2 rounded-full px-4 text-sm text-white/90 transition duration-300 hover:text-white sm:right-6 sm:top-6"
    :aria-pressed="isPlaying"
    :aria-label="isPlaying ? 'Pause the music' : 'Play soft music'"
    @click="toggle"
  >
    <component :is="isPlaying ? Music : VolumeX" class="h-4 w-4" aria-hidden="true" />

    <span v-if="isPlaying" class="flex h-4 items-end gap-[3px]" aria-hidden="true">
      <span class="eq-bar" />
      <span class="eq-bar [animation-delay:-0.4s]" />
      <span class="eq-bar [animation-delay:-0.8s]" />
    </span>
    <span v-else class="hidden sm:inline">Play music</span>
  </button>
</template>

<style scoped>
.music-toggle:hover {
  box-shadow: 0 0 30px -5px rgb(241 144 176 / 0.55);
}
.eq-bar {
  display: block;
  width: 3px;
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(to top, var(--color-lilac-300), var(--color-blush-300));
  transform-origin: bottom;
  animation: eq 1.2s ease-in-out infinite;
}
@keyframes eq {
  0%, 100% { transform: scaleY(0.3); }
  50% { transform: scaleY(1); }
}
</style>
