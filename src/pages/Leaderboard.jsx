import { Trophy, Flame, Star, Award, Sparkles, User, Zap } from 'lucide-react'

export default function Leaderboard() {
  const leaders = [
    { rank: 1, name: 'Priya Sharma', xp: 2450, streak: 21, level: 'Level 5: Vividh' },
    { rank: 2, name: 'Alex Carter (You)', xp: 450, streak: 7, level: 'Level 2: Madhyamik' },
    { rank: 3, name: 'Rahul Verma', xp: 380, streak: 5, level: 'Level 2: Madhyamik' },
    { rank: 4, name: 'Sophia Miller', xp: 310, streak: 4, level: 'Level 1: Prathamik' },
    { rank: 5, name: 'Vikram Singh', xp: 290, streak: 3, level: 'Level 1: Prathamik' }
  ]

  return (
    <div className="flex flex-col gap-5 max-w-[1200px] mx-auto animate-fade-in">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans flex items-center gap-2">
          <span>Global Leaderboard</span>
          <Trophy className="w-6 h-6 text-amber-500" />
        </h1>
        <p className="text-slate-500 dark:text-dark-400 text-xs md:text-sm">
          Top Hindi language learners this week based on XP earned & daily streaks.
        </p>
      </div>

      <div className="p-5 rounded-3xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-glass space-y-3">
        {leaders.map((user) => (
          <div
            key={user.rank}
            className={`p-3.5 md:p-4 rounded-2xl flex items-center justify-between border transition-all ${
              user.rank === 2
                ? 'bg-brand-500/10 border-brand-500/30 dark:bg-brand-500/20'
                : 'bg-white/60 dark:bg-dark-800/60 border-slate-200/60 dark:border-dark-700/60'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                user.rank === 1 ? 'bg-amber-500 text-slate-950' :
                user.rank === 2 ? 'bg-indigo-600 text-white' :
                user.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-200 dark:bg-dark-700 text-slate-700 dark:text-slate-300'
              }`}>
                #{user.rank}
              </div>

              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-dark-700 flex items-center justify-center text-slate-700 dark:text-slate-200 font-bold">
                <User className="w-4 h-4" />
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-xs md:text-sm flex items-center gap-2">
                  <span>{user.name}</span>
                  {user.rank === 2 && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-500 text-white font-bold">YOU</span>}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-dark-400 font-medium">{user.level}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>{user.streak} days</span>
              </div>
              
              <div className="flex items-center gap-1 font-extrabold text-slate-900 dark:text-white text-xs md:text-sm">
                <Zap className="w-3.5 h-3.5 text-indigo-500 fill-current" />
                <span>{user.xp} XP</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
