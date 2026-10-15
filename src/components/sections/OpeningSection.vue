<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import GlowHeart from '@/components/ui/GlowHeart.vue'
import Sparkles from '@/components/effects/Sparkles.vue'
import { opening } from '@/content/messages'

defineProps({
  opened: { type: Boolean, default: false },
})
const emit = defineEmits(['open'])

/**
 * The opening plays in gentle stages:
 * 1. the heart glows in  2. "Hey, my love..."  3. the message  4. the button
 */
const stage = ref(0)
const timers = []

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stage.value = 4
    return
  }
  ;[300, 1600, 3000, 4800].forEach((delay, i) => {
    timers.push(setTimeout(() => (stage.value = i + 1), delay))
  })
})

onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<template>
  <section
    id="opening"
    class="relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-24"
    aria-labelledby="opening-title"
  >
    <!-- Cinematic lighting -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-navy-800)_0%,_var(--color-navy-950)_70%)]" />
      <div class="glow-blob left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 bg-lilac-500/25 sm:h-[28rem] sm:w-[28rem]" />
      <div class="glow-blob bottom-0 left-[10%] h-64 w-64 bg-blush-500/15 [animation-delay:-6s]" />
      <div class="glow-blob right-[5%] top-[10%] h-56 w-56 bg-navy-600/40 [animation-delay:-11s]" />
      <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent" />
    </div>
    <Sparkles :count="36" />

    <div class="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
      <p
        class="stage mb-10 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-lilac-200/70 sm:text-xs"
        :class="{ 'is-on': stage >= 1 }"
      >
        For the girl I never want to hurt
      </p>

      <div class="stage stage-heart mb-10" :class="{ 'is-on': stage >= 1 }">
        <GlowHeart :size="84" rings />
      </div>

      <h1
        id="opening-title"
        class="stage font-script text-6xl leading-tight sm:text-7xl md:text-8xl"
        :class="{ 'is-on': stage >= 2 }"
      >
        <span class="text-glow px-2">{{ opening.greeting }}</span>
        <span class="inline-block align-middle text-4xl sm:text-5xl">❤️</span>
      </h1>

      <p
        class="stage mt-8 font-serif text-xl leading-relaxed text-white/85 sm:text-2xl sm:leading-relaxed"
        :class="{ 'is-on': stage >= 3 }"
      >
        {{ opening.message }}
      </p>

      <div class="stage mt-12" :class="{ 'is-on': stage >= 4 }">
        <button type="button" class="btn-love" :tabindex="stage >= 4 ? 0 : -1" @click="emit('open')">
          {{ opening.button }} <span aria-hidden="true">❤️</span>
        </button>
      </div>

      <div
        v-if="opened"
        class="mt-14 flex flex-col items-center gap-1 text-xs tracking-widest text-white/40"
        aria-hidden="true"
      >
        <span>keep reading</span>
        <ChevronDown class="h-4 w-4 animate-bounce" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.stage {
  opacity: 0;
  transform: translateY(18px);
  filter: blur(6px);
  transition:
    opacity 1.6s ease,
    transform 1.6s cubic-bezier(0.2, 0.7, 0.2, 1),
    filter 1.6s ease;
}
.stage.is-on {
  opacity: 1;
  transform: none;
  filter: none;
}
.stage-heart {
  transform: scale(0.4);
}
.stage-heart.is-on {
  transform: scale(1);
}
@media (prefers-reduced-motion: reduce) {
  .stage {
    opacity: 1;
    transform: none;
    filter: none;
  }
}
</style>
