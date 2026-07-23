import { useState } from 'react'
import { User, Settings, Volume2, Languages, Shield, Bell, Check, Flame, Globe } from 'lucide-react'
import { useSpeech } from '../hooks/useSpeech.js'

export default function ProfileSettings() {
  const { speechRate, setRate } = useSpeech()
  const [scriptPref, setScriptPref] = useState('both')

  return (
    <div className="flex flex-col gap-5 max-w-[1200px] mx-auto animate-fade-in">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
          Profile & Settings
        </h1>
        <p className="text-slate-500 dark:text-dark-400 text-xs md:text-sm">
          Customize your VaaniAI speech feedback, Devanagari script modes, and TTS audio playback speeds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* PROFILE CARD */}
        <div className="p-5 rounded-3xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-glass flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white text-2xl mb-3 shadow-lg">
            <User className="w-8 h-8" />
          </div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Alex Carter</h3>
          <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold mb-4">Hindi Learner • Level 2</p>

          <div className="w-full pt-4 border-t border-slate-200 dark:border-dark-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-dark-300">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-brand-600" />
                Target Language
              </span>
              <span className="font-bold text-slate-900 dark:text-white">Hindi (हिन्दी)</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-dark-300">
              <span>AI Coach</span>
              <span className="font-bold text-amber-500">VaaniAI Active</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-dark-300">
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
                Current Streak
              </span>
              <span className="font-bold text-amber-500">7 Days</span>
            </div>
          </div>
        </div>

        {/* SETTINGS OPTIONS */}
        <div className="md:col-span-2 p-5 rounded-3xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-glass space-y-5">
          
          <div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm md:text-base mb-2.5 flex items-center gap-2">
              <Languages className="w-4 h-4 text-brand-600" />
              <span>Script Display Preferences</span>
            </h4>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'both', label: 'Devanagari + Hinglish' },
                { id: 'devanagari', label: 'Devanagari Only (हिन्दी)' },
                { id: 'hinglish', label: 'Hinglish Only' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setScriptPref(opt.id)}
                  className={`p-2.5 rounded-2xl border text-xs font-bold transition-all text-center ${
                    scriptPref === opt.id
                      ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                      : 'bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-dark-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm md:text-base mb-2.5 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-amber-500" />
              <span>VaaniAI Speech Playback Speed</span>
            </h4>
            <div className="grid grid-cols-4 gap-2.5">
              {[
                { rate: 0.7, label: 'Slow (0.7x)' },
                { rate: 0.85, label: 'Beginner (0.85x)' },
                { rate: 1.0, label: 'Normal (1.0x)' },
                { rate: 1.2, label: 'Fast (1.2x)' }
              ].map((opt) => (
                <button
                  key={opt.rate}
                  onClick={() => setRate(opt.rate)}
                  className={`p-2.5 rounded-2xl border text-xs font-bold transition-all text-center ${
                    speechRate === opt.rate
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-dark-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-dark-800 flex justify-end">
            <button className="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition-all shadow-glass-glow flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Save Preferences</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}
