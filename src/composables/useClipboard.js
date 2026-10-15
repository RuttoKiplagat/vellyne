import { ref } from 'vue'

/**
 * Copies text to the clipboard, with a fallback for browsers or
 * connections (plain http on a phone) where the Clipboard API is unavailable.
 */
export function useClipboard(resetAfter = 2500) {
  const copied = ref(false)
  const failed = ref(false)
  let timer

  async function copy(text) {
    failed.value = false
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        fallbackCopy(text)
      }
      copied.value = true
    } catch {
      try {
        fallbackCopy(text)
        copied.value = true
      } catch {
        failed.value = true
      }
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      copied.value = false
      failed.value = false
    }, resetAfter)
  }

  return { copy, copied, failed }
}

function fallbackCopy(text) {
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(area)
  if (!ok) throw new Error('Copy failed')
}
