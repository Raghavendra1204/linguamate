/**
 * Gemini API Service for VaaniAI Chat (HindiMate AI)
 * Connects directly to Google Gemini API using environment configuration.
 * Supports MPPSC Hindi & Vyakaran Study Material Context Integration.
 */

// Central API Key from Environment
const CENTRAL_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''

const SYSTEM_PROMPT = `
You are "VaaniAI", a friendly, expert Hindi and English bilingual tutor AI on HindiMate AI.
You have full access to the MPPSC General Hindi & Grammar textbook material.

Respond directly and contextually to the student.
Respond strictly in valid JSON format with these 4 string keys:
{
  "textHindi": "Your response in Hindi (Devanagari script)",
  "textHinglish": "Hinglish Romanized transliteration",
  "textEnglish": "English translation and explanation",
  "grammarTip": "A short, helpful grammar or vocabulary tip"
}

Do NOT wrap in markdown backticks. Return valid JSON only.
`

export async function generateGeminiResponse(userPrompt, conversationHistory = [], materialContext = '') {
  const apiKey = (CENTRAL_API_KEY && CENTRAL_API_KEY !== 'your_gemini_api_key_here') ? CENTRAL_API_KEY.trim() : ''

  if (!apiKey) {
    console.warn('[geminiService] VITE_GEMINI_API_KEY is not configured in .env file.')
    return getFallbackResponse(userPrompt)
  }

  const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash']
  
  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

      const formattedHistory = conversationHistory.slice(-6).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.textHindi || m.textEnglish || m.textHinglish }]
      }))

      let promptPayload = `${SYSTEM_PROMPT}\n\n`
      if (materialContext) {
        promptPayload += `ATTACHED STUDY MATERIAL CONTEXT:\n${materialContext}\n\n`
      }
      promptPayload += `Student prompt: "${userPrompt}"`

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            ...formattedHistory,
            {
              role: 'user',
              parts: [{ text: promptPayload }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
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
 * Bulletproof Parser & Sanitizer
 * Prevents raw JSON, key names (textHindi:), or unparsed objects from ever appearing in the UI!
 */
function parseGeminiOutput(rawText, userPrompt) {
  let cleaned = rawText.trim()
  cleaned = cleaned.replace(/^```(json)?/gi, '').replace(/```$/g, '').trim()

  let textHindi = ''
  let textHinglish = ''
  let textEnglish = ''
  let grammarTip = ''

  // Attempt 1: Standard JSON parse
  const firstBrace = cleaned.indexOf('{')
  const lastBrace = cleaned.lastIndexOf('}')

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    try {
      const parsed = JSON.parse(cleaned.slice(firstBrace, lastBrace + 1))
      textHindi = parsed.textHindi || ''
      textHinglish = parsed.textHinglish || ''
      textEnglish = parsed.textEnglish || ''
      grammarTip = parsed.grammarTip || ''
    } catch (e) {}
  }

  // Attempt 2: Key-based extraction if string contains "textHindi:" or "textEnglish:"
  if (!textHindi && (cleaned.includes('textHindi:') || cleaned.includes('textEnglish:'))) {
    const hindiMatch = cleaned.match(/textHindi\s*:\s*([^]+?)(?=,\s*textHinglish:|,\s*textEnglish:|,\s*grammarTip:|$)/i)
    const hinglishMatch = cleaned.match(/textHinglish\s*:\s*([^]+?)(?=,\s*textEnglish:|,\s*grammarTip:|$)/i)
    const englishMatch = cleaned.match(/textEnglish\s*:\s*([^]+?)(?=,\s*grammarTip:|$)/i)
    const tipMatch = cleaned.match(/grammarTip\s*:\s*([^]+?)$/i)

    if (hindiMatch) textHindi = hindiMatch[1]
    if (hinglishMatch) textHinglish = hinglishMatch[1]
    if (englishMatch) textEnglish = englishMatch[1]
    if (tipMatch) grammarTip = tipMatch[1]
  }

  // Attempt 3: Natural plain text fallback if no keys match
  if (!textHindi && !textEnglish) {
    textHindi = cleaned
    textEnglish = cleaned
  }

  // Final Cleanup & Sanitization
  textHindi = cleanTextValue(textHindi)
  textHinglish = cleanTextValue(textHinglish)
  textEnglish = cleanTextValue(textEnglish)
  grammarTip = cleanTextValue(grammarTip)

  return {
    textHindi: textHindi || 'नमस्ते! मैं आपकी मदद करने के लिए यहाँ हूँ।',
    textHinglish: textHinglish,
    textEnglish: textEnglish || 'Hello! I am here to help you.',
    grammarTip: grammarTip
  }
}

function cleanTextValue(val) {
  if (!val) return ''
  return val
    .replace(/^["'\s{}]/g, '')
    .replace(/["'\s{}]$/g, '')
    .replace(/^textHindi\s*:\s*/i, '')
    .replace(/^textHinglish\s*:\s*/i, '')
    .replace(/^textEnglish\s*:\s*/i, '')
    .replace(/^grammarTip\s*:\s*/i, '')
    .replace(/\\n/g, '\n')
    .trim()
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
