<script setup>
import { ref } from 'vue'
import { Ear, HeartHandshake, ShieldCheck } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { gifts } from '@/content/messages'

const icons = { ShieldCheck, Ear, HeartHandshake }
const active = ref(null)

function select(index) {
  active.value = active.value === index ? null : index
}
</script>

<template>
  <section id="gifts" class="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32" aria-labelledby="gifts-title">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute inset-0 bg-gradient-to-b from-[#1b1645] via-navy-900 to-navy-900" />
      <div class="glow-blob left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 bg-lilac-500/15" />
    </div>

    <div class="relative mx-auto max-w-6xl">
      <SectionHeading :eyebrow="gifts.eyebrow" :title="gifts.title" title-id="gifts-title" />
      <p v-reveal="300" class="mt-4 text-center text-sm text-white/45 md:hidden">{{ gifts.hint }}</p>

      <ul class="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
        <li v-for="(card, i) in gifts.cards" :key="card.title" v-reveal="i * 150">
          <button
            type="button"
            class="gift-card glass group relative flex h-full w-full flex-col items-center rounded-[2rem] px-7 pb-10 pt-12 text-center"
            :class="{ 'is-active': active === i }"
            :aria-pressed="active === i"
            @click="select(i)"
          >
            <span class="card-glow pointer-events-none absolute inset-0 rounded-[2rem]" aria-hidden="true" />

            <span class="emoji relative mb-6 grid h-20 w-20 place-items-center rounded-full bg-white/5 text-4xl ring-1 ring-white/10">
              {{ card.emoji }}
            </span>

            <h3 class="relative font-script text-4xl text-white sm:text-[2.6rem]">{{ card.title }}</h3>

            <p class="relative mt-4 font-serif text-lg leading-relaxed text-white/80 sm:text-xl">
              {{ card.text }}
            </p>

            <span class="given relative mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-blush-200">
              <component :is="icons[card.icon]" class="h-4 w-4" aria-hidden="true" />
              Given with love
            </span>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.gift-card {
  transition:
    transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1),
    border-color 0.6s ease,
    box-shadow 0.6s ease;
  -webkit-tap-highlight-color: transparent;
}
.card-glow {
  opacity: 0;
  background:
    radial-gradient(circle at 50% 0%, rgb(241 144 176 / 0.28), transparent 60%),
    radial-gradient(circle at 50% 100%, rgb(141 108 230 / 0.25), transparent 60%);
  transition: opacity 0.6s ease;
}
.emoji {
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.6s ease;
}
.given {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

/* Shared "lifted" look for hover (on devices that can hover) and tap */
.gift-card.is-active,
.gift-card:focus-visible {
  transform: translateY(-10px);
  border-color: rgb(247 180 201 / 0.45);
  box-shadow:
    0 30px 70px -25px rgb(232 108 151 / 0.55),
    0 0 50px -15px rgb(141 108 230 / 0.6);
}
.gift-card.is-active .card-glow,
.gift-card:focus-visible .card-glow {
  opacity: 1;
}
.gift-card.is-active .emoji,
.gift-card:focus-visible .emoji {
  transform: scale(1.12);
  box-shadow: 0 0 30px rgb(241 144 176 / 0.45);
}
.gift-card.is-active .given,
.gift-card:focus-visible .given {
  opacity: 1;
  transform: none;
}

@media (hover: hover) {
  .gift-card:hover {
    transform: translateY(-10px);
    border-color: rgb(247 180 201 / 0.45);
    box-shadow:
      0 30px 70px -25px rgb(232 108 151 / 0.55),
      0 0 50px -15px rgb(141 108 230 / 0.6);
  }
  .gift-card:hover .card-glow { opacity: 1; }
  .gift-card:hover .emoji {
    transform: scale(1.12);
    box-shadow: 0 0 30px rgb(241 144 176 / 0.45);
  }
  .gift-card:hover .given {
    opacity: 1;
    transform: none;
  }
}

.gift-card:focus-visible {
  outline: 2px solid var(--color-blush-300);
  outline-offset: 4px;
  border-radius: 2rem;
}
</style>
