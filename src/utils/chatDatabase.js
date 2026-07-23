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
      
      // Auto-sanitize legacy logs that contained raw JSON string blocks
      const sanitized = parsed.map(m => {
        if (m.textHindi && (m.textHindi.includes('{') || m.textHindi.includes('```json'))) {
          const matchH = m.textHindi.match(/"textHindi"\s*:\s*"([^"]+)"/)
          const matchE = m.textHindi.match(/"textEnglish"\s*:\s*"([^"]+)"/)
          const matchHg = m.textHindi.match(/"textHinglish"\s*:\s*"([^"]+)"/)
          const matchT = m.textHindi.match(/"grammarTip"\s*:\s*"([^"]+)"/)
          return {
            ...m,
            textHindi: matchH ? matchH[1] : 'नमस्ते!',
            textHinglish: matchHg ? matchHg[1] : '',
            textEnglish: matchE ? matchE[1] : 'Hello!',
            grammarTip: matchT ? matchT[1] : ''
          }
        }
        return m
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
