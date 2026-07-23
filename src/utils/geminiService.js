/**
 * Gemini API Service for VaaniAI Chat (HindiMate AI)
 * Connects directly to Google Gemini API for live conversational responses.
 */

// Helper to get active API Key from localStorage or environment
export function getStoredGeminiKey() {
  const customKey = localStorage.getItem('hindimate_gemini_api_key')
  if (customKey && customKey.trim().length > 10) {
    return customKey.trim()
  }
  const envKey = import.meta.env.VITE_GEMINI_API_KEY || ''
  if (envKey && envKey !== 'your_gemini_api_key_here') {
    return envKey.trim()
  }
  return ''
}

export function saveGeminiKey(key) {
  if (key) {
    localStorage.setItem('hindimate_gemini_api_key', key.trim())
  } else {
    localStorage.removeItem('hindimate_gemini_api_key')
  }
}

const SYSTEM_PROMPT = `
You are "VaaniAI", a friendly, expert Hindi and English bilingual tutor AI.
When the user speaks to you, respond directly, naturally, and contextually to their prompt.

You MUST respond strictly with a valid JSON object containing these 4 keys:
{
  "textHindi": "Your natural response in Hindi (Devanagari script)",
  "textHinglish": "Hinglish transliteration of your Hindi response",
  "textEnglish": "Clear English translation and direct English answer to the user",
  "grammarTip": "A helpful short linguistic insight, vocabulary note, or grammar tip about the response."
}

Do NOT wrap in markdown backticks or markdown formatting. Output raw JSON object only.
`

export async function generateGeminiResponse(userPrompt, conversationHistory = []) {
  const apiKey = getStoredGeminiKey()

  if (!apiKey) {
    console.warn('[geminiService] No Gemini API key found.')
    return {
      textHindi: 'कृपया वार्तालाप जारी रखने के लिए अपनी Gemini API कुंजी दर्ज करें।',
      textHinglish: 'Kripya vaartaalaap jaari rakhne ke liye apni Gemini API kunjee darj karein.',
      textEnglish: 'Please enter your Gemini API Key in the top header to start live AI responses!',
      grammarTip: 'Click the "🔑 Set Gemini API Key" button in the top bar to activate live AI.'
    }
  }

  // Models list preference
  const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash']
  
  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

      // Format history
      const formattedHistory = conversationHistory.slice(-6).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.textHindi || m.textEnglish || m.textHinglish }]
      }))

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            ...formattedHistory,
            {
              role: 'user',
              parts: [{ text: `${SYSTEM_PROMPT}\n\nStudent prompt: "${userPrompt}"` }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
            responseMimeType: 'application/json'
          }
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.warn(`[geminiService] Model ${model} returned status ${response.status}:`, errorData)
        continue
      }

      const data = await response.json()
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''

      if (!rawText) continue

      return parseGeminiOutput(rawText, userPrompt)

    } catch (err) {
      console.warn(`[geminiService] Error with model ${model}:`, err)
    }
  }

  return {
    textHindi: 'क्षमा करें, Gemini API कनेक्ट नहीं हो सका। कृपया अपनी API Key जाँचें।',
    textHinglish: 'Kshama karein, Gemini API connect nahi ho saka.',
    textEnglish: 'Could not connect to Gemini API. Please check your API Key in the top header.',
    grammarTip: 'Verify your API Key from aistudio.google.com'
  }
}

/**
 * Robust JSON Extractor & Sanitizer
 * Guarantees zero raw JSON strings or markdown backticks ever leak to the UI!
 */
function parseGeminiOutput(rawText, userPrompt) {
  let cleaned = rawText.trim()

  // 1. Remove markdown backticks if present
  cleaned = cleaned.replace(/^```(json)?/gi, '').replace(/```$/g, '').trim()

  // 2. Locate JSON boundaries { ... }
  const firstBrace = cleaned.indexOf('{')
  const lastBrace = cleaned.lastIndexOf('}')

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const jsonStr = cleaned.slice(firstBrace, lastBrace + 1)
    try {
      const parsed = JSON.parse(jsonStr)
      if (parsed.textHindi || parsed.textEnglish) {
        return {
          textHindi: cleanString(parsed.textHindi) || 'नमस्ते! कैसे हैं आप?',
          textHinglish: cleanString(parsed.textHinglish) || '',
          textEnglish: cleanString(parsed.textEnglish) || 'Hello! How are you?',
          grammarTip: cleanString(parsed.grammarTip) || 'Natural conversational Hindi response.'
        }
      }
    } catch (e) {
      // Regex extraction fallback if JSON parse fails
      const hindiMatch = cleaned.match(/"textHindi"\s*:\s*"([^"]+)"/)
      const hinglishMatch = cleaned.match(/"textHinglish"\s*:\s*"([^"]+)"/)
      const englishMatch = cleaned.match(/"textEnglish"\s*:\s*"([^"]+)"/)
      const tipMatch = cleaned.match(/"grammarTip"\s*:\s*"([^"]+)"/)

      if (hindiMatch || englishMatch) {
        return {
          textHindi: hindiMatch ? hindiMatch[1] : '',
          textHinglish: hinglishMatch ? hinglishMatch[1] : '',
          textEnglish: englishMatch ? englishMatch[1] : '',
          grammarTip: tipMatch ? tipMatch[1] : 'Conversational response.'
        }
      }
    }
  }

  // 3. Fallback: If rawText is pure natural response without JSON tags
  return {
    textHindi: cleanString(rawText),
    textHinglish: '',
    textEnglish: cleanString(rawText),
    grammarTip: `Response generated for: "${userPrompt}"`
  }
}

function cleanString(str) {
  if (!str) return ''
  return str.replace(/```json/gi, '').replace(/```/g, '').replace(/["{}]/g, '').trim()
}
