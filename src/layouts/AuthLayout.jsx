import { Outlet, Link } from 'react-router-dom'
import { Sun, Moon, Sparkles } from 'lucide-react'
import { useTheme } from '../hooks/useTheme.js'
import { ROUTES } from '../router/routes.js'

export default function AuthLayout() {
  const { toggleTheme, isDark } = useTheme()

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark-950 transition-colors duration-300 px-4">
      
      {/* Decorative Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-blob-indigo rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-blob-cyan rounded-full blur-[100px]" />
      </div>

      {/* Floating Theme Switcher */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-slate-200/50 dark:border-dark-800/50 bg-white/50 dark:bg-dark-900/50 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-dark-800 text-slate-600 dark:text-dark-300 transition-premium focus-ring"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-brand-600" />}
        </button>
      </div>

      <div className="w-full max-w-md z-10 flex flex-col gap-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-3">
          <Link to={ROUTES.DASHBOARD} className="flex items-center gap-3 group focus-ring p-2 rounded-xl">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white shadow-glass-glow group-hover:scale-105 transition-premium">
              <Sparkles className="w-6 h-6 animate-pulse-slow" />
            </div>
          </Link>
          <div className="text-center">
            <h1 className="font-extrabold tracking-tight text-slate-900 dark:text-white font-sans text-2xl">
              LinguaMate AI
            </h1>
            <p className="text-xs text-brand-600 dark:text-brand-400 uppercase tracking-widest font-bold mt-1">
              Premium AI Language Companion
            </p>
          </div>
        </div>

        {/* Content Outlet for Login/Register Pages */}
        <Outlet />
      </div>
    </div>
  )
}
