import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  BookOpen, 
  Library,
  MessageSquare, 
  Trophy, 
  User, 
  Settings, 
  Sun, 
  Moon, 
  Flame, 
  Bell, 
  Menu, 
  X,
  Sparkles,
  Award,
  Volume2,
  Globe
} from 'lucide-react'
import { useTheme } from '../hooks/useTheme.js'
import { ROUTES } from '../router/routes.js'

export default function RootLayout() {
  const { theme, toggleTheme, isDark } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { name: 'Learn & Modules', path: ROUTES.LEARN, icon: BookOpen },
    { name: 'Study Material', path: ROUTES.MATERIAL, icon: Library },
    { name: 'VaaniAI Chat', path: ROUTES.CHAT, icon: MessageSquare },
    { name: 'Leaderboard', path: ROUTES.LEADERBOARD, icon: Trophy },
    { name: 'Profile & Settings', path: ROUTES.PROFILE, icon: User },
  ]

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-dark-50 font-sans">
      
      {/* BACKGROUND DECORATIVE GLOW BLOBS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] bg-sky-500/10 dark:bg-sky-600/15 rounded-full blur-[130px]" />
        <div className="absolute top-[35%] right-[15%] w-[35%] h-[35%] bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-[110px]" />
      </div>

      {/* FIXED DESKTOP SIDEBAR (100vh height, 280px / w-72 width, flex-shrink-0, overflow-hidden) */}
      <aside className="hidden lg:flex flex-col w-72 h-screen flex-shrink-0 z-30 border-r border-slate-200/80 dark:border-dark-800 bg-white/70 dark:bg-dark-900/70 backdrop-blur-xl">
        
        {/* Brand Logo (Fixed Top) */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 dark:border-dark-800/60 flex-shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-brand-500 to-amber-500 flex items-center justify-center text-white shadow-glass-glow">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-slate-900 dark:text-white font-sans text-lg">
              HindiMate <span className="text-amber-500 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">AI</span>
            </span>
            <span className="text-[10px] font-medium text-slate-500 dark:text-dark-400">
              Powered by <strong className="text-brand-600 dark:text-brand-400">VaaniAI</strong>
            </span>
          </div>
        </div>

        {/* Navigation List (Scrolls independently if menu is long) */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  relative group flex items-center gap-3.5 px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200 focus-ring
                  ${isActive 
                    ? 'text-brand-600 dark:text-white font-semibold' 
                    : 'text-slate-600 dark:text-dark-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-dark-800/60'
                  }
                `}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-pill-desktop"
                    className="absolute inset-0 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-slate-200/80 dark:border-dark-700/80 z-0"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                
                <item.icon className={`w-5 h-5 relative z-10 transition-transform group-hover:scale-110 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 dark:text-dark-500'}`} />
                <span className="relative z-10">{item.name}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* VaaniAI Badge & Streak Card (Fixed Bottom) */}
        <div className="p-4 border-t border-slate-200/60 dark:border-dark-800/60 flex-shrink-0">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-brand-500/5 to-indigo-500/10 border border-amber-500/20 dark:border-amber-500/30 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">7 Day Streak</span>
                <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400">450 XP</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-dark-400 truncate">Level 2: Madhyamik</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER (Occupies remaining width & height, 100vh flex column) */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden relative">
        
        {/* FIXED TOP NAVBAR (sticky top-0, 64px / h-16 height, always visible) */}
        <header className="h-16 flex-shrink-0 sticky top-0 z-20 px-6 flex items-center justify-between border-b border-slate-200/80 dark:border-dark-800 bg-white/70 dark:bg-dark-900/70 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-dark-300 hover:bg-slate-100 dark:hover:bg-dark-800 transition-all focus-ring"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <h2 className="font-sans font-bold text-base md:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <span>नमस्ते</span>
                <span className="text-slate-400 dark:text-dark-500 text-xs md:text-sm font-normal">| Hindi Learning Portal</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Target Language Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Globe className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Hindi (हिन्दी)</span>
            </div>

            {/* Streak indicator on mobile header */}
            <div className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
              <Flame className="w-4 h-4 fill-current" />
              <span className="text-xs font-extrabold">7 Days</span>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200/60 dark:border-dark-800/60 hover:bg-slate-100 dark:hover:bg-dark-800 text-slate-600 dark:text-dark-300 transition-all focus-ring"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>
          </div>
        </header>

        {/* INDEPENDENT SCROLLABLE CONTENT AREA */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative">
          <div className="max-w-[1200px] mx-auto w-full pb-20 lg:pb-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="lg:hidden fixed top-0 bottom-0 left-0 w-72 bg-white dark:bg-dark-900 border-r border-slate-200 dark:border-dark-800 p-6 flex flex-col gap-6 z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center text-white text-lg">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-white text-lg">HindiMate AI</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-800 text-slate-600 dark:text-dark-300">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => `
                      flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all
                      ${isActive 
                        ? 'bg-brand-500/10 text-brand-600 dark:text-white dark:bg-brand-500/20 font-semibold' 
                        : 'text-slate-600 dark:text-dark-400 hover:bg-slate-100 dark:hover:bg-dark-800'
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-slate-200/60 dark:border-dark-800/60 bg-white/90 dark:bg-dark-950/90 backdrop-blur-lg flex items-center justify-around px-2 z-30">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                relative flex flex-col items-center justify-center flex-1 py-1 transition-all
                ${isActive ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-slate-400 dark:text-dark-500 hover:text-slate-600'}
              `}
            >
              {isActive && (
                <motion.span 
                  layoutId="active-dot-mobile"
                  className="absolute top-0 w-6 h-1 bg-brand-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] mt-1 truncate max-w-[64px]">{item.name}</span>
            </NavLink>
          )
        })}
      </nav>

    </div>
  )
}
