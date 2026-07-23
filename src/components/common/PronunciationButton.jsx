import { useId } from 'react'
import { Volume2, Square, Loader2, RotateCcw } from 'lucide-react'
import { useSpeechContext } from '../../context/SpeechContext.jsx'

export default function PronunciationButton({
  text,
  speakerId,
  lang = 'hi-IN',
  rate,
  pitch,
  size = 'md',
  variant = 'ghost',
  label,
  showLabel = false,
  className = ''
}) {
  const generatedId = useId()
  const id = speakerId || generatedId

  const { activeSpeakerId, isPlaying, isLoading, speak, stop } = useSpeechContext()

  const isThisPlaying = isPlaying && activeSpeakerId === id
  const isThisLoading = isLoading && activeSpeakerId === id

  const handleClick = (e) => {
    e.stopPropagation()
    if (isThisPlaying) {
      stop()
    } else {
      speak(text, id, { lang, rate, pitch })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick(e)
    }
  }

  // Size classes
  const sizeClasses = {
    sm: 'p-1.5 text-xs rounded-lg gap-1',
    md: 'p-2 text-xs rounded-xl gap-1.5',
    lg: 'p-3 text-sm rounded-2xl gap-2'
  }[size] || 'p-2 text-xs rounded-xl gap-1.5'

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size] || 'w-4 h-4'

  // Variant classes
  const variantClasses = {
    ghost: isThisPlaying
      ? 'bg-brand-500/20 text-brand-600 dark:text-brand-400 font-bold border border-brand-500/30'
      : 'bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-400 font-semibold',
    solid: isThisPlaying
      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
      : 'bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-glass-glow',
    outline: isThisPlaying
      ? 'bg-brand-500/10 border-2 border-brand-500 text-brand-600 dark:text-brand-400 font-bold'
      : 'bg-transparent border border-slate-200 dark:border-dark-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-800'
  }[variant] || 'bg-brand-500/10 text-brand-600 dark:text-brand-400'

  const ariaLabel = label || `Listen pronunciation for ${text}`

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={!text}
      aria-label={ariaLabel}
      aria-live="polite"
      title={isThisPlaying ? "Stop Pronunciation" : ariaLabel}
      className={`inline-flex items-center justify-center transition-all duration-200 focus-ring shrink-0 disabled:opacity-40 cursor-pointer ${sizeClasses} ${variantClasses} ${className}`}
    >
      {isThisLoading ? (
        <Loader2 className={`${iconSizes} animate-spin text-brand-600 dark:text-brand-400`} />
      ) : isThisPlaying ? (
        <Square className={`${iconSizes} fill-current`} />
      ) : (
        <Volume2 className={`${iconSizes}`} />
      )}

      {(showLabel || label) && (
        <span className="font-semibold select-none">
          {isThisPlaying ? 'Stop' : label || 'Listen'}
        </span>
      )}
    </button>
  )
}
