import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  MessageSquare, 
  Layers, 
  BookMarked, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  Play, 
  Square, 
  RotateCcw, 
  HelpCircle, 
  Trophy, 
  Zap, 
  Clock, 
  Filter, 
  Search, 
  Bookmark, 
  ChevronDown, 
  ArrowRight, 
  X, 
  Check,
  Award
} from 'lucide-react'
import { CURRICULUM_SECTIONS, HINDI_LESSONS } from '../data/hindiCurriculumData.js'
import PronunciationButton from '../components/common/PronunciationButton.jsx'
import { useSpeech } from '../hooks/useSpeech.js'

// Section Icon Resolver
const SECTION_ICONS = {
  BookOpen: BookOpen,
  MessageSquare: MessageSquare,
  Layers: Layers,
  BookMarked: BookMarked,
  Sparkles: Sparkles
}

export default function LearnModules() {
  const { speechRate, setRate, speak, stop } = useSpeech()

  const [activeTab, setActiveTab] = useState('lessons') // 'lessons', 'flashcards'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false)
  const [openSections, setOpenSections] = useState({
    script: true,
    greetings: true,
    numbers: false,
    vocabulary: false,
    grammar: false
  })

  // Active Lesson Player Modal State
  const [activeLesson, setActiveLesson] = useState(null)
  const [currentStep, setCurrentStep] = useState(0) // 0 to items.length - 1 is item cards, items.length is quiz
  const [selectedQuizOption, setSelectedQuizOption] = useState(null)
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showAiExplanation, setShowAiExplanation] = useState(false)
  const [lessonFinished, setLessonFinished] = useState(false)
  const [bookmarks, setBookmarks] = useState({})
  const [completedLessons, setCompletedLessons] = useState({ vowels_1: true, greetings_basic: true, numbers_1_10: true, grammar_sov: true })

  // Flashcards state
  const [flippedCard, setFlippedCard] = useState(false)
  const [flashcardIndex, setFlashcardIndex] = useState(0)

  // Filter lessons dynamically
  const filteredLessons = useMemo(() => {
    return HINDI_LESSONS.filter((lesson) => {
      const matchesSearch = 
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.hindiTitle.includes(searchQuery) ||
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDifficulty = selectedDifficulty === 'All' || lesson.difficulty === selectedDifficulty
      const matchesBookmark = !bookmarkedOnly || bookmarks[lesson.id]
      return matchesSearch && matchesDifficulty && matchesBookmark
    })
  }, [searchQuery, selectedDifficulty, bookmarkedOnly, bookmarks])

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }))
  }

  const toggleBookmark = (e, lessonId) => {
    e.stopPropagation()
    setBookmarks((prev) => ({ ...prev, [lessonId]: !prev[lessonId] }))
  }

  const startLesson = (lesson) => {
    setActiveLesson(lesson)
    setCurrentStep(0)
    setSelectedQuizOption(null)
    setQuizSubmitted(false)
    setShowAiExplanation(false)
    setLessonFinished(false)
  }

  const handleNextStep = () => {
    if (!activeLesson) return
    if (currentStep < activeLesson.items.length) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)

      // Auto read aloud next item
      if (nextStep < activeLesson.items.length) {
        speak(activeLesson.items[nextStep].devanagari, `modal_item_${nextStep}`)
      } else {
        // Read quiz question aloud
        speak(activeLesson.quiz.question, 'quiz_question')
      }
    } else {
      // Finished lesson
      setLessonFinished(true)
      setCompletedLessons((prev) => ({ ...prev, [activeLesson.id]: true }))
    }
  }

  const handleQuizSubmit = (optIdx) => {
    if (quizSubmitted) return
    setSelectedQuizOption(optIdx)
    setQuizSubmitted(true)
    const selectedText = activeLesson.quiz.options[optIdx]
    speak(selectedText, `quiz_opt_${optIdx}`)
  }

  const allFlashcardItems = useMemo(() => {
    return HINDI_LESSONS.flatMap(l => l.items)
  }, [])

  return (
    <div className="flex flex-col gap-5 max-w-[1200px] mx-auto animate-fade-in">
      
      {/* PAGE HEADER - COMPACT SPACED FOR IMMEDIATE FIRST LESSON VISIBILITY */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans flex items-center gap-2">
            <span>Learn & Practice Hindi</span>
            <BookOpen className="w-6 h-6 text-amber-500" />
          </h1>
          <p className="text-slate-500 dark:text-dark-400 text-xs md:text-sm mt-0.5">
            Structured learning path: Devanagari script, greetings, counting, vocabulary decks & grammar.
          </p>
        </div>

        {/* TAB SWITCH */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 w-fit">
          <button
            onClick={() => { setActiveTab('lessons'); setActiveLesson(null); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'lessons' ? 'bg-white dark:bg-dark-700 text-brand-600 dark:text-white shadow-sm' : 'text-slate-500 dark:text-dark-400'}`}
          >
            Structured Curriculum
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'flashcards' ? 'bg-white dark:bg-dark-700 text-brand-600 dark:text-white shadow-sm' : 'text-slate-500 dark:text-dark-400'}`}
          >
            Flashcard Deck
          </button>
        </div>
      </div>

      {/* LESSONS CURRICULUM VIEW */}
      {activeTab === 'lessons' && (
        <div className="flex flex-col gap-5">
          
          {/* SEARCH & DIFFICULTY FILTER TOOLBAR */}
          <div className="p-3.5 rounded-2xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-glass flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 dark:text-dark-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lessons (e.g. Vowels, Food, Tenses)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-700 text-xs font-medium text-slate-900 dark:text-white focus-ring"
              />
            </div>

            {/* Difficulty Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
              <span className="text-xs font-bold text-slate-500 dark:text-dark-400 flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5" />
                <span>Difficulty:</span>
              </span>
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    selectedDifficulty === diff
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-dark-400 hover:bg-slate-200 dark:hover:bg-dark-700'
                  }`}
                >
                  {diff}
                </button>
              ))}

              <button
                onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
                  bookmarkedOnly
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-dark-400 hover:bg-slate-200'
                }`}
              >
                <Bookmark className="w-3 h-3 fill-current" />
                <span>Saved</span>
              </button>
            </div>
          </div>

          {/* CURRICULUM SECTIONS ACCORDION LIST */}
          <div className="space-y-4">
            {CURRICULUM_SECTIONS.map((section) => {
              const sectionLessons = filteredLessons.filter((l) => l.sectionId === section.id)
              const isOpen = openSections[section.id]
              const SectionIcon = SECTION_ICONS[section.iconName] || BookOpen

              if (filteredLessons.length > 0 && sectionLessons.length === 0) return null

              return (
                <div
                  key={section.id}
                  className="rounded-2xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-glass overflow-hidden"
                >
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-4 md:p-5 flex items-center justify-between text-left hover:bg-slate-100/50 dark:hover:bg-dark-800/50 transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shadow-glass-glow flex-shrink-0">
                        <SectionIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base md:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{section.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold">
                            {sectionLessons.length} Modules
                          </span>
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-dark-400 mt-0.5">
                          {section.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </button>

                  {/* Section Lessons Cards Grid (Responsive 3-col Desktop, 2-col Tablet, 1-col Mobile) */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 md:p-5 pt-0 border-t border-slate-200/60 dark:border-dark-800/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                      >
                        {sectionLessons.map((lesson) => {
                          const isDone = completedLessons[lesson.id] || lesson.isCompleted
                          const isBookmarked = bookmarks[lesson.id] || lesson.isBookmarked

                          return (
                            <div
                              key={lesson.id}
                              className="group p-4 rounded-xl bg-white/80 dark:bg-dark-800/80 border border-slate-200/80 dark:border-dark-700/80 shadow-sm hover:shadow-md hover:border-brand-500/50 transition-all flex flex-col justify-between"
                            >
                              <div>
                                {/* Header Row */}
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                        lesson.difficulty === 'Beginner'
                                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                          : lesson.difficulty === 'Intermediate'
                                          ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20'
                                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                                      }`}
                                    >
                                      {lesson.difficulty}
                                    </span>
                                    <span className="text-[11px] font-semibold text-slate-500 dark:text-dark-400 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {lesson.estTime}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1">
                                    <PronunciationButton
                                      text={`${lesson.title}. ${lesson.hindiTitle}`}
                                      speakerId={`card_${lesson.id}`}
                                      size="sm"
                                      variant="ghost"
                                    />
                                    <button
                                      onClick={(e) => toggleBookmark(e, lesson.id)}
                                      className={`p-1.5 rounded-lg transition-all ${
                                        isBookmarked
                                          ? 'text-amber-500 bg-amber-500/10'
                                          : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-dark-700'
                                      }`}
                                      title="Bookmark Lesson"
                                    >
                                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                                    </button>
                                  </div>
                                </div>

                                {/* Title & Hindi Title */}
                                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                  {lesson.title}
                                </h3>
                                <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                                  {lesson.hindiTitle}
                                </p>

                                <p className="text-xs text-slate-500 dark:text-dark-400 mt-1.5 line-clamp-2 leading-relaxed">
                                  {lesson.description}
                                </p>
                              </div>

                              {/* Footer Details & Action Button */}
                              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-dark-700/60 flex items-center justify-between">
                                <div className="flex items-center gap-2.5 text-xs font-bold">
                                  <span className="flex items-center gap-1 text-amber-500">
                                    <Zap className="w-3.5 h-3.5 fill-current" />
                                    +{lesson.xpReward} XP
                                  </span>
                                  <span className="text-slate-400 dark:text-dark-500">
                                    {lesson.itemCount} Items
                                  </span>
                                </div>

                                <button
                                  onClick={() => startLesson(lesson)}
                                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-glass-glow flex items-center gap-1.5 ${
                                    isDone
                                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                      : 'bg-brand-600 hover:bg-brand-500 text-white'
                                  }`}
                                >
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                  <span>{isDone ? 'Review' : 'Start'}</span>
                                </button>
                              </div>

                            </div>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

        </div>
      )}

      {/* VIEWPORT OPTIMIZED LESSON PLAYER MODAL (max-h-[85vh], fits 1 screen comfortably) */}
      <AnimatePresence>
        {activeLesson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Modal Header & Speed Controls */}
              <div className="p-4 md:p-5 border-b border-slate-200 dark:border-dark-800 flex items-center justify-between bg-slate-50/50 dark:bg-dark-950/50 flex-shrink-0">
                <div>
                  <span className="text-[10px] font-extrabold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                    {activeLesson.difficulty} • {activeLesson.estTime}
                  </span>
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{activeLesson.title}</span>
                    <PronunciationButton text={activeLesson.title} speakerId="modal_title" size="sm" />
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {/* Speed Selector */}
                  <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-[10px] font-semibold">
                    {[
                      { r: 0.7, label: '0.7x' },
                      { r: 0.85, label: '0.85x' },
                      { r: 1.0, label: '1.0x' }
                    ].map((s) => (
                      <button
                        key={s.r}
                        onClick={() => setRate(s.r)}
                        className={`px-2 py-0.5 rounded-lg transition-all ${speechRate === s.r ? 'bg-white dark:bg-dark-700 text-brand-600 dark:text-white shadow-sm font-bold' : 'text-slate-500'}`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveLesson(null)}
                    className="p-1.5 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="w-full h-1.5 bg-slate-100 dark:bg-dark-800 flex-shrink-0">
                <div
                  className="h-full bg-gradient-to-r from-brand-600 to-amber-500 transition-all duration-300"
                  style={{
                    width: `${((currentStep + 1) / (activeLesson.items.length + 1)) * 100}%`
                  }}
                />
              </div>

              {/* Modal Body (Scrolls internally if viewport is small) */}
              <div className="p-5 overflow-y-auto flex-1 space-y-4">
                
                {/* LESSON FINISHED CELEBRATION VIEW */}
                {lessonFinished ? (
                  <div className="flex flex-col items-center justify-center text-center p-6 space-y-3 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center shadow-lg">
                      <Trophy className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      Lesson Complete!
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-dark-400">
                      Great job! You completed <strong>{activeLesson.title}</strong> and earned:
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-extrabold text-base">
                      <Zap className="w-4 h-4 fill-current" />
                      <span>+{activeLesson.xpReward} XP Earned</span>
                    </div>

                    <button
                      onClick={() => setActiveLesson(null)}
                      className="mt-4 px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glass-glow"
                    >
                      Return to Curriculum
                    </button>
                  </div>
                ) : currentStep < activeLesson.items.length ? (
                  /* ITEM CARD STEP (Compact viewport sizing) */
                  <div className="flex flex-col items-center text-center space-y-4 animate-fade-in">
                    <div className="w-full p-6 rounded-2xl bg-gradient-to-br from-brand-500/10 via-amber-500/5 to-indigo-500/10 border border-brand-500/20 flex flex-col items-center justify-center gap-3 relative">
                      
                      <span className="text-4xl font-black font-sans text-slate-900 dark:text-white">
                        {activeLesson.items[currentStep].devanagari}
                      </span>

                      <div className="space-y-0.5">
                        <span className="text-sm font-bold text-brand-600 dark:text-brand-400 block">
                          [{activeLesson.items[currentStep].roman}]
                        </span>
                        <span className="text-xs font-medium text-slate-600 dark:text-dark-300 block">
                          {activeLesson.items[currentStep].english}
                        </span>
                      </div>

                      <PronunciationButton
                        text={activeLesson.items[currentStep].devanagari}
                        speakerId={`item_${currentStep}`}
                        size="md"
                        variant="solid"
                        label="Listen Pronunciation"
                        showLabel={true}
                      />
                    </div>

                    {/* Example Usage Card */}
                    <div className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-left text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-700 dark:text-slate-300">
                          Example Usage:
                        </span>
                        <PronunciationButton
                          text={activeLesson.items[currentStep].example}
                          speakerId={`ex_${currentStep}`}
                          size="sm"
                          variant="ghost"
                        />
                      </div>
                      <p className="text-slate-900 dark:text-white font-medium text-xs">
                        {activeLesson.items[currentStep].example}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* INTERACTIVE QUIZ STEP */
                  <div className="flex flex-col space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                        <span>Knowledge Check Quiz</span>
                        <PronunciationButton
                          text={activeLesson.quiz.question}
                          speakerId="quiz_q_spk"
                          size="sm"
                          variant="ghost"
                        />
                      </span>
                      <button
                        onClick={() => setShowAiExplanation(!showAiExplanation)}
                        className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span>AI Explain</span>
                      </button>
                    </div>

                    {showAiExplanation && activeLesson.aiExplanation && (
                      <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                        <div className="flex items-center justify-between font-bold">
                          <span>💡 VaaniAI Linguistic Breakdown:</span>
                          <PronunciationButton text={activeLesson.aiExplanation} speakerId="ai_exp_spk" size="sm" lang="en-IN" />
                        </div>
                        <p>{activeLesson.aiExplanation}</p>
                      </div>
                    )}

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {activeLesson.quiz.question}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeLesson.quiz.options.map((opt, idx) => {
                        const isSelected = selectedQuizOption === idx
                        const isCorrect = idx === activeLesson.quiz.answerIndex

                        let btnStyle = "bg-slate-50 dark:bg-dark-800 border-slate-200 dark:border-dark-700 text-slate-800 dark:text-slate-200"
                        if (quizSubmitted) {
                          if (isCorrect) btnStyle = "bg-emerald-500 text-white border-emerald-500"
                          else if (isSelected) btnStyle = "bg-rose-500 text-white border-rose-500"
                        }

                        return (
                          <div key={idx} className="flex items-center">
                            <button
                              onClick={() => handleQuizSubmit(idx)}
                              className={`flex-1 p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && isCorrect && <Check className="w-4 h-4" />}
                            </button>
                            <PronunciationButton text={opt} speakerId={`opt_spk_${idx}`} size="sm" variant="ghost" className="ml-1" />
                          </div>
                        )
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 font-medium flex items-start justify-between gap-2">
                        <div>
                          <strong>Explanation: </strong>
                          {activeLesson.quiz.explanation}
                        </div>
                        <PronunciationButton text={activeLesson.quiz.explanation} speakerId="quiz_exp_spk" size="sm" />
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Modal Footer Controls */}
              {!lessonFinished && (
                <div className="p-4 md:p-5 border-t border-slate-200 dark:border-dark-800 flex items-center justify-between bg-slate-50/50 dark:bg-dark-950/50 flex-shrink-0">
                  <span className="text-xs font-semibold text-slate-400">
                    Step {currentStep + 1} of {activeLesson.items.length + 1}
                  </span>

                  <button
                    onClick={handleNextStep}
                    disabled={currentStep === activeLesson.items.length && !quizSubmitted}
                    className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs shadow-glass-glow flex items-center gap-2"
                  >
                    <span>{currentStep === activeLesson.items.length ? 'Finish Lesson' : 'Next Step'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FLASHCARDS DECK VIEW */}
      {activeTab === 'flashcards' && (
        <div className="flex flex-col items-center justify-center p-6 rounded-3xl glass-panel border border-slate-200 dark:border-dark-700 shadow-glass">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">
            Click to Flip Flashcard ({flashcardIndex + 1} of {allFlashcardItems.length})
          </span>

          <div
            onClick={() => setFlippedCard(!flippedCard)}
            className="w-full max-w-md h-56 rounded-3xl bg-gradient-to-br from-brand-600 via-indigo-600 to-amber-600 text-white p-6 flex flex-col items-center justify-center text-center cursor-pointer shadow-xl transition-all duration-500 transform hover:scale-[1.02]"
          >
            {!flippedCard ? (
              <div className="space-y-2">
                <span className="text-4xl font-black font-sans block">
                  {allFlashcardItems[flashcardIndex]?.devanagari || 'नमस्ते'}
                </span>
                <span className="text-xs text-indigo-200 font-semibold block">Devanagari Front</span>
                <span className="text-xs text-amber-300 mt-2 block">Tap card to see meaning & English</span>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-2xl font-extrabold block">
                  [{allFlashcardItems[flashcardIndex]?.roman}]
                </span>
                <span className="text-base font-medium text-indigo-100 block">
                  {allFlashcardItems[flashcardIndex]?.english}
                </span>
                <span className="text-xs text-amber-300 mt-2 block">
                  Example: {allFlashcardItems[flashcardIndex]?.example}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => {
                setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : allFlashcardItems.length - 1))
                setFlippedCard(false)
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200"
            >
              Previous Card
            </button>

            <PronunciationButton
              text={allFlashcardItems[flashcardIndex]?.devanagari || 'नमस्ते'}
              speakerId={`fc_${flashcardIndex}`}
              size="md"
              variant="solid"
              label="Listen Pronunciation"
              showLabel={true}
            />

            <button
              onClick={() => {
                setFlashcardIndex((prev) => (prev < allFlashcardItems.length - 1 ? prev + 1 : 0))
                setFlippedCard(false)
              }}
              className="px-4 py-2 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-glass-glow hover:bg-brand-500"
            >
              Next Card
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
