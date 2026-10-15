<script setup>
import SectionHeading from '@/components/ui/SectionHeading.vue'
import Sparkles from '@/components/effects/Sparkles.vue'
import HiddenHeart from '@/components/ui/HiddenHeart.vue'
import { gratitude } from '@/content/messages'
</script>

<template>
  <section id="gratitude" class="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32" aria-labelledby="gratitude-title">
    <!-- Soft, slowly moving light -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute inset-0 bg-gradient-to-b from-navy-900 via-[#211a50] to-navy-900" />
      <div class="light-beam absolute -top-1/4 left-[15%] h-[150%] w-40 rotate-[18deg] sm:w-64" />
      <div class="light-beam absolute -top-1/4 right-[20%] h-[150%] w-32 -rotate-[14deg] [animation-delay:-5s] sm:w-52" />
      <div class="glow-blob left-[5%] top-[30%] h-72 w-72 bg-blush-500/15" />
      <div class="glow-blob bottom-[10%] right-[5%] h-80 w-80 bg-lilac-500/20 [animation-delay:-9s]" />
    </div>
    <Sparkles :count="40" drift />

    <div class="relative mx-auto max-w-3xl">
      <SectionHeading :eyebrow="gratitude.eyebrow" :title="gratitude.title" title-id="gratitude-title" />

      <div class="mt-14 space-y-8 text-center">
        <p
          v-for="(paragraph, i) in gratitude.paragraphs"
          :key="i"
          v-reveal="80"
          class="font-serif text-xl leading-relaxed text-white/85 sm:text-2xl sm:leading-relaxed"
          :class="{ 'text-glow font-medium italic': i === 3 }"
        >
          {{ paragraph }}
        </p>
      </div>

      <div v-reveal class="mt-16">
        <HiddenHeart />
      </div>
    </div>
  </section>
</template>

<style scoped>
.light-beam {
  background: linear-gradient(to bottom, transparent, rgb(251 210 223 / 0.1) 40%, rgb(221 208 251 / 0.08) 60%, transparent);
  filter: blur(30px);
  animation: beam 12s ease-in-out infinite;
}
@keyframes beam {
  0%, 100% { opacity: 0.4; translate: 0 0; }
  50% { opacity: 1; translate: 30px 0; }
}
</style>
