import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Volume2, 
  Sparkles, 
  RotateCcw, 
  Mic, 
  Check, 
  HelpCircle, 
  Languages, 
  Zap,
  Info,
  Flame,
  Bot,
  User,
  Play,
  Square,
  Trash2,
  Download,
  Database,
  Key,
  X,
  AlertCircle
} from 'lucide-react'
import PronunciationButton from '../components/common/PronunciationButton.jsx'
import { useSpeechContext } from '../context/SpeechContext.jsx'
import { chatDatabase } from '../utils/chatDatabase.js'
import { generateGeminiResponse, getStoredGeminiKey, saveGeminiKey } from '../utils/geminiService.js'

export default function VaaniAIChat() {
  const { speak, stop, isPlaying } = useSpeechContext()

  // Load chat history from persistent database store
  const [messages, setMessages] = useState(() => chatDatabase.getLogs())

  const [inputText, setInputText] = useState('')
  const [scriptMode, setScriptMode] = useState('both') // 'both', 'devanagari', 'hinglish'
  const [isTyping, setIsTyping] = useState(false)
  const [logStats, setLogStats] = useState(() => chatDatabase.getLogStats())

  // Gemini API Key State & Modal
  const [apiKey, setApiKey] = useState(() => getStoredGeminiKey())
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [tempKeyInput, setTempKeyInput] = useState('')

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
    setLogStats(chatDatabase.getLogStats())
  }, [messages, isTyping])

  const presetTopics = [
    { label: 'Self Introduction (अपना परिचय)', text: 'नमस्ते वाणी, मैं अपना परिचय देना चाहता हूँ।' },
    { label: 'Ordering Chai & Snacks (चाय और नाश्ता)', text: 'एक कप गरमा गरम अदरक चाय और समोसा चाहिए।' },
    { label: 'Asking Directions (रास्ता पूछना)', text: 'रेलवे स्टेशन यहाँ से कितनी दूर है?' },
    { label: 'Bargaining at Market (दुकान पर मोल-भाव)', text: 'यह कुर्ता कितने का है? कुछ कम करो ना।' }
  ]

  const handleSend = async (textToSend) => {
    const text = textToSend || inputText
    if (!text.trim() || isTyping) return

    // If no key set, prompt user to set key
    if (!apiKey) {
      setShowKeyModal(true)
    }

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      textHindi: text,
      textHinglish: text,
      textEnglish: text,
      timestamp: new Date().toISOString()
    }

    // Save user message to React state and persistent database
    const updatedWithUser = chatDatabase.saveMessage(userMsg)
    setMessages(updatedWithUser)
    if (!textToSend) setInputText('')
    setIsTyping(true)

    try {
      // Call Gemini API service directly
      const geminiResult = await generateGeminiResponse(text, messages)

      const vaaniReply = {
        id: Date.now() + 1,
        sender: 'vaani',
        textHindi: geminiResult.textHindi,
        textHinglish: geminiResult.textHinglish,
        textEnglish: geminiResult.textEnglish,
        grammarTip: geminiResult.grammarTip,
        timestamp: new Date().toISOString()
      }

      // Save Gemini response to database and update state
      const updatedWithAI = chatDatabase.saveMessage(vaaniReply)
      setMessages(updatedWithAI)

      // Auto-pronounce Gemini's Hindi response
      if (geminiResult.textHindi) {
        speak(geminiResult.textHindi, `vaani_${vaaniReply.id}`)
      }

    } catch (error) {
      console.error('[VaaniAIChat] Error generating Gemini AI response:', error)
    } finally {
      setIsTyping(false)
    }
  }

  const handleSaveKey = () => {
    saveGeminiKey(tempKeyInput)
    setApiKey(getStoredGeminiKey())
    setShowKeyModal(false)
    setTempKeyInput('')
  }

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all chat logs?')) {
      const resetLogs = chatDatabase.clearLogs()
      setMessages(resetLogs)
    }
  }

  const handleExportLogs = () => {
    chatDatabase.exportLogsJSON()
  }

  const handleReplayLast = () => {
    const lastVaani = [...messages].reverse().find(m => m.sender === 'vaani')
    if (lastVaani && lastVaani.textHindi) {
      speak(lastVaani.textHindi, `vaani_${lastVaani.id}`)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-112px)] max-w-[1200px] mx-auto animate-fade-in">
      
      {/* CHAT HEADER & GEMINI API KEY STATUS */}
      <div className="p-3.5 rounded-2xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-glass dark:shadow-glass-dark mb-3 flex flex-col md:flex-row md:items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-brand-600 flex items-center justify-center text-white shadow-glass-glow">
              <Bot className="w-5 h-5" />
            </div>
            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-dark-900 ${apiKey ? 'bg-emerald-500' : 'bg-amber-500 animate-ping'}`} />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 dark:text-white text-sm md:text-base flex items-center gap-2">
              <span>VaaniAI Tutor</span>
              <button
                onClick={() => setShowKeyModal(true)}
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border transition-all flex items-center gap-1 ${
                  apiKey
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20 animate-pulse'
                }`}
              >
                <Key className="w-3 h-3" />
                <span>{apiKey ? 'Gemini AI Connected' : 'Set Gemini API Key'}</span>
              </button>
            </h2>
            <p className="text-xs text-slate-500 dark:text-dark-400 flex items-center gap-2">
              <span>Live Gemini 1.5 Flash AI Engine</span>
              <span className="text-amber-500 font-semibold flex items-center gap-1">
                <Database className="w-3 h-3" />
                {logStats.totalMessages} Logs Saved
              </span>
            </p>
          </div>
        </div>

        {/* Database & Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Replay Last Button */}
          <button
            onClick={handleReplayLast}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-700 text-xs font-semibold flex items-center gap-1"
            title="Replay Last AI Response"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Replay</span>
          </button>

          {/* Export JSON Logs */}
          <button
            onClick={handleExportLogs}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-700 text-xs font-semibold flex items-center gap-1"
            title="Export Chat Database Logs (JSON)"
          >
            <Download className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Clear Logs */}
          <button
            onClick={handleClearLogs}
            className="p-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 text-xs font-semibold flex items-center gap-1"
            title="Clear Chat Logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          {/* Script Mode Selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-xs font-semibold ml-1">
            <button
              onClick={() => setScriptMode('both')}
              className={`px-2.5 py-1 rounded-lg transition-all ${scriptMode === 'both' ? 'bg-white dark:bg-dark-700 text-brand-600 dark:text-white shadow-sm font-bold' : 'text-slate-500'}`}
            >
              Both
            </button>
            <button
              onClick={() => setScriptMode('devanagari')}
              className={`px-2.5 py-1 rounded-lg transition-all ${scriptMode === 'devanagari' ? 'bg-white dark:bg-dark-700 text-brand-600 dark:text-white shadow-sm font-bold' : 'text-slate-500'}`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setScriptMode('hinglish')}
              className={`px-2.5 py-1 rounded-lg transition-all ${scriptMode === 'hinglish' ? 'bg-white dark:bg-dark-700 text-brand-600 dark:text-white shadow-sm font-bold' : 'text-slate-500'}`}
            >
              Hinglish
            </button>
          </div>
        </div>
      </div>

      {/* API KEY WARNING BANNER IF NO KEY */}
      {!apiKey && (
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-medium mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Connect your Google Gemini API Key for live AI responses tailored directly to your chat inputs.</span>
          </div>
          <button
            onClick={() => setShowKeyModal(true)}
            className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shrink-0 shadow-sm"
          >
            Enter Key
          </button>
        </div>
      )}

      {/* MESSAGES VIEWPORT */}
      <div className="flex-1 overflow-y-auto p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-inner space-y-3 mb-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
          >
            <div
              className={`p-3.5 rounded-2xl shadow-sm text-xs md:text-sm space-y-1.5 ${
                msg.sender === 'user'
                  ? 'bg-brand-600 text-white rounded-br-none'
                  : 'bg-white dark:bg-dark-800 text-slate-900 dark:text-white border border-slate-200/80 dark:border-dark-700/80 rounded-bl-none'
              }`}
            >
              {/* Devanagari text */}
              {(scriptMode === 'both' || scriptMode === 'devanagari') && (
                <div className="font-extrabold text-sm md:text-base leading-relaxed flex items-center justify-between gap-3">
                  <span>{msg.textHindi}</span>
                  {msg.textHindi && (
                    <PronunciationButton
                      text={msg.textHindi}
                      speakerId={`msg_${msg.id}`}
                      size="sm"
                      variant={msg.sender === 'user' ? 'solid' : 'ghost'}
                    />
                  )}
                </div>
              )}

              {/* Hinglish Roman text */}
              {(scriptMode === 'both' || scriptMode === 'hinglish') && msg.textHinglish && (
                <div className={`text-xs ${msg.sender === 'user' ? 'text-indigo-100' : 'text-slate-500 dark:text-dark-400'} italic font-medium`}>
                  {msg.textHinglish}
                </div>
              )}

              {/* English Translation */}
              {msg.textEnglish && (
                <div className={`text-[11px] pt-1 border-t ${msg.sender === 'user' ? 'border-indigo-400/30 text-indigo-100' : 'border-slate-200/60 dark:border-dark-700/60 text-slate-400 dark:text-dark-400'}`}>
                  "{msg.textEnglish}"
                </div>
              )}
            </div>

            {/* Grammar Tip Box */}
            {msg.grammarTip && (
              <div className="mt-1.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs flex items-start justify-between gap-2 max-w-md">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">VaaniAI Tip: </span>
                    <span>{msg.grammarTip}</span>
                  </div>
                </div>
                <PronunciationButton
                  text={msg.grammarTip}
                  speakerId={`tip_${msg.id}`}
                  size="sm"
                  variant="ghost"
                  lang="en-IN"
                />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 w-fit text-slate-500 dark:text-dark-400 text-xs font-semibold animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            <span>Gemini AI is generating custom response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* PRESET CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-shrink-0 scrollbar-none">
        {presetTopics.map((topic, i) => (
          <div key={i} className="flex items-center shrink-0">
            <button
              onClick={() => handleSend(topic.text)}
              disabled={isTyping}
              className="px-3 py-1.5 rounded-l-xl bg-white/80 dark:bg-dark-800/80 hover:bg-brand-500/10 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 border border-slate-200 dark:border-dark-700 text-xs font-semibold transition-all shadow-sm disabled:opacity-50"
            >
              {topic.label}
            </button>
            <PronunciationButton
              text={topic.text}
              speakerId={`chip_${i}`}
              size="sm"
              variant="outline"
              className="rounded-l-none border-l-0"
            />
          </div>
        ))}
      </div>

      {/* INPUT BAR */}
      <div className="flex items-center gap-2 mt-2 flex-shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask anything in Hindi or English (e.g. Translate 'I love tea' to Hindi / नमस्ते)..."
          disabled={isTyping}
          className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-700 focus-ring text-xs md:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-dark-500 shadow-sm disabled:opacity-50"
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim() || isTyping}
          className="px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs md:text-sm transition-all shadow-glass-glow flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* GEMINI API KEY INPUT MODAL */}
      <AnimatePresence>
        {showKeyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-800 pb-3">
                <div className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-amber-500" />
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    Google Gemini API Key
                  </h3>
                </div>
                <button onClick={() => setShowKeyModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-dark-300 leading-relaxed">
                To enable live AI responses tailored directly to your chat inputs, enter your free <strong>Google Gemini API Key</strong> from{' '}
                <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-brand-600 font-bold underline">
                  Google AI Studio
                </a>.
              </p>

              <input
                type="password"
                value={tempKeyInput}
                onChange={(e) => setTempKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-xs font-mono text-slate-900 dark:text-white focus-ring"
              />

              <div className="flex items-center justify-between pt-2">
                {apiKey && (
                  <button
                    onClick={() => { saveGeminiKey(''); setApiKey(''); setShowKeyModal(false); }}
                    className="text-xs font-bold text-rose-500 hover:underline"
                  >
                    Remove Saved Key
                  </button>
                )}

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => setShowKeyModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-dark-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveKey}
                    disabled={!tempKeyInput.trim()}
                    className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs shadow-glass-glow"
                  >
                    Save & Activate AI
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
