import { useSpeechContext } from '../context/SpeechContext.jsx'

export function useSpeech() {
  const {
    activeSpeakerId,
    isPlaying,
    isLoading,
    currentText,
    speechRate,
    speak,
    stop,
    replay,
    changeSpeechRate
  } = useSpeechContext()

  return {
    activeSpeakerId,
    isPlaying,
    isLoading,
    currentText,
    speechRate,
    speak,
    stop,
    replay,
    setRate: changeSpeechRate
  }
}
