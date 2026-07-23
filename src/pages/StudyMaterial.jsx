import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Library, 
  Search, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  HelpCircle,
  FileText,
  CheckCircle2,
  ArrowRight,
  Zap,
  Clock
} from 'lucide-react'
import { HINDI_STUDY_MATERIAL } from '../data/hindiStudyMaterial.js'
import PronunciationButton from '../components/common/PronunciationButton.jsx'
import { ROUTES } from '../router/routes.js'

export default function StudyMaterial() {
  const navigate = useNavigate()
  const [selectedChapterId, setSelectedChapterId] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSnippet, setSelectedSnippet] = useState(null)

  // Filter chapters based on search query
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return HINDI_STUDY_MATERIAL
    const q = searchQuery.toLowerCase()
    return HINDI_STUDY_MATERIAL.filter(
      (ch) =>
        ch.title.toLowerCase().includes(q) ||
        ch.subtitle.toLowerCase().includes(q) ||
        ch.summary.toLowerCase().includes(q) ||
        ch.sections.some((s) => s.heading.toLowerCase().includes(q) || s.content.toLowerCase().includes(q))
    )
  }, [searchQuery])

  // Current active chapter
  const activeChapter = useMemo(() => {
    return HINDI_STUDY_MATERIAL.find((ch) => ch.id === selectedChapterId) || HINDI_STUDY_MATERIAL[0]
  }, [selectedChapterId])

  const handleAskGemini = (heading, content) => {
    const contextSnippet = `[MPPSC Hindi Study Material - Chapter ${activeChapter.chapterNumber}: ${activeChapter.title}]\n\nSection: ${heading}\nContent:\n${content}`
    const defaultPrompt = `Please explain ${heading} from Chapter ${activeChapter.chapterNumber} (${activeChapter.title}) with more examples and practice questions.`

    navigate(ROUTES.CHAT, {
      state: {
        materialContext: contextSnippet,
        promptText: defaultPrompt
      }
    })
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold mb-2">
            <Library className="w-3.5 h-3.5" />
            <span>MPPSC Samanya Hindi & Vyakaran (Drishti IAS)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans flex items-center gap-2.5">
            <span>Study Material & Grammar Reference</span>
            <FileText className="w-7 h-7 text-brand-600" />
          </h1>
          <p className="text-slate-500 dark:text-dark-400 text-xs md:text-sm mt-0.5">
            26 Complete textbook chapters covering Devanagari, Sandhi, Samas, Muhavare, Administrative Terms & Literature.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 dark:text-dark-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search material (e.g. Sandhi, Alankar, Samas)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-700 text-xs font-medium text-slate-900 dark:text-white focus-ring shadow-sm"
          />
        </div>
      </div>

      {/* MAIN TWO-COLUMN CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: CHAPTER DIRECTORY (4 COLS) */}
        <div className="lg:col-span-4 p-4 rounded-3xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-glass space-y-2 max-h-[75vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-dark-800">
            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Library className="w-4 h-4 text-brand-600" />
              <span>Chapters ({filteredChapters.length}/26)</span>
            </span>
            <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
              Drishti IAS DLP
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
            {filteredChapters.map((ch) => {
              const isSelected = ch.id === activeChapter.id
              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`w-full p-3 rounded-2xl text-left transition-all flex items-start gap-3 border ${
                    isSelected
                      ? 'bg-brand-600 text-white border-brand-600 shadow-md scale-[1.01]'
                      : 'bg-white/60 dark:bg-dark-800/60 hover:bg-slate-100 dark:hover:bg-dark-800 border-slate-200/60 dark:border-dark-700/60 text-slate-900 dark:text-slate-200'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-dark-700 text-brand-600 dark:text-brand-400'
                  }`}>
                    {ch.chapterNumber}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-xs truncate leading-tight">
                      {ch.title}
                    </h3>
                    <p className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-indigo-100' : 'text-slate-400 dark:text-dark-400'}`}>
                      {ch.subtitle} • pp. {ch.pageRange}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: CHAPTER READER & ASK GEMINI PANEL (8 COLS) */}
        <div className="lg:col-span-8 p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-glass space-y-6">
          
          {/* Active Chapter Header */}
          <div className="border-b border-slate-200/80 dark:border-dark-800 pb-5">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-extrabold text-xs">
                Chapter {activeChapter.chapterNumber} • Pages {activeChapter.pageRange}
              </span>

              <div className="flex items-center gap-2">
                <PronunciationButton
                  text={activeChapter.title}
                  speakerId={`ch_${activeChapter.id}`}
                  size="sm"
                  variant="ghost"
                />
                <button
                  onClick={() => handleAskGemini(`Overview of Chapter ${activeChapter.chapterNumber}`, activeChapter.summary)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-glass-glow flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Ask VaaniAI</span>
                </button>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white font-sans">
              {activeChapter.title}
            </h2>
            <p className="text-xs md:text-sm font-semibold text-brand-600 dark:text-brand-400 mt-1">
              {activeChapter.subtitle}
            </p>
            <p className="text-xs text-slate-600 dark:text-dark-300 mt-3 leading-relaxed bg-slate-50 dark:bg-dark-800/50 p-3.5 rounded-2xl border border-slate-200/60 dark:border-dark-700/60">
              <strong>Chapter Summary: </strong>{activeChapter.summary}
            </p>
          </div>

          {/* Chapter Content Sections */}
          <div className="space-y-6">
            {activeChapter.sections.map((section, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/80 dark:bg-dark-800/80 border border-slate-200/80 dark:border-dark-700/80 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    {section.heading}
                  </h3>

                  <div className="flex items-center gap-2">
                    <PronunciationButton
                      text={section.heading}
                      speakerId={`sec_head_${activeChapter.id}_${idx}`}
                      size="sm"
                      variant="ghost"
                    />
                    <button
                      onClick={() => handleAskGemini(section.heading, section.content)}
                      className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-dark-700 hover:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold text-xs transition-all flex items-center gap-1 border border-slate-200 dark:border-dark-600"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ask Gemini</span>
                    </button>
                  </div>
                </div>

                <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-line bg-slate-50/70 dark:bg-dark-900/50 p-4 rounded-xl border border-slate-100 dark:border-dark-800">
                  {section.content}
                </div>

                <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400 dark:text-dark-400">
                  <span>Highlighted MPPSC Material Context</span>
                  <button
                    onClick={() => handleAskGemini(`Practice & Exercises for ${section.heading}`, section.content)}
                    className="text-brand-600 dark:text-brand-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Generate Practice Questions in Chat</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  )
}
