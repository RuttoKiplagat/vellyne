<script setup>
import SectionHeading from '@/components/ui/SectionHeading.vue'
import DevHint from '@/components/ui/DevHint.vue'
import { apology } from '@/content/messages'
import { herDisplayName, love } from '@/config/love'
</script>

<template>
  <section id="apology" class="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32" aria-labelledby="apology-title">
    <!-- Soft background -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-[#1b1645]" />
      <div class="glow-blob left-[-10%] top-[20%] h-80 w-80 bg-blush-500/15" />
      <div class="glow-blob bottom-[5%] right-[-10%] h-96 w-96 bg-lilac-500/20 [animation-delay:-8s]" />
    </div>

    <div class="relative">
      <SectionHeading :eyebrow="apology.eyebrow" :title="apology.title" title-id="apology-title" />

      <!-- The letter -->
      <article
        v-reveal="150"
        class="letter relative mx-auto mt-14 max-w-2xl rounded-[2rem] px-6 py-12 text-navy-800 sm:px-14 sm:py-16"
      >
        <!-- Wax seal -->
        <div class="seal absolute -top-7 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full" aria-hidden="true">
          <svg viewBox="0 0 24 24" class="h-6 w-6 fill-white/90">
            <path d="M12 21.35 10.55 20C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z" />
          </svg>
        </div>

        <div class="mb-8 flex flex-wrap items-baseline justify-between gap-2 text-sm text-navy-700/60">
          <span class="font-sans tracking-wide">To {{ herDisplayName }},</span>
          <span v-if="love.apologyDate" class="font-serif italic">{{ love.apologyDate }}</span>
          <DevHint v-else text="Add the date" />
        </div>

        <p v-reveal class="font-script text-4xl leading-snug text-navy-800 sm:text-5xl">
          {{ apology.salutation }}
        </p>

        <div class="mt-8 space-y-6 font-serif text-[1.2rem] leading-[1.85] text-navy-800/90 sm:text-[1.35rem]">
          <p
            v-for="(paragraph, i) in apology.paragraphs"
            :key="i"
            v-reveal="60"
            :class="{ 'text-center text-[1.35rem] italic text-blush-500 sm:text-2xl': i === 1 }"
          >
            {{ paragraph }}
          </p>
        </div>

        <p v-reveal class="mt-10 font-script text-4xl text-blush-500 sm:text-5xl">
          {{ apology.closing }}
        </p>

        <div class="mt-8 text-right font-serif text-lg italic text-navy-700/70">
          <template v-if="love.yourName">— {{ love.yourName }}</template>
          <DevHint v-else text="Add your name" />
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.letter {
  background:
    radial-gradient(circle at 15% 0%, rgb(251 210 223 / 0.55), transparent 45%),
    radial-gradient(circle at 100% 100%, rgb(221 208 251 / 0.6), transparent 50%),
    linear-gradient(180deg, #fffdfd 0%, #fff6f9 100%);
  box-shadow:
    0 40px 100px -30px rgb(141 108 230 / 0.55),
    0 0 0 1px rgb(255 255 255 / 0.6) inset,
    0 0 80px -20px rgb(241 144 176 / 0.35);
}
.seal {
  background: radial-gradient(circle at 35% 30%, #f7b4c9, #e86c97 55%, #8d6ce6);
  box-shadow: 0 8px 24px -6px rgb(232 108 151 / 0.8), inset 0 -3px 6px rgb(0 0 0 / 0.15);
}
</style>
