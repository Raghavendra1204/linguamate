import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import VaaniAIChat from '../pages/VaaniAIChat.jsx'
import LearnModules from '../pages/LearnModules.jsx'
import StudyMaterial from '../pages/StudyMaterial.jsx'
import Leaderboard from '../pages/Leaderboard.jsx'
import ProfileSettings from '../pages/ProfileSettings.jsx'
import { ROUTES } from './routes.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: ROUTES.LEARN,
        element: <LearnModules />
      },
      {
        path: ROUTES.MATERIAL,
        element: <StudyMaterial />
      },
      {
        path: ROUTES.CHAT,
        element: <VaaniAIChat />
      },
      {
        path: ROUTES.LEADERBOARD,
        element: <Leaderboard />
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfileSettings />
      },
      {
        path: ROUTES.SETTINGS,
        element: <ProfileSettings />
      }
    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: (
          <div className="flex flex-col gap-4 text-center max-w-sm w-full mx-auto p-8 glass-panel border border-white/20 shadow-glass rounded-3xl animate-slide-up bg-white/80 dark:bg-dark-900/80">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome to HindiMate AI 🪔</h2>
            <p className="text-xs text-slate-500 dark:text-dark-400">Sign in to practice with VaaniAI.</p>
            <div className="flex flex-col gap-3 mt-2">
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-700 bg-white dark:bg-dark-900 focus-ring text-xs" />
              <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-700 bg-white dark:bg-dark-900 focus-ring text-xs" />
              <button className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-xs transition-all shadow-glass-glow mt-2">
                Sign In
              </button>
            </div>
          </div>
        )
      },
      {
        path: ROUTES.REGISTER,
        element: (
          <div className="flex flex-col gap-4 text-center max-w-sm w-full mx-auto p-8 glass-panel border border-white/20 shadow-glass rounded-3xl animate-slide-up bg-white/80 dark:bg-dark-900/80">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create Account 🪔</h2>
            <p className="text-xs text-slate-500 dark:text-dark-400">Join HindiMate AI learning platform.</p>
            <div className="flex flex-col gap-3 mt-2">
              <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-700 bg-white dark:bg-dark-900 focus-ring text-xs" />
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-700 bg-white dark:bg-dark-900 focus-ring text-xs" />
              <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-700 bg-white dark:bg-dark-900 focus-ring text-xs" />
              <button className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-xs transition-all shadow-glass-glow mt-2">
                Get Started
              </button>
            </div>
          </div>
        )
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
