<script setup>
import { Check, Copy } from 'lucide-vue-next'
import { useClipboard } from '@/composables/useClipboard'

/** Copies the given text and shows a gentle confirmation. */
const props = defineProps({
  text: { type: String, required: true },
  label: { type: String, default: 'Copy this message' },
})

const { copy, copied, failed } = useClipboard()
</script>

<template>
  <div class="flex flex-col items-center">
    <button type="button" class="btn-soft" @click="copy(props.text)">
      <component :is="copied ? Check : Copy" class="h-4 w-4" aria-hidden="true" />
      <span>{{ copied ? 'Copied with love ❤' : label }}</span>
    </button>
    <p class="mt-2 h-4 text-xs text-white/50" aria-live="polite">
      <template v-if="failed">Sorry, copying didn't work on this device.</template>
    </p>
  </div>
</template>
