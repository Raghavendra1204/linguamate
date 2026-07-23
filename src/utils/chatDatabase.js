/**
 * Chat Database Manager for HindiMate AI (VaaniAI Chat)
 * Stores persistent user chat logs, AI response history, and session analytics.
 */

const STORAGE_KEY = 'hindimate_chat_logs_v1'

const DEFAULT_WELCOME_MESSAGE = {
  id: 1,
  sender: 'vaani',
  textHindi: 'नमस्ते! मैं वाणी हूँ, आपकी AI हिन्दी ट्यूटर (Gemini-Powered)। आज आप किस विषय में बात करना चाहते हैं?',
  textHinglish: 'Namaste! Main Vaani hoon, aapki AI Hindi tutor (Gemini-Powered). Aaj aap kis vishay mein baat karna chahte hain?',
  textEnglish: 'Hello! I am Vaani, your AI Hindi tutor (Gemini-Powered). What topic would you like to talk about today?',
  grammarTip: 'Gemini AI is connected live! Ask anything in Hindi or English.',
  timestamp: new Date().toISOString()
}

export const chatDatabase = {
  /**
   * Retrieve all saved chat messages from storage
   * @returns {Array} Array of message objects
   */
  getLogs: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        // Initialize with default welcome message
        const initial = [DEFAULT_WELCOME_MESSAGE]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
        return initial
      }
      return JSON.parse(stored)
    } catch (error) {
      console.error('[chatDatabase] Error reading chat logs:', error)
      return [DEFAULT_WELCOME_MESSAGE]
    }
  },

  /**
   * Save a single message or list of messages to persistent storage
   * @param {Object|Array} messages Message object or array to append
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
   * Overwrite full message list
   * @param {Array} messageList 
   */
  setAllLogs: (messageList) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messageList))
    } catch (error) {
      console.error('[chatDatabase] Error setting logs:', error)
    }
  },

  /**
   * Clear all stored conversation logs and reset to initial welcome message
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
