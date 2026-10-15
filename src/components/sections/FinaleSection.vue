<script setup>
import { nextTick, ref } from 'vue'
import GlowHeart from '@/components/ui/GlowHeart.vue'
import FallingPetals from '@/components/effects/FallingPetals.vue'
import Sparkles from '@/components/effects/Sparkles.vue'
import CopyButton from '@/components/ui/CopyButton.vue'
import { finale } from '@/content/messages'
import { herDisplayName, love } from '@/config/love'

const showResponse = ref(false)
const responseEl = ref(null)

async function reveal() {
  showResponse.value = true
  await nextTick()
  responseEl.value?.focus({ preventScroll: true })
}

// The text she can copy and keep.
const copyText = [
  `${finale.title}`,
  '',
  `To ${herDisplayName},`,
  '',
  ...finale.paragraphs.flatMap((p) => [p, '']),
  finale.signoff,
  love.yourName ? `— ${love.yourName}` : '',
]
  .join('\n')
  .trim()
</script>

<template>
  <section
    id="finale"
    class="relative overflow-hidden bg-navy-950 px-5 py-28 sm:px-8 sm:py-36"
    aria-labelledby="finale-title"
  >
    <!-- Dark navy with soft purple and pink glow -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(141,108,230,0.28),_transparent_60%)]" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(232,108,151,0.22),_transparent_55%)]" />
      <div class="glow-blob left-1/2 top-32 h-96 w-96 -translate-x-1/2 bg-lilac-500/25" />
    </div>
    <Sparkles :count="30" />
    <FallingPetals :count="18" />

    <div class="relative mx-auto max-w-3xl text-center">
      <div v-reveal class="mb-12 flex justify-center">
        <GlowHeart :size="130" rings />
      </div>

      <h2 id="finale-title" v-reveal="100" class="font-script text-5xl leading-tight text-glow sm:text-6xl md:text-7xl">
        {{ finale.title }}
      </h2>

      <div class="mt-14 space-y-7">
        <p
          v-for="(paragraph, i) in finale.paragraphs"
          :key="i"
          v-reveal="60"
          class="font-serif text-xl leading-relaxed text-white/85 sm:text-2xl sm:leading-relaxed"
          :class="{ 'text-white': i === 3 }"
        >
          {{ paragraph }}
        </p>
      </div>

      <p v-reveal class="mt-12 font-script text-5xl text-blush-200 sm:text-6xl">
        {{ finale.signoff }}
      </p>

      <div v-reveal class="mt-14 flex flex-col items-center gap-6">
        <button
          v-if="!showResponse"
          type="button"
          class="btn-love text-lg sm:text-xl"
          aria-controls="finale-response"
          :aria-expanded="showResponse"
          @click="reveal"
        >
          {{ finale.button }} <span aria-hidden="true">❤️</span>
        </button>

        <Transition name="response">
          <div
            v-if="showResponse"
            id="finale-response"
            ref="responseEl"
            tabindex="-1"
            class="response glass relative w-full max-w-xl rounded-[2rem] px-7 py-9 outline-none sm:px-10"
          >
            <div class="mb-4 flex justify-center">
              <GlowHeart :size="40" />
            </div>
            <p class="font-serif text-xl italic leading-relaxed text-white/90 sm:text-2xl">
              {{ finale.response }}
            </p>
          </div>
        </Transition>

        <CopyButton :text="copyText" label="Keep a copy of this message" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.response {
  box-shadow:
    0 30px 80px -30px rgb(232 108 151 / 0.6),
    0 0 60px -20px rgb(141 108 230 / 0.6),
    inset 0 1px 0 rgb(255 255 255 / 0.08);
}
.response-enter-active {
  transition: opacity 1.2s ease, transform 1.2s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.response-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.97);
}
</style>
