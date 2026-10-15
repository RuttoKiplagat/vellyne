<script setup>
/** Consistent section heading: small label, handwritten title and a tiny heart divider. */
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  titleId: { type: String, default: undefined },
  dark: { type: Boolean, default: false },
})
</script>

<template>
  <header class="mx-auto max-w-3xl text-center">
    <p
      v-if="eyebrow"
      v-reveal
      class="mb-3 text-xs font-medium uppercase tracking-[0.35em] sm:text-sm"
      :class="dark ? 'text-lilac-500' : 'text-blush-200/80'"
    >
      {{ eyebrow }}
    </p>
    <h2
      :id="titleId"
      v-reveal="120"
      class="font-script text-5xl leading-tight sm:text-6xl md:text-7xl"
      :class="dark ? 'text-navy-800' : 'text-glow'"
    >
      {{ title }}
    </h2>
    <div v-reveal="240" class="mt-5 flex items-center justify-center gap-3" aria-hidden="true">
      <span class="h-px w-12 sm:w-20" :class="dark ? 'bg-gradient-to-r from-transparent to-blush-400' : 'bg-gradient-to-r from-transparent to-blush-300/70'" />
      <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 fill-blush-400">
        <path d="M12 21.35 10.55 20C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z" />
      </svg>
      <span class="h-px w-12 sm:w-20" :class="dark ? 'bg-gradient-to-l from-transparent to-lilac-400' : 'bg-gradient-to-l from-transparent to-lilac-300/70'" />
    </div>
  </header>
</template>
