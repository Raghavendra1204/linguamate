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
  Square
} from 'lucide-react'
import PronunciationButton from '../components/common/PronunciationButton.jsx'
import { useSpeechContext } from '../context/SpeechContext.jsx'

export default function VaaniAIChat() {
  const { speak, stop, isPlaying } = useSpeechContext()

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'vaani',
      textHindi: 'नमस्ते! मैं वाणी हूँ, आपकी AI हिन्दी ट्यूटर। आज आप किस विषय में बात करना चाहते हैं?',
      textHinglish: 'Namaste! Main Vaani hoon, aapki AI Hindi tutor. Aaj aap kis vishay mein baat karna chahte hain?',
      textEnglish: 'Hello! I am Vaani, your AI Hindi tutor. What topic would you like to talk about today?',
      grammarTip: 'Notice the polite pronoun "आप" (Aap) used for respectful conversation.'
    }
  ])

  const [inputText, setInputText] = useState('')
  const [scriptMode, setScriptMode] = useState('both') // 'both', 'devanagari', 'hinglish'
  const [isTyping, setIsTyping] = useState(false)

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const presetTopics = [
    { label: 'Self Introduction (अपना परिचय)', text: 'नमस्ते वाणी, मैं अपना परिचय देना चाहता हूँ।' },
    { label: 'Ordering Chai & Snacks (चाय और नाश्ता)', text: 'एक कप गरमा गरम अदरक चाय और समोसा चाहिए।' },
    { label: 'Asking Directions (रास्ता पूछना)', text: 'रेलवे स्टेशन यहाँ से कितनी दूर है?' },
    { label: 'Bargaining at Market (दुकान पर मोल-भाव)', text: 'यह कुर्ता कितने का है? कुछ कम करो ना।' }
  ]

  const handleSend = (textToSend) => {
    const text = textToSend || inputText
    if (!text.trim()) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      textHindi: text,
      textHinglish: text,
      textEnglish: text
    }

    setMessages(prev => [...prev, userMsg])
    if (!textToSend) setInputText('')
    setIsTyping(true)

    // Simulate VaaniAI response
    setTimeout(() => {
      let vaaniReply = {
        id: Date.now() + 1,
        sender: 'vaani',
        textHindi: 'बहुत बढ़िया! आपका हिन्दी वाक्य बहुत प्राकृतिक लगा। क्या आप इसे आगे बढ़ाना चाहेंगे?',
        textHinglish: 'Bahut badhiya! Aapka Hindi vaakya bahut prakritik laga. Kya aap ise aage badhana chahenge?',
        textEnglish: 'Great job! Your Hindi sentence sounded very natural. Would you like to continue?',
        grammarTip: 'Phrase breakdown: "बहुत बढ़िया" (Bahut badhiya) = Well done / Excellent!'
      }

      if (text.includes('चाय') || text.includes('Chai')) {
        vaaniReply = {
          id: Date.now() + 1,
          sender: 'vaani',
          textHindi: 'अरे वाह! चाय का विचार बहुत अच्छा है। क्या आप चीनी कम लेंगे या ज़्यादा?',
          textHinglish: 'Are wah! Chai ka vichaar bahut achha hai. Kya aap cheeni kam lenge ya zyada?',
          textEnglish: 'Oh wow! Idea of tea is great. Would you take less sugar or more?',
          grammarTip: 'Rule: "कम" (Kam) means less, "ज़्यादा" (Zyada) means more.'
        }
      } else if (text.includes('परिचय') || text.includes('introduction')) {
        vaaniReply = {
          id: Date.now() + 1,
          sender: 'vaani',
          textHindi: 'ज़रूर! आप कह सकते हैं: "मेरा नाम [Name] है और मैं हिन्दी सीख रहा हूँ।"',
          textHinglish: 'Zaroor! Aap kah sakte hain: "Mera naam [Name] hai aur main Hindi seekh raha hoon."',
          textEnglish: 'Sure! You can say: "My name is [Name] and I am learning Hindi."',
          grammarTip: 'Male vs Female: Male says "सीख रहा हूँ" (seekh raha hoon), Female says "सीख रही हूँ" (seekh rahi hoon).'
        }
      }

      setMessages(prev => [...prev, vaaniReply])
      setIsTyping(false)

      // Auto-pronounce VaaniAI reply
      speak(vaaniReply.textHindi, `vaani_${vaaniReply.id}`)
    }, 1200)
  }

  const handleReplayLast = () => {
    const lastVaani = [...messages].reverse().find(m => m.sender === 'vaani')
    if (lastVaani) {
      speak(lastVaani.textHindi, `vaani_${lastVaani.id}`)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-112px)] max-w-[1200px] mx-auto animate-fade-in">
      
      {/* CHAT HEADER */}
      <div className="p-3.5 rounded-2xl glass-panel border border-slate-200/80 dark:border-dark-700/80 shadow-glass dark:shadow-glass-dark mb-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-brand-600 flex items-center justify-center text-white shadow-glass-glow">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-dark-900" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 dark:text-white text-sm md:text-base flex items-center gap-2">
              <span>VaaniAI Tutor</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold">
                Adaptive Speech AI
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-dark-400">
              Instant feedback & automatic TTS pronunciation
            </p>
          </div>
        </div>

        {/* Controls: Replay Last & Script Mode */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReplayLast}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5"
            title="Replay Last AI Message"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Replay</span>
          </button>

          {/* Script Selector Controls */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-xs font-semibold">
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
                  <PronunciationButton
                    text={msg.textHindi}
                    speakerId={`msg_${msg.id}`}
                    size="sm"
                    variant={msg.sender === 'user' ? 'solid' : 'ghost'}
                  />
                </div>
              )}

              {/* Hinglish Roman text */}
              {(scriptMode === 'both' || scriptMode === 'hinglish') && (
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
            <span>VaaniAI is generating Hindi response...</span>
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
              className="px-3 py-1.5 rounded-l-xl bg-white/80 dark:bg-dark-800/80 hover:bg-brand-500/10 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 border border-slate-200 dark:border-dark-700 text-xs font-semibold transition-all shadow-sm"
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
          placeholder="Type in Hindi or English (e.g. Aap kaise hain? / नमस्ते)..."
          className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-700 focus-ring text-xs md:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-dark-500 shadow-sm"
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim()}
          className="px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs md:text-sm transition-all shadow-glass-glow flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}
