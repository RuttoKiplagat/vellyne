<script setup>
import SectionHeading from '@/components/ui/SectionHeading.vue'
import DevHint from '@/components/ui/DevHint.vue'
import { personalNote } from '@/content/messages'
import { herDisplayName, love } from '@/config/love'

// Split the message into paragraphs on blank lines.
const paragraphs = love.personalMessage
  .split(/\n\s*\n/)
  .map((p) => p.trim())
  .filter(Boolean)
</script>

<template>
  <section id="note" class="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32" aria-labelledby="note-title">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
      <div class="glow-blob left-[20%] top-[30%] h-72 w-72 bg-blush-500/15" />
    </div>

    <div class="relative mx-auto max-w-2xl">
      <SectionHeading :eyebrow="personalNote.eyebrow" :title="personalNote.title" title-id="note-title" />

      <article
        v-reveal="150"
        class="note relative mt-14 rotate-[-0.6deg] rounded-[1.75rem] px-7 py-10 text-navy-800 sm:px-12 sm:py-12"
      >
        <p class="font-script text-3xl text-navy-800 sm:text-4xl">Dear {{ herDisplayName }},</p>

        <div v-if="paragraphs.length" class="mt-6 space-y-5 font-serif text-xl italic leading-relaxed text-navy-800/90">
          <p v-for="(p, i) in paragraphs" :key="i">{{ p }}</p>
        </div>
        <div v-else class="mt-6 text-navy-700">
          <DevHint text="Write a personal message in your own words" />
        </div>

        <p class="mt-8 text-right font-script text-3xl text-blush-500">
          With all my love{{ love.yourName ? `, ${love.yourName}` : '' }}
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.note {
  background:
    repeating-linear-gradient(to bottom, transparent 0, transparent 2.35rem, rgb(141 108 230 / 0.12) 2.35rem, rgb(141 108 230 / 0.12) calc(2.35rem + 1px)),
    linear-gradient(160deg, #fff9fb, #fdeef4);
  box-shadow:
    0 35px 80px -30px rgb(232 108 151 / 0.55),
    0 0 0 1px rgb(255 255 255 / 0.7) inset;
}
.note.reveal:not(.is-visible) {
  transform: rotate(-0.6deg) translateY(26px);
}
.note.reveal.is-visible {
  transform: rotate(-0.6deg);
}
</style>
