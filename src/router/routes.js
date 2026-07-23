/**
 * Single source of truth for route path declarations.
 * Helps prevent typos and makes route updates central and safe.
 */
export const ROUTES = {
  // App routes (Behind RootLayout)
  DASHBOARD: '/',
  LEARN: '/learn',
  CHAT: '/chat',
  LEADERBOARD: '/leaderboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',

  // Auth routes (Behind AuthLayout)
  LOGIN: '/login',
  REGISTER: '/register',
}
