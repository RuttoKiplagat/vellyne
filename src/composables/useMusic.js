import { onBeforeUnmount, onMounted, ref } from 'vue'
import { love } from '@/config/love'

/**
 * Gentle background music that only starts when she chooses to play it.
 *
 * - If `love.musicSrc` points to an audio file, that file is played (looped).
 * - Otherwise a soft, slow piano-like melody is generated live with the
 *   Web Audio API, so no download or licensed track is needed.
 */
export function useMusic() {
  const isPlaying = ref(false)
  const player = love.musicSrc ? createFilePlayer(love.musicSrc) : createAmbientPiano()
  let resumeWhenVisible = false

  async function play() {
    try {
      await player.play()
      isPlaying.value = true
    } catch (error) {
      console.warn('Music could not start:', error)
      isPlaying.value = false
    }
  }

  function pause() {
    player.pause()
    isPlaying.value = false
  }

  function toggle() {
    isPlaying.value ? pause() : play()
  }

  // Quietly pause while the tab is hidden, and resume when she comes back.
  function onVisibilityChange() {
    if (document.hidden && isPlaying.value) {
      resumeWhenVisible = true
      pause()
    } else if (!document.hidden && resumeWhenVisible) {
      resumeWhenVisible = false
      play()
    }
  }

  onMounted(() => document.addEventListener('visibilitychange', onVisibilityChange))
  onBeforeUnmount(() => {
    document.removeEventListener('visibilitychange', onVisibilityChange)
    player.destroy()
  })

  return { isPlaying, toggle }
}

/* ------------------------------------------------------------------ */
/* Option 1: play an audio file                                        */
/* ------------------------------------------------------------------ */
function createFilePlayer(src) {
  const audio = new Audio(src)
  audio.loop = true
  audio.preload = 'none'
  audio.volume = 0
  let fadeTimer

  function fadeTo(target, ms, done) {
    clearInterval(fadeTimer)
    const steps = 30
    const delta = (target - audio.volume) / steps
    let i = 0
    fadeTimer = setInterval(() => {
      i++
      audio.volume = Math.min(1, Math.max(0, audio.volume + delta))
      if (i >= steps) {
        clearInterval(fadeTimer)
        audio.volume = target
        done?.()
      }
    }, ms / steps)
  }

  return {
    async play() {
      await audio.play()
      fadeTo(0.55, 1800)
    },
    pause() {
      fadeTo(0, 700, () => audio.pause())
    },
    destroy() {
      clearInterval(fadeTimer)
      audio.pause()
    },
  }
}

/* ------------------------------------------------------------------ */
/* Option 2: a soft, generated piano melody                            */
/* ------------------------------------------------------------------ */
const midiToFreq = (midi) => 440 * 2 ** ((midi - 69) / 12)

// A slow, warm chord progression (MIDI note numbers).
const PROGRESSION = [
  { bass: 41, chord: [53, 57, 60, 64] }, // Fmaj7
  { bass: 40, chord: [52, 55, 59, 62] }, // Em7
  { bass: 38, chord: [50, 53, 57, 60] }, // Dm7
  { bass: 36, chord: [48, 52, 55, 59] }, // Cmaj7
  { bass: 45, chord: [57, 60, 64, 67] }, // Am7
  { bass: 41, chord: [53, 57, 60, 65] }, // F
  { bass: 36, chord: [48, 55, 60, 64] }, // C
  { bass: 43, chord: [50, 55, 59, 62] }, // G
]
const ARPEGGIO = [0, 1, 2, 3, 2, 1, 2, 3]
const BPM = 62
const STEP = 60 / BPM / 2 // eighth notes
const STEPS_PER_BAR = 8
const LOOKAHEAD = 0.3 // seconds

