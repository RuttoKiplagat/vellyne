import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Returns a reactive `true` when the visitor has asked their device
 * to reduce motion. Used to calm down or skip animations.
 */
export function useReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)'
  const reduced = ref(typeof window !== 'undefined' && window.matchMedia(query).matches)
  let media

  const update = (event) => {
    reduced.value = event.matches
  }

  onMounted(() => {
    media = window.matchMedia(query)
    reduced.value = media.matches
    media.addEventListener('change', update)
  })

  onBeforeUnmount(() => media?.removeEventListener('change', update))

  return reduced
}
