<script setup>
import { nextTick, ref } from 'vue'
import FloatingHearts from '@/components/effects/FloatingHearts.vue'
import MusicToggle from '@/components/ui/MusicToggle.vue'
import ScrollProgress from '@/components/ui/ScrollProgress.vue'
import OpeningSection from '@/components/sections/OpeningSection.vue'
import ApologySection from '@/components/sections/ApologySection.vue'
import GiftsSection from '@/components/sections/GiftsSection.vue'
import GratitudeSection from '@/components/sections/GratitudeSection.vue'
import MemoriesSection from '@/components/sections/MemoriesSection.vue'
import PromiseSection from '@/components/sections/PromiseSection.vue'
import FinaleSection from '@/components/sections/FinaleSection.vue'
import PersonalNoteSection from '@/components/sections/PersonalNoteSection.vue'
import EndingSection from '@/components/sections/EndingSection.vue'
import { love } from '@/config/love'

/**
 * The rest of the letter stays hidden until she presses "Read My Heart",
 * so the opening feels like a quiet, full-screen moment.
 */
const opened = ref(false)

async function openLetter() {
  opened.value = true
  await nextTick()
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById('apology')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
}

// Optional sections only appear when you have filled them in
// (while developing they always show, with hints of what to add).
const isDev = import.meta.env.DEV
const showMemories = isDev || love.memories.length > 0 || love.photos.length > 0
const showNote = isDev || love.personalMessage.trim().length > 0
</script>

<template>
  <ScrollProgress v-if="opened" />
  <MusicToggle />
  <FloatingHearts />

  <main class="relative z-10">
    <OpeningSection :opened="opened" @open="openLetter" />

    <Transition name="unfold">
      <div v-if="opened">
        <ApologySection />
        <GiftsSection />
        <GratitudeSection />
        <MemoriesSection v-if="showMemories" />
        <PromiseSection />
        <FinaleSection />
        <PersonalNoteSection v-if="showNote" />
        <EndingSection />
      </div>
    </Transition>
  </main>
</template>

<style scoped>
.unfold-enter-active {
  transition: opacity 1.2s ease;
}
.unfold-enter-from {
  opacity: 0;
}
</style>
