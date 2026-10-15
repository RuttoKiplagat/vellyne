<script setup>
import { Check } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import GlowHeart from '@/components/ui/GlowHeart.vue'
import { promises } from '@/content/messages'
</script>

<template>
  <section id="promises" class="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32" aria-labelledby="promises-title">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute inset-0 bg-gradient-to-b from-navy-900 via-[#1a1a4d] to-navy-950" />
      <div class="glow-blob left-1/2 top-24 h-80 w-80 -translate-x-1/2 bg-blush-500/20" />
    </div>

    <div class="relative mx-auto max-w-3xl">
      <div v-reveal class="mb-12 flex justify-center">
        <GlowHeart :size="110" rings />
      </div>

      <SectionHeading :eyebrow="promises.eyebrow" :title="promises.title" title-id="promises-title" />

      <ul class="mt-14 space-y-4">
        <li v-for="(item, i) in promises.items" :key="i" v-reveal="i * 90">
          <div class="promise glass flex items-start gap-4 rounded-2xl px-5 py-5 sm:gap-5 sm:px-7">
            <span class="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blush-400 to-lilac-500 shadow-[0_0_18px_rgba(241,144,176,0.55)]">
              <Check class="h-4 w-4 text-white" aria-hidden="true" />
            </span>
            <p class="font-serif text-lg leading-relaxed text-white/90 sm:text-xl">{{ item }}</p>
          </div>
        </li>
      </ul>

      <blockquote v-reveal class="relative mx-auto mt-16 max-w-2xl text-center">
        <span class="absolute -top-10 left-1/2 -translate-x-1/2 font-serif text-8xl leading-none text-blush-300/20" aria-hidden="true">“</span>
        <p class="relative font-serif text-2xl italic leading-relaxed text-white sm:text-3xl sm:leading-relaxed">
          {{ promises.closing }}
        </p>
      </blockquote>
    </div>
  </section>
</template>

<style scoped>
.promise {
  transition: border-color 0.5s ease, transform 0.5s ease, background-color 0.5s ease;
}
@media (hover: hover) {
  .promise:hover {
    border-color: rgb(247 180 201 / 0.35);
    transform: translateX(4px);
  }
}
</style>
