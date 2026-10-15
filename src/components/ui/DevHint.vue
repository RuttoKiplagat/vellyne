<script setup>
/**
 * A small dashed hint shown ONLY while developing (`npm run dev`).
 * It marks where personal details from `src/config/love.js` will appear.
 * It is automatically removed from the production build.
 */
defineProps({
  text: { type: String, required: true },
})

const isDev = import.meta.env.DEV
</script>

<template>
  <span
    v-if="isDev"
    class="inline-block rounded-lg border border-dashed border-current/40 px-3 py-1.5 font-sans text-xs not-italic opacity-70"
  >
    ✎ {{ text }} <span class="opacity-70">— edit <code>src/config/love.js</code></span>
  </span>
</template>
