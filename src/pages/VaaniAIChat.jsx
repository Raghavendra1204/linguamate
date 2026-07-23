import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Volume2, 
  Sparkles, 
  RotateCcw, 
  Check, 
  HelpCircle, 
  Languages, 
  Bot, 
  User, 
  Trash2, 
  Download, 
  Database, 
  MessageSquare
} from 'lucide-react'
import PronunciationButton from '../components/common/PronunciationButton.jsx'
import { useSpeechContext } from '../context/SpeechContext.jsx'
import { chatDatabase } from '../utils/chatDatabase.js'
import { generateGeminiResponse } from '../utils/geminiService.js'

export default function VaaniAIChat() {
  const { speak } = useSpeechContext()

  // Load chat history from persistent database store
  const [messages, setMessages] = useState(() => chatDatabase.getLogs())

  const [inputText, setInputText] = useState('')
  const [scriptMode, setScriptMode] = useState('both') // 'both', 'devanagari', 'english'
  const [isTyping, setIsTyping] = useState(false)
  const [logStats, setLogStats] = useState(() => chatDatabase.getLogStats())

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

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      textHindi: text,
      textHinglish: text,
      textEnglish: text,
      timestamp: new Date().toISOString()
    }

    const updatedWithUser = chatDatabase.saveMessage(userMsg)
    setMessages(updatedWithUser)
    if (!textToSend) setInputText('')
    setIsTyping(true)

    try {
      // Call central Gemini API service directly
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

      const updatedWithAI = chatDatabase.saveMessage(vaaniReply)
      setMessages(updatedWithAI)

      // Auto-pronounce VaaniAI response
      if (geminiResult.textHindi) {
        speak(geminiResult.textHindi, `vaani_${vaaniReply.id}`)
      }

    } catch (error) {
      console.error('[VaaniAIChat] Error generating AI response:', error)
    } finally {
      setIsTyping(false)
    }
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
      
      {/* CHAT HEADER */}
      <div className="p-3.5 rounded-2xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-glass dark:shadow-glass-dark mb-3 flex flex-col md:flex-row md:items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-brand-600 flex items-center justify-center text-white shadow-glass-glow">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-dark-900" title="VaaniAI Active" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 dark:text-white text-sm md:text-base flex items-center gap-2">
              <span>VaaniAI Tutor</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
                Live AI Online
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-dark-400 flex items-center gap-2">
              <span>Bilingual Hindi & English Conversational Tutor</span>
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

          {/* View Mode Selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-xs font-semibold ml-1">
            <button
              onClick={() => setScriptMode('both')}
              className={`px-2.5 py-1 rounded-lg transition-all ${scriptMode === 'both' ? 'bg-white dark:bg-dark-700 text-brand-600 dark:text-white shadow-sm font-bold' : 'text-slate-500'}`}
            >
              Hindi + English
            </button>
            <button
              onClick={() => setScriptMode('devanagari')}
              className={`px-2.5 py-1 rounded-lg transition-all ${scriptMode === 'devanagari' ? 'bg-white dark:bg-dark-700 text-brand-600 dark:text-white shadow-sm font-bold' : 'text-slate-500'}`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setScriptMode('english')}
              className={`px-2.5 py-1 rounded-lg transition-all ${scriptMode === 'english' ? 'bg-white dark:bg-dark-700 text-brand-600 dark:text-white shadow-sm font-bold' : 'text-slate-500'}`}
            >
              English Only
            </button>
          </div>
        </div>
      </div>

      {/* MESSAGES VIEWPORT */}
      <div className="flex-1 overflow-y-auto p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-inner space-y-3 mb-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
          >
            <div
              className={`p-4 rounded-2xl shadow-sm text-xs md:text-sm space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-brand-600 text-white rounded-br-none'
                  : 'bg-white dark:bg-dark-800 text-slate-900 dark:text-white border border-slate-200/80 dark:border-dark-700/80 rounded-bl-none'
              }`}
            >
              {/* Devanagari Hindi Text */}
              {(scriptMode === 'both' || scriptMode === 'devanagari') && msg.textHindi && (
                <div className="font-extrabold text-sm md:text-base leading-relaxed flex items-start justify-between gap-3">
                  <span>{msg.textHindi}</span>
                  <PronunciationButton
                    text={msg.textHindi}
                    speakerId={`msg_${msg.id}`}
                    size="sm"
                    variant={msg.sender === 'user' ? 'solid' : 'ghost'}
                  />
                </div>
              )}

              {/* Clear English Answer / Translation */}
              {(scriptMode === 'both' || scriptMode === 'english') && msg.textEnglish && (
                <div className={`text-xs md:text-sm font-medium ${msg.sender === 'user' ? 'text-indigo-100' : 'text-slate-700 dark:text-slate-200'} pt-1 border-t ${msg.sender === 'user' ? 'border-indigo-400/30' : 'border-slate-100 dark:border-dark-700/60'}`}>
                  {msg.textEnglish}
                </div>
              )}

              {/* Hinglish Roman Text (if in Both mode) */}
              {scriptMode === 'both' && msg.textHinglish && msg.textHinglish !== msg.textHindi && (
                <div className={`text-[11px] ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400 dark:text-dark-400'} italic`}>
                  [{msg.textHinglish}]
                </div>
              )}
            </div>

            {/* Grammar / Linguistic Tip Box */}
            {msg.grammarTip && !msg.grammarTip.includes('Custom response for') && (
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
            <span>VaaniAI is generating custom Hindi & English response...</span>
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
          placeholder="Ask anything in Hindi or English (e.g. How are you doing? / Translate chai)..."
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

    </div>
  )
}
