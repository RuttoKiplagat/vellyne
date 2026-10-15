<script setup>
import SectionHeading from '@/components/ui/SectionHeading.vue'
import DevHint from '@/components/ui/DevHint.vue'
import { memories as copy } from '@/content/messages'
import { love } from '@/config/love'

/**
 * Shows only the memories and photos you add in `src/config/love.js`.
 * Nothing is invented. In production the section is hidden if both are empty.
 */
const memories = love.memories
const photos = love.photos
</script>

<template>
  <section id="memories" class="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32" aria-labelledby="memories-title">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/60 to-navy-900" />
      <div class="glow-blob right-[10%] top-[15%] h-72 w-72 bg-blush-500/10" />
    </div>

    <div class="relative mx-auto max-w-5xl">
      <SectionHeading :eyebrow="copy.eyebrow" :title="copy.title" title-id="memories-title" />

      <!-- Memories timeline -->
      <ol v-if="memories.length" class="relative mx-auto mt-14 max-w-2xl space-y-8 border-l border-blush-300/25 pl-8">
        <li v-for="(memory, i) in memories" :key="i" v-reveal="i * 80" class="relative">
          <span class="absolute -left-[2.45rem] top-6 grid h-5 w-5 place-items-center rounded-full bg-navy-900 ring-1 ring-blush-300/50" aria-hidden="true">
            <span class="h-2 w-2 rounded-full bg-blush-300 shadow-[0_0_10px_rgba(247,180,201,0.9)]" />
          </span>
          <div class="glass rounded-3xl px-6 py-6">
            <p v-if="memory.date" class="text-xs uppercase tracking-[0.25em] text-lilac-200/70">{{ memory.date }}</p>
            <h3 v-if="memory.title" class="mt-1 font-script text-3xl text-white sm:text-4xl">{{ memory.title }}</h3>
            <p v-if="memory.text" class="mt-2 font-serif text-lg leading-relaxed text-white/80">{{ memory.text }}</p>
          </div>
        </li>
      </ol>
      <p v-else class="mt-12 text-center text-white/70">
        <DevHint text="Add your favorite memories (only real ones)" />
      </p>

      <!-- Photos -->
      <ul v-if="photos.length" class="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
        <li
          v-for="(photo, i) in photos"
          :key="photo.src"
          v-reveal="i * 80"
          class="polaroid rounded-2xl bg-white p-2.5 pb-4 shadow-xl sm:p-3 sm:pb-5"
          :style="{ '--tilt': `${i % 2 === 0 ? -2 : 2}deg` }"
        >
          <img
            :src="photo.src"
            :alt="photo.alt || photo.caption || 'A photo of us'"
            loading="lazy"
            decoding="async"
            class="aspect-[4/5] w-full rounded-xl object-cover"
          >
          <p v-if="photo.caption" class="mt-3 text-center font-script text-xl text-navy-800 sm:text-2xl">{{ photo.caption }}</p>
        </li>
      </ul>
      <p v-else class="mt-8 text-center text-white/70">
        <DevHint text="Optional: add photos to public/photos/" />
      </p>
    </div>
  </section>
</template>

<style scoped>
.polaroid {
  transform: rotate(var(--tilt));
  transition:
    opacity 1s ease var(--reveal-delay, 0ms),
    transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1),
    box-shadow 0.6s ease;
}
.polaroid.reveal:not(.is-visible) {
  transform: rotate(var(--tilt)) translateY(26px);
}
.polaroid:hover {
  transform: rotate(0deg) scale(1.03);
  box-shadow: 0 25px 60px -20px rgb(241 144 176 / 0.6);
}
</style>
