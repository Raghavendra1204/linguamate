import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Play, 
  MessageSquare, 
  Volume2, 
  BookOpen, 
  Trophy, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Star,
  RefreshCw,
  Layers,
  Bot,
  Target,
  Zap,
  BookMarked
} from 'lucide-react'
import { ROUTES } from '../router/routes.js'
import PronunciationButton from '../components/common/PronunciationButton.jsx'

export default function Dashboard() {
  const dailyModules = [
    {
      id: 1,
      title: 'Greetings & Introductions',
      hindi: 'अभिवादन और परिचय',
      level: 'Elementary',
      progress: 80,
      total: '10 Phrases',
      icon: MessageSquare,
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30'
    },
    {
      id: 2,
      title: 'Ordering Food at a Dhaba',
      hindi: 'ढाबे पर खाना मँगवाना',
      level: 'Intermediate',
      progress: 45,
      total: '15 Phrases',
      icon: BookOpen,
      color: 'from-brand-500/20 to-indigo-500/20 border-brand-500/30'
    },
    {
      id: 3,
      title: 'Devanagari Vowels (स्वर)',
      hindi: 'हिन्दी स्वर ज्ञान',
      level: 'Foundational',
      progress: 100,
      total: '11 Vowels',
      icon: Layers,
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30'
    }
  ]

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto animate-fade-in">
      
      {/* HERO BANNER WITH VAANIAI */}
      <div className="relative overflow-hidden p-6 md:p-8 rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-amber-600 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2.5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold w-fit">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>VaaniAI Live Language Coach</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans">
              नमस्ते! Ready to master Hindi today?
            </h1>
            <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
              Practice real-time speaking with <strong>VaaniAI</strong>. Instant grammar feedback, Devanagari script lessons, and adaptive conversational drills.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-1">
              <Link
                to={ROUTES.CHAT}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-lg hover:shadow-amber-500/25 active:scale-95 text-xs"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Talk to VaaniAI</span>
              </Link>
              
              <Link
                to={ROUTES.LEARN}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-semibold backdrop-blur-md transition-all border border-white/20 text-xs"
              >
                <BookOpen className="w-4 h-4" />
                <span>Browse Curriculum</span>
              </Link>
            </div>
          </div>

          {/* VAANIAI AVATAR WIDGET */}
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner text-center w-full md:w-52">
            <div className="relative mb-2">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-indigo-300 p-1 shadow-lg flex items-center justify-center text-white">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <Bot className="w-7 h-7 text-amber-400" />
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" title="VaaniAI Online" />
            </div>
            
            <h3 className="font-bold text-xs md:text-sm">VaaniAI Tutor</h3>
            <p className="text-[10px] text-amber-200 mt-0.5">"नमस्ते! मुझसे हिन्दी में बात करें"</p>
          </div>
        </div>
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-glass dark:shadow-glass-dark flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 font-bold">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="block text-xl font-black font-sans text-slate-900 dark:text-white">7 Days</span>
            <span className="text-[11px] text-slate-500 dark:text-dark-400 font-medium">Daily Streak</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-glass dark:shadow-glass-dark flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 font-bold">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="block text-xl font-black font-sans text-slate-900 dark:text-white">450 XP</span>
            <span className="text-[11px] text-slate-500 dark:text-dark-400 font-medium">Total Earned</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-glass dark:shadow-glass-dark flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 font-bold">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xl font-black font-sans text-slate-900 dark:text-white">48 Words</span>
            <span className="text-[11px] text-slate-500 dark:text-dark-400 font-medium">Mastered</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-glass dark:shadow-glass-dark flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 font-bold">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xl font-black font-sans text-slate-900 dark:text-white">92%</span>
            <span className="text-[11px] text-slate-500 dark:text-dark-400 font-medium">Grammar Score</span>
          </div>
        </div>
      </div>

      {/* WORD OF THE DAY & QUICK INTERACTIVE DRILL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* WORD OF THE DAY CARD */}
        <div className="md:col-span-2 p-5 rounded-3xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-glass dark:shadow-glass-dark flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-bold uppercase tracking-wider">
                Word of the Day (आज का शब्द)
              </span>
              <PronunciationButton
                text="नमस्ते, आप कैसे हैं?"
                speakerId="dashboard_wotd"
                size="sm"
                variant="ghost"
                label="Listen"
                showLabel={true}
              />
            </div>

            <div className="flex flex-col gap-1 my-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
                  नमस्ते
                </span>
                <span className="text-base text-brand-600 dark:text-brand-400 font-semibold italic">
                  [Namaste]
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-medium text-xs md:text-sm">
                Meaning: Hello / Formal Greeting with folded hands
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-dark-800/70 border border-slate-200/50 dark:border-dark-700/50 mt-3 text-xs flex items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">Example Sentence:</span>
                <p className="text-slate-900 dark:text-white font-medium">
                  "नमस्ते जी! आप कैसे हैं?" <span className="text-slate-500 dark:text-dark-400 font-normal">(Namaste ji! Aap kaise hain?)</span>
                </p>
              </div>
              <PronunciationButton
                text="नमस्ते जी! आप कैसे हैं?"
                speakerId="dashboard_wotd_example"
                size="sm"
                variant="outline"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200/50 dark:border-dark-800/50 text-xs text-slate-500 dark:text-dark-400">
            <span>Web Speech API Native Audio</span>
            <Link to={ROUTES.LEARN} className="text-brand-600 dark:text-brand-400 font-bold hover:underline flex items-center gap-1">
              <span>Explore Devanagari Script</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* VAANIAI QUICK PRACTICE SIDE WIDGET */}
        <div className="p-5 rounded-3xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-glass dark:shadow-glass-dark flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-1.5 flex items-center gap-2">
              <span>Quick Prompt</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">AI Tutor</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-dark-400 mb-3">
              Test your Hindi response with VaaniAI right now:
            </p>

            <div className="p-3.5 rounded-2xl bg-brand-500/5 border border-brand-500/20 text-xs space-y-1.5 relative">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-brand-600 dark:text-brand-400">VaaniAI asks:</span>
                <PronunciationButton text="आपका नाम क्या है?" speakerId="dashboard_prompt" size="sm" />
              </div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                "आपका नाम क्या है?"
              </div>
              <div className="text-[11px] text-slate-500 dark:text-dark-400">
                (Aapka naam kya hai? - What is your name?)
              </div>
            </div>
          </div>

          <Link
            to={ROUTES.CHAT}
            className="mt-4 w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition-all shadow-glass-glow flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Reply to VaaniAI</span>
          </Link>
        </div>

      </div>

      {/* ACTIVE LEARNING MODULES */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            Active Hindi Learning Modules
          </h2>
          <Link to={ROUTES.LEARN} className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
            <span>View All Curriculum</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {dailyModules.map((module) => (
            <div
              key={module.id}
              className={`p-5 rounded-2xl bg-gradient-to-br ${module.color} glass-panel border shadow-glass dark:shadow-glass-dark flex flex-col justify-between gap-3 hover:scale-[1.01] transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-white/60 dark:bg-dark-800/60 text-brand-600 dark:text-brand-400">
                    <module.icon className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/40 dark:bg-dark-800/40 text-slate-700 dark:text-slate-300 text-[10px] font-semibold">
                    {module.level}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                  {module.title}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-brand-600 dark:text-brand-400 font-bold text-xs">
                    {module.hindi}
                  </p>
                  <PronunciationButton text={module.hindi} speakerId={`module_${module.id}`} size="sm" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-dark-400 mb-1">
                  <span>Progress</span>
                  <span>{module.progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-dark-700 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-500 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${module.progress}%` }}
                  />
                </div>

                <Link
                  to={ROUTES.LEARN}
                  className="mt-3 w-full py-2 rounded-xl bg-white/80 dark:bg-dark-800/80 hover:bg-white dark:hover:bg-dark-800 text-slate-900 dark:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-brand-600 dark:text-brand-400" />
                  <span>{module.progress === 100 ? 'Review Module' : 'Continue Lesson'}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