function createAmbientPiano() {
  let ctx = null
  let master = null
  let bus = null
  let timer = null
  let suspendTimer = null
  let nextTime = 0
  let step = 0
  let bar = 0

  function setup() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) throw new Error('Web Audio is not supported in this browser')
    ctx = new AudioCtx()

    master = ctx.createGain()
    master.gain.value = 0

    const compressor = ctx.createDynamicsCompressor()
    compressor.threshold.value = -18
    compressor.ratio.value = 3

    // Simple, soft reverb made from decaying noise.
    const reverb = ctx.createConvolver()
    reverb.buffer = makeImpulse(ctx, 3.4)
    const wet = ctx.createGain()
    wet.gain.value = 0.45
    const dry = ctx.createGain()
    dry.gain.value = 0.75

    bus = ctx.createGain()
    bus.connect(dry).connect(master)
    bus.connect(reverb).connect(wet).connect(master)
    master.connect(compressor).connect(ctx.destination)
  }

  function scheduleStep(time) {
    const { bass, chord } = PROGRESSION[bar]

    if (step === 0) {
      piano(bass, time, 0.13, 4.2)
      pad(chord, time, STEP * STEPS_PER_BAR)
    }

    piano(chord[ARPEGGIO[step]], time, step === 0 ? 0.1 : 0.07, 2.6)

    // A sparse, gentle melody on top.
    const chance = step === 0 ? 0.6 : step === 4 ? 0.4 : step === 6 ? 0.18 : 0
    if (Math.random() < chance) {
      const tone = chord[1 + Math.floor(Math.random() * 3)] + 12
      piano(tone, time + 0.01, 0.11, 3.2)
    }
  }

  function piano(midi, time, velocity, duration) {
    const freq = midiToFreq(midi)
    const out = ctx.createGain()
    out.gain.setValueAtTime(0.0001, time)
    out.gain.exponentialRampToValueAtTime(velocity, time + 0.015)
    out.gain.exponentialRampToValueAtTime(velocity * 0.35, time + 0.4)
    out.gain.exponentialRampToValueAtTime(0.0001, time + duration)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(Math.min(5000, freq * 6), time)
    filter.frequency.exponentialRampToValueAtTime(Math.max(250, freq * 1.4), time + duration)

    const body = ctx.createOscillator()
    body.type = 'triangle'
    body.frequency.value = freq

    const shimmer = ctx.createOscillator()
    shimmer.type = 'sine'
    shimmer.frequency.value = freq * 2
    const shimmerGain = ctx.createGain()
    shimmerGain.gain.value = 0.22

    body.connect(filter)
    shimmer.connect(shimmerGain).connect(filter)
    filter.connect(out).connect(bus)

    body.start(time)
    shimmer.start(time)
    body.stop(time + duration + 0.05)
    shimmer.stop(time + duration + 0.05)
  }

  function pad(notes, time, length) {
    const out = ctx.createGain()
    out.gain.setValueAtTime(0.0001, time)
    out.gain.linearRampToValueAtTime(0.022, time + 1.4)
    out.gain.setValueAtTime(0.022, time + length - 0.2)
    out.gain.linearRampToValueAtTime(0.0001, time + length + 1.6)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 900
    filter.connect(out).connect(bus)

    for (const note of notes) {
      for (const detune of [-5, 5]) {
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = midiToFreq(note)
        osc.detune.value = detune
        osc.connect(filter)
        osc.start(time)
        osc.stop(time + length + 1.7)
      }
    }
  }

  function tick() {
    while (nextTime < ctx.currentTime + LOOKAHEAD) {
      scheduleStep(nextTime)
      nextTime += STEP
      step++
      if (step === STEPS_PER_BAR) {
        step = 0
        bar = (bar + 1) % PROGRESSION.length
      }
    }
    timer = setTimeout(tick, 80)
  }

  return {
    async play() {
      if (!ctx) setup()
      clearTimeout(suspendTimer)
      await ctx.resume()
      clearTimeout(timer)
      step = 0
      nextTime = ctx.currentTime + 0.12
      tick()
      const now = ctx.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(0.9, now + 2.5)
    },
    pause() {
      if (!ctx) return
      const now = ctx.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(0, now + 0.8)
      clearTimeout(timer)
      suspendTimer = setTimeout(() => ctx.suspend(), 3500)
    },
    destroy() {
      clearTimeout(timer)
      clearTimeout(suspendTimer)
      ctx?.close()
    },
  }
}

function makeImpulse(ctx, seconds) {
  const length = Math.floor(ctx.sampleRate * seconds)
  const impulse = ctx.createBuffer(2, length, ctx.sampleRate)
  for (let channel = 0; channel < 2; channel++) {
    const data = impulse.getChannelData(channel)
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3
    }
  }
  return impulse
}
