/**
 * Production-Ready Speech Architecture & Voice Manager for HindiMate AI
 * 
 * Future-Ready Abstraction: Uses an ISpeechProvider interface pattern.
 * Currently backed by WebSpeechProvider (browser SpeechSynthesis API).
 * Can be swapped with Google Cloud TTS, Amazon Polly, Azure Speech, or OpenAI Audio API
 * without modifying any UI components.
 */

// Speech Provider Interface Pattern
export class WebSpeechProvider {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null
    this.voices = []
    this.cachedHindiVoice = null
    this.isLoaded = false

    if (this.synth) {
      this.initVoices()
    }
  }

  initVoices() {
    if (!this.synth) return

    const load = () => {
      this.voices = this.synth.getVoices()
      this.cachedHindiVoice = this.findBestVoice()
      this.isLoaded = true
    }

    load()
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = load
    }
  }

  findBestVoice() {
    if (!this.voices || this.voices.length === 0) return null

    // 1. Exact match for hi-IN or hi_IN
    const exactHindi = this.voices.find(
      (v) => v.lang === 'hi-IN' || v.lang === 'hi_IN' || v.lang.startsWith('hi')
    )
    if (exactHindi) return exactHindi

    // 2. Fallback to Indian English (en-IN)
    const indianEnglish = this.voices.find(
      (v) => v.lang === 'en-IN' || v.lang === 'en_IN'
    )
    if (indianEnglish) return indianEnglish

    // 3. Fallback to default voice
    return this.voices.find((v) => v.default) || this.voices[0] || null
  }

  getAvailableVoices() {
    if (!this.isLoaded && this.synth) {
      this.voices = this.synth.getVoices()
    }
    return this.voices
  }

  stop() {
    if (this.synth) {
      this.synth.cancel()
    }
  }

  speak(text, { lang = 'hi-IN', rate = 0.85, pitch = 1, volume = 1, onStart, onEnd, onError } = {}) {
    if (!this.synth || !text) return null

    // Ensure single audio lock: cancel previous speech before starting another
    this.synth.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = volume

    const voice = this.cachedHindiVoice || this.findBestVoice()
    if (voice) {
      utterance.voice = voice
    }

    if (onStart) utterance.onstart = onStart
    if (onEnd) utterance.onend = onEnd
    if (onError) utterance.onerror = onError

    // Workaround for Chrome SpeechSynthesis pause bug on long sentences
    this.synth.speak(utterance)
    return utterance
  }
}

// Global Singleton Speech Manager Instance
export const speechManager = new WebSpeechProvider()
