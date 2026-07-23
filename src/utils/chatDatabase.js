/**
 * Chat Database Manager for HindiMate AI (VaaniAI Chat)
 * Stores persistent user chat logs, AI response history, and session analytics.
 */

const STORAGE_KEY = 'hindimate_chat_logs_v1'

const DEFAULT_WELCOME_MESSAGE = {
  id: 1,
  sender: 'vaani',
  textHindi: 'नमस्ते! मैं आपकी AI हिन्दी ट्यूटर वाणी हूँ।',
  textHinglish: 'Namaste! Main aapki AI Hindi tutor Vaani hoon.',
  textEnglish: 'Hello! I am your AI Hindi tutor Vaani. How can I help you today?',
  grammarTip: 'Ask anything in Hindi or English (e.g., "How are you?", "Translate chai to English")',
  timestamp: new Date().toISOString()
}

export const chatDatabase = {
  /**
   * Retrieve all saved chat messages from storage with sanitization
   */
  getLogs: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        const initial = [DEFAULT_WELCOME_MESSAGE]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
        return initial
      }
      const parsed = JSON.parse(stored)
      
      const cleanVal = (val) => val ? val.replace(/^["'\s{}]/g, '').replace(/["'\s{}]$/g, '').replace(/^textHindi\s*:\s*/i, '').replace(/^textHinglish\s*:\s*/i, '').replace(/^textEnglish\s*:\s*/i, '').replace(/^grammarTip\s*:\s*/i, '').replace(/\\n/g, '\n').trim() : ''

      // Auto-sanitize legacy logs that contained raw JSON or key strings
      const sanitized = parsed.map(m => {
        let h = m.textHindi || ''
        let e = m.textEnglish || ''
        let hg = m.textHinglish || ''
        let t = m.grammarTip || ''

        if (h.includes('textHindi:') || h.includes('{') || h.includes('```')) {
          const matchH = h.match(/textHindi\s*:\s*([^]+?)(?=,\s*textHinglish:|,\s*textEnglish:|,\s*grammarTip:|$)/i)
          const matchHg = h.match(/textHinglish\s*:\s*([^]+?)(?=,\s*textEnglish:|,\s*grammarTip:|$)/i)
          const matchE = h.match(/textEnglish\s*:\s*([^]+?)(?=,\s*grammarTip:|$)/i)
          const matchT = h.match(/grammarTip\s*:\s*([^]+?)$/i)

          if (matchH) h = matchH[1]
          if (matchHg) hg = matchHg[1]
          if (matchE) e = matchE[1]
          if (matchT) t = matchT[1]
        }

        return {
          ...m,
          textHindi: cleanVal(h) || 'नमस्ते!',
          textHinglish: cleanVal(hg),
          textEnglish: cleanVal(e) || 'Hello!',
          grammarTip: cleanVal(t)
        }
      })

      return sanitized
    } catch (error) {
      console.error('[chatDatabase] Error reading chat logs:', error)
      return [DEFAULT_WELCOME_MESSAGE]
    }
  },

  /**
   * Save a single message or list of messages to persistent storage
   */
  saveMessage: (message) => {
    try {
      const logs = chatDatabase.getLogs()
      const updated = Array.isArray(message) ? [...logs, ...message] : [...logs, message]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    } catch (error) {
      console.error('[chatDatabase] Error saving message to log database:', error)
      return []
    }
  },

  /**
   * Clear all stored conversation logs and reset to default
   */
  clearLogs: () => {
    try {
      const reset = [DEFAULT_WELCOME_MESSAGE]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reset))
      return reset
    } catch (error) {
      console.error('[chatDatabase] Error clearing logs:', error)
      return []
    }
  },

  /**
   * Export all chat logs as a downloadable JSON file
   */
  exportLogsJSON: () => {
    try {
      const logs = chatDatabase.getLogs()
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2))
      const downloadAnchor = document.createElement('a')
      downloadAnchor.setAttribute("href", dataStr)
      downloadAnchor.setAttribute("download", `hindimate_vaani_chat_logs_${new Date().toISOString().slice(0,10)}.json`)
      document.body.appendChild(downloadAnchor)
      downloadAnchor.click()
      downloadAnchor.remove()
    } catch (error) {
      console.error('[chatDatabase] Error exporting JSON logs:', error)
    }
  },

  /**
   * Calculate log analytics & stats
   */
  getLogStats: () => {
    const logs = chatDatabase.getLogs()
    const userMsgs = logs.filter(m => m.sender === 'user').length
    const aiMsgs = logs.filter(m => m.sender === 'vaani').length
    return {
      totalMessages: logs.length,
      userInputs: userMsgs,
      vaaniReplies: aiMsgs
    }
  }
}
