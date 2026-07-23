import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { speechManager } from '../utils/speechManager.js'

const SpeechContext = createContext(null)

export function SpeechProvider({ children }) {
  const [activeSpeakerId, setActiveSpeakerId] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [speechRate, setSpeechRate] = useState(0.85) // Beginner speed default: 0.85

  const lastSpokenRef = useRef({ text: '', id: null })

  const stop = useCallback(() => {
    speechManager.stop()
    setIsPlaying(false)
    setIsLoading(false)
    setActiveSpeakerId(null)
  }, [])

  const speak = useCallback((text, speakerId = null, options = {}) => {
    if (!text) return

    // If currently playing the same speaker, stop it (toggle behavior)
    if (isPlaying && activeSpeakerId === speakerId) {
      stop()
      return
    }

    speechManager.stop()
    setIsLoading(true)
    setActiveSpeakerId(speakerId)
    setCurrentText(text)
    lastSpokenRef.current = { text, id: speakerId }

    const rate = options.rate !== undefined ? options.rate : speechRate

    speechManager.speak(text, {
      lang: options.lang || 'hi-IN',
      rate: rate,
      pitch: options.pitch || 1,
      volume: options.volume || 1,
      onStart: () => {
        setIsLoading(false)
        setIsPlaying(true)
      },
      onEnd: () => {
        setIsPlaying(false)
        setIsLoading(false)
        setActiveSpeakerId(null)
      },
      onError: (err) => {
        console.warn('SpeechSynthesis error:', err)
        setIsPlaying(false)
        setIsLoading(false)
        setActiveSpeakerId(null)
      }
    })
  }, [isPlaying, activeSpeakerId, speechRate, stop])

  const replay = useCallback((options = {}) => {
    if (lastSpokenRef.current.text) {
      speak(lastSpokenRef.current.text, lastSpokenRef.current.id, options)
    }
  }, [speak])

  const changeSpeechRate = useCallback((newRate) => {
    setSpeechRate(newRate)
  }, [])

  return (
    <SpeechContext.Provider
      value={{
        activeSpeakerId,
        isPlaying,
        isLoading,
        currentText,
        speechRate,
        speak,
        stop,
        replay,
        changeSpeechRate
      }}
    >
      {children}
    </SpeechContext.Provider>
  )
}

export function useSpeechContext() {
  const context = useContext(SpeechContext)
  if (!context) {
    throw new Error('useSpeechContext must be used within a SpeechProvider')
  }
  return context
}
