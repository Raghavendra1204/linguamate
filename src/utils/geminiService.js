/**
 * Gemini API Service for VaaniAI Chat (HindiMate AI)
 * Connects directly to Google Gemini API using environment configuration.
 */

// Central API Key from Environment
const CENTRAL_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''

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
  const apiKey = (CENTRAL_API_KEY && CENTRAL_API_KEY !== 'your_gemini_api_key_here') ? CENTRAL_API_KEY.trim() : ''

  if (!apiKey) {
    console.warn('[geminiService] VITE_GEMINI_API_KEY is not configured in .env file.')
    return getFallbackResponse(userPrompt)
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

  return getFallbackResponse(userPrompt)
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
          grammarTip: cleanString(parsed.grammarTip) || 'Natural conversational response.'
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
    grammarTip: `Response for: "${userPrompt}"`
  }
}

function cleanString(str) {
  if (!str) return ''
  return str.replace(/```json/gi, '').replace(/```/g, '').replace(/["{}]/g, '').trim()
}

/**
 * Seamless fallback responses if network fails or environment key is pending
 */
function getFallbackResponse(userPrompt) {
  const promptLower = userPrompt.toLowerCase()

  if (promptLower.includes('chai') || promptLower.includes('चाय')) {
    return {
      textHindi: 'अरे वाह! चाय का विचार बहुत अच्छा है। क्या आप चीनी कम लेंगे या ज़्यादा?',
      textHinglish: 'Are wah! Chai ka vichaar bahut achha hai. Kya aap cheeni kam lenge ya zyada?',
      textEnglish: 'Oh wow! The idea of tea is great. Would you like less sugar or more?',
      grammarTip: 'Vocabulary: "कम" (Kam) means less, "ज़्यादा" (Zyada) means more.'
    }
  }

  if (promptLower.includes('नाम') || promptLower.includes('name') || promptLower.includes('परिचय')) {
    return {
      textHindi: 'ज़रूर! आप कह सकते हैं: "मेरा नाम [Name] है और मैं हिन्दी सीख रहा हूँ।"',
      textHinglish: 'Zaroor! Aap kah sakte hain: "Mera naam [Name] hai aur main Hindi seekh raha hoon."',
      textEnglish: 'Sure! You can say: "My name is [Name] and I am learning Hindi."',
      grammarTip: 'Male vs Female: Male says "सीख रहा हूँ", Female says "सीख रही हूँ".'
    }
  }

  return {
    textHindi: 'बहुत बढ़िया! आपका हिन्दी वाक्य बहुत सुंदर है। क्या आप इसे आगे बढ़ाना चाहेंगे?',
    textHinglish: 'Bahut badhiya! Aapka Hindi vaakya bahut sundar hai. Kya aap ise aage badhana chahenge?',
    textEnglish: 'Great job! Your sentence is very good. Would you like to practice more?',
    grammarTip: 'Phrasing: "बहुत बढ़िया" (Bahut badhiya) = Well done / Excellent!'
  }
}
