<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

/** A thin glowing line at the top that fills as she reads. */
const progress = ref(0)
let frame = 0

function update() {
  frame = 0
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(update)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  update()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]" aria-hidden="true">
    <div
      class="h-full origin-left bg-gradient-to-r from-blush-400 via-blush-300 to-lilac-400 shadow-[0_0_12px_rgba(241,144,176,0.8)]"
      :style="{ transform: `scaleX(${progress})` }"
    />
  </div>
</template>
