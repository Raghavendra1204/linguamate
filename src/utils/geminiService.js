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
You are "VaaniAI", an expert, encouraging, and intelligent Hindi tutor AI.
Respond directly to whatever the student says, asks, or types.

Formats your response strictly as JSON with 4 keys:
{
  "textHindi": "Your full response in Devanagari script (Hindi)",
  "textHinglish": "Romanized Hinglish transliteration",
  "textEnglish": "English translation",
  "grammarTip": "A short, helpful grammar, vocabulary, or cultural tip explaining key phrases in your response."
}

Ensure your response is customized directly to the student's exact prompt.
`

export async function generateGeminiResponse(userPrompt, conversationHistory = []) {
  const apiKey = getStoredGeminiKey()

  if (!apiKey) {
    console.warn('[geminiService] No Gemini API key found. Prompting user for key input.')
    return {
      textHindi: 'कृपया वार्तालाप जारी रखने के लिए अपनी Gemini API कुंजी दर्ज करें।',
      textHinglish: 'Kripya vaartaalaap jaari rakhne ke liye apni Gemini API kunjee darj karein.',
      textEnglish: 'Please enter your Gemini API Key in the top header to start live AI responses!',
      grammarTip: 'Click the "🔑 Set Gemini API Key" button in the top bar to paste your key from aistudio.google.com'
    }
  }

  // List of models to try in order of preference
  const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash']
  
  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

      // Format conversation history
      const formattedHistory = conversationHistory.slice(-8).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.textHindi || m.textHinglish || m.textEnglish }]
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
            maxOutputTokens: 800
          }
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.warn(`[geminiService] Model ${model} returned error ${response.status}:`, errorData)
        continue // Try next model
      }

      const data = await response.json()
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''

      if (!rawText) continue

      // Flexible response parser (handles both JSON and plain text)
      return parseGeminiOutput(rawText, userPrompt)

    } catch (err) {
      console.warn(`[geminiService] Network error trying model ${model}:`, err)
    }
  }

  // If all models failed or key is invalid
  return {
    textHindi: 'क्षमा करें, Gemini API कनेक्ट नहीं हो सका। कृपया अपनी API Key जाँचें।',
    textHinglish: 'Kshama karein, Gemini API connect nahi ho saka. Kripya apni API Key jaanchein.',
    textEnglish: 'Sorry, could not connect to Gemini API. Please verify your API Key.',
    grammarTip: 'Check your API Key from https://aistudio.google.com/ and click "🔑 Set Gemini API Key"'
  }
}

/**
 * Robustly parses Gemini output whether it returns JSON, markdown wrapped JSON, or plain text
 */
function parseGeminiOutput(rawText, userPrompt) {
  try {
    // Clean markdown code blocks if present
    const cleaned = rawText.replace(/```json/gi, '').replace(/```/gi, '').trim()
    
    // Attempt JSON parse
    const parsed = JSON.parse(cleaned)
    if (parsed.textHindi || parsed.textHinglish) {
      return {
        textHindi: parsed.textHindi || rawText,
        textHinglish: parsed.textHinglish || '',
        textEnglish: parsed.textEnglish || '',
        grammarTip: parsed.grammarTip || 'Live response from Gemini AI.'
      }
    }
  } catch (e) {
    // If not JSON, treat rawText directly as Gemini's natural text answer
  }

  return {
    textHindi: rawText,
    textHinglish: 'Gemini AI Direct Response',
    textEnglish: 'Live response generated directly by Gemini AI.',
    grammarTip: `Custom response for: "${userPrompt}"`
  }
}
