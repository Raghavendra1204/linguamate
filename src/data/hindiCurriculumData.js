/**
 * Comprehensive Hindi Learning Curriculum Dataset for HindiMate AI
 * 100+ Structured Lessons organized by Sections & Categories.
 * Includes Devanagari script, greetings, conversations, numbers, vocabulary, and grammar.
 */

export const CURRICULUM_SECTIONS = [
  {
    id: 'script',
    title: 'Devanagari Script',
    hindiTitle: 'देवनागरी लिपि ज्ञान',
    iconName: 'BookOpen',
    description: 'Master the core building blocks of Hindi reading and writing: vowels, consonants, matras, and conjuncts.',
    categories: [
      { id: 'vowels', title: 'Vowels (स्वर)', count: 4 },
      { id: 'consonants', title: 'Consonants (व्यंजन)', count: 8 },
      { id: 'matras', title: 'Matras (मात्राएँ)', count: 5 },
      { id: 'conjuncts', title: 'Half & Conjunct Letters (संयुक्त व आधे अक्षर)', count: 4 },
      { id: 'reading', title: 'Writing & Reading Drills', count: 4 }
    ]
  },
  {
    id: 'greetings',
    title: 'Essential Greetings & Daily Conversations',
    hindiTitle: 'अभिवादन एवं रोजमर्रा की बातचीत',
    iconName: 'MessageSquare',
    description: 'Learn essential social etiquette, personal introductions, and real-world conversation scenarios.',
    categories: [
      { id: 'basic_greetings', title: 'Basic Greetings & Manners', count: 5 },
      { id: 'introductions', title: 'Self & Family Introductions', count: 6 },
      { id: 'daily_scenarios', title: 'Daily Conversations', count: 9 }
    ]
  },
  {
    id: 'numbers',
    title: 'Numbers, Time & Currency',
    hindiTitle: 'गिनती, समय एवं मुद्रा',
    iconName: 'Layers',
    description: 'Learn Hindi numerals, counting objects, telling time, days of week, months, and Indian Rupees (₹).',
    categories: [
      { id: 'counting', title: 'Counting 1 to 100', count: 5 },
      { id: 'time_date', title: 'Time, Days & Calendar', count: 5 },
      { id: 'money', title: 'Indian Currency & Prices (₹)', count: 4 }
    ]
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary Builder',
    hindiTitle: 'शब्दावली कोष',
    iconName: 'BookMarked',
    description: 'Expand your Hindi lexicon with 25+ categorized vocabulary decks and example sentences.',
    categories: [
      { id: 'people_home', title: 'Family, Body & Home', count: 6 },
      { id: 'food_nature', title: 'Food, Animals & Nature', count: 6 },
      { id: 'life_tech', title: 'Travel, Work & Technology', count: 6 },
      { id: 'words_actions', title: 'Verbs, Adjectives & Emotions', count: 6 }
    ]
  },
  {
    id: 'grammar',
    title: 'Grammar Mastery',
    hindiTitle: 'हिन्दी व्याकरण',
    iconName: 'Sparkles',
    description: 'Master Hindi sentence structures (SOV), gender rules, tenses, postpositions, and question formation.',
    categories: [
      { id: 'foundations', title: 'Grammar Foundations (SOV & Nouns)', count: 5 },
      { id: 'tenses', title: 'Tenses & Verb Conjugation', count: 5 },
      { id: 'advanced_grammar', title: 'Postpositions & Syntax Rules', count: 6 }
    ]
  }
]

export const HINDI_LESSONS = [
  // ==========================================
  // SECTION 1: DEVANAGARI SCRIPT
  // ==========================================
  
  // Vowels
  {
    id: 'vowels_1',
    sectionId: 'script',
    categoryId: 'vowels',
    title: 'Hindi Independent Vowels - Part 1 (अ, आ, इ, ई)',
    hindiTitle: 'मूल स्वर - भाग १',
    difficulty: 'Beginner',
    itemCount: 4,
    estTime: '5 mins',
    xpReward: 50,
    progress: 100,
    isCompleted: true,
    isBookmarked: false,
    description: 'Learn the first four Hindi vowels with stroke order, audio, and example words.',
    items: [
      { devanagari: 'अ', roman: 'a', english: 'Short "a" sound (like in "along")', example: 'अनार (Anar - Pomegranate)' },
      { devanagari: 'आ', roman: 'aa', english: 'Long "aa" sound (like in "father")', example: 'आम (Aam - Mango)' },
      { devanagari: 'इ', roman: 'i', english: 'Short "i" sound (like in "it")', example: 'इमली (Imli - Tamarind)' },
      { devanagari: 'ई', roman: 'ee', english: 'Long "ee" sound (like in "feet")', example: 'ईख (Eekh - Sugarcane)' }
    ],
    quiz: {
      question: 'Which Hindi vowel represents the long "aa" sound in "Mango" (आम)?',
      options: ['अ', 'आ', 'इ', 'ई'],
      answerIndex: 1,
      explanation: '"आ" (Aa) is the long vowel sound used in "आम" (Aam).'
    },
    aiExplanation: 'In Devanagari, short vowels like "अ" and "इ" are pronounced briskly, while long vowels like "आ" and "ई" double the vocal duration.'
  },
  {
    id: 'vowels_2',
    sectionId: 'script',
    categoryId: 'vowels',
    title: 'Hindi Independent Vowels - Part 2 (उ, ऊ, ऋ)',
    hindiTitle: 'मूल स्वर - भाग २',
    difficulty: 'Beginner',
    itemCount: 3,
    estTime: '5 mins',
    xpReward: 50,
    progress: 75,
    isCompleted: false,
    isBookmarked: true,
    description: 'Master rounded vowels "U", "Oo" and vocalic "Ri".',
    items: [
      { devanagari: 'उ', roman: 'u', english: 'Short "u" sound (like in "put")', example: 'उल्लू (Ullu - Owl)' },
      { devanagari: 'ऊ', roman: 'oo', english: 'Long "oo" sound (like in "moon")', example: 'ऊन (Oon - Wool)' },
      { devanagari: 'ऋ', roman: 'ri', english: 'Vocalic "ri" sound (like in "rhythm")', example: 'ऋषि (Rishi - Sage)' }
    ],
    quiz: {
      question: 'What is the correct Hindi vowel for "Owl" (Ullu)?',
      options: ['उ', 'ऊ', 'ऋ', 'अ'],
      answerIndex: 0,
      explanation: '"उ" (U) is the short vowel used in "उल्लू".'
    },
    aiExplanation: '"ऋ" (Rishi) is a traditional vocalic vowel inherited from Sanskrit, pronounced as "ri" in modern Hindi.'
  },
  {
    id: 'vowels_3',
    sectionId: 'script',
    categoryId: 'vowels',
    title: 'Hindi Dipthong Vowels (ए, ऐ, ओ, औ)',
    hindiTitle: 'संयुक्त स्वर',
    difficulty: 'Beginner',
    itemCount: 4,
    estTime: '6 mins',
    xpReward: 60,
    progress: 0,
    isCompleted: false,
    isBookmarked: false,
    description: 'Learn the diphthongs E, Ai, O, and Au with audio pronunciations.',
    items: [
      { devanagari: 'ए', roman: 'e', english: '"E" sound (like in "play")', example: 'एक (Ek - One)' },
      { devanagari: 'ऐ', roman: 'ai', english: '"Ai" sound (like in "cat" or "aisle")', example: 'ऐनक (Ainak - Spectacles)' },
      { devanagari: 'ओ', roman: 'o', english: '"O" sound (like in "go")', example: 'ओखली (Okhli - Mortar)' },
      { devanagari: 'औ', roman: 'au', english: '"Au" sound (like in "cow" or "saw")', example: 'औरत (Aurat - Woman)' }
    ],
    quiz: {
      question: 'Which character stands for "Woman" (Aurat)?',
      options: ['ए', 'ऐ', 'ओ', 'औ'],
      answerIndex: 3,
      explanation: '"औ" (Au) is the starting vowel in "औरत".'
    },
    aiExplanation: '"ऐ" and "औ" represent open diphthong sounds in Hindi.'
  },
  {
    id: 'vowels_4',
    sectionId: 'script',
    categoryId: 'vowels',
    title: 'Nasal & Modifier Vowels (अं, अः)',
    hindiTitle: 'अनुस्वार एवं विसर्ग',
    difficulty: 'Beginner',
    itemCount: 2,
    estTime: '4 mins',
    xpReward: 40,
    progress: 0,
    isCompleted: false,
    isBookmarked: false,
    description: 'Learn Anusvara (nasal dot) and Visarga (aspiration dots).',
    items: [
      { devanagari: 'अं', roman: 'am / an', english: 'Anusvara (Nasal sound "m/n")', example: 'अंगूर (Angoor - Grapes)' },
      { devanagari: 'अः', roman: 'ah', english: 'Visarga (Breath sound "ah")', example: 'नमः (Namah - Salutation)' }
    ],
    quiz: {
      question: 'What dot symbol indicates a nasal sound in "अंगूर" (Grapes)?',
      options: ['Anusvara (अं)', 'Visarga (अः)', 'Chandrabindu', 'Halant'],
      answerIndex: 0,
      explanation: 'Anusvara (अं) adds a nasal sound (m or n) to the vowel.'
    },
    aiExplanation: 'Anusvara is written as a top dot (ं) and nasalizes the preceding vowel.'
  },

  // Consonants by Articulation Group
  {
    id: 'consonants_velar',
    sectionId: 'script',
    categoryId: 'consonants',
    title: 'Velar Consonants (क वर्ग - Guttural)',
    hindiTitle: 'कंठ्य व्यंजन (क, ख, ग, घ, ङ)',
    difficulty: 'Beginner',
    itemCount: 5,
    estTime: '8 mins',
    xpReward: 70,
    progress: 50,
    isCompleted: false,
    isBookmarked: true,
    description: 'Consonants pronounced at the back of the throat (soft palate).',
    items: [
      { devanagari: 'क', roman: 'ka', english: 'Unaspirated "k" (skate)', example: 'कमल (Kamal - Lotus)' },
      { devanagari: 'ख', roman: 'kha', english: 'Aspirated "kh" (khaki)', example: 'खरगोश (Khargosh - Rabbit)' },
      { devanagari: 'ग', roman: 'ga', english: 'Unaspirated "g" (go)', example: 'गमला (Gamla - Flowerpot)' },
      { devanagari: 'घ', roman: 'gha', english: 'Aspirated "gh" (ghost)', example: 'घर (Ghar - House)' },
      { devanagari: 'ङ', roman: 'nga', english: 'Nasal "ng" (sing)', example: 'गंगा (Ganga - Ganges)' }
    ],
    quiz: {
      question: 'Which letter represents the aspirated "kh" sound in "Rabbit" (खरगोश)?',
      options: ['क', 'ख', 'ग', 'घ'],
      answerIndex: 1,
      explanation: '"ख" (Kha) has strong air expulsion (aspiration).'
    },
    aiExplanation: 'Hindi distinguishes between unaspirated (soft air) and aspirated (strong puff of air) consonants.'
  },
  {
    id: 'consonants_palatal',
    sectionId: 'script',
    categoryId: 'consonants',
    title: 'Palatal Consonants (च वर्ग)',
    hindiTitle: 'तालव्य व्यंजन (च, छ, ज, झ, ञ)',
    difficulty: 'Beginner',
    itemCount: 5,
    estTime: '8 mins',
    xpReward: 70,
    progress: 0,
    isCompleted: false,
    isBookmarked: false,
    description: 'Consonants pronounced with the tongue against the hard palate.',
    items: [
      { devanagari: 'च', roman: 'cha', english: '"ch" (chair)', example: 'चम्मच (Chammach - Spoon)' },
      { devanagari: 'छ', roman: 'chha', english: 'Aspirated "chh" (match-box)', example: 'छतरी (Chhatri - Umbrella)' },
      { devanagari: 'ज', roman: 'ja', english: '"j" (joy)', example: 'जहाज (Jahaj - Ship)' },
      { devanagari: 'झ', roman: 'jha', english: 'Aspirated "jh" (hedge-hog)', example: 'झंडा (Jhanda - Flag)' },
      { devanagari: 'ञ', roman: 'nya', english: 'Nasal "ny" (canyon)', example: 'चंचल (Chanchal)' }
    ],
    quiz: {
      question: 'Which consonant begins the word for "Umbrella" (छतरी)?',
      options: ['च', 'छ', 'ज', 'झ'],
      answerIndex: 1,
      explanation: '"छ" (Chha) is the aspirated palatal sound.'
    },
    aiExplanation: 'Palatals are articulated by flattening the tongue flat against the roof of the mouth.'
  },
  {
    id: 'consonants_retroflex',
    sectionId: 'script',
    categoryId: 'consonants',
    title: 'Retroflex Consonants (ट वर्ग)',
    hindiTitle: 'मूर्धन्य व्यंजन (ट, ठ, ड, ढ, ण)',
    difficulty: 'Beginner',
    itemCount: 5,
    estTime: '8 mins',
    xpReward: 70,
    progress: 0,
    isCompleted: false,
    isBookmarked: false,
    description: 'Consonants produced by curling the tip of the tongue back against the roof of the mouth.',
    items: [
      { devanagari: 'ट', roman: 'Ta', english: 'Hard "T" (tub)', example: 'टमाटर (Tamatar - Tomato)' },
      { devanagari: 'ठ', roman: 'Tha', english: 'Aspirated hard "Th"', example: 'ठठेरा (Thathera - Coppersmith)' },
      { devanagari: 'ड', roman: 'Da', english: 'Hard "D" (dog)', example: 'डमरू (Damru - Drum)' },
      { devanagari: 'ढ', roman: 'Dha', english: 'Aspirated hard "Dh"', example: 'ढोलक (Dholak - Dholak drum)' },
      { devanagari: 'ण', roman: 'Na', english: 'Retroflex "N"', example: 'बाण (Baan - Arrow)' }
    ],
    quiz: {
      question: 'Which consonant is used in "Tomato" (टमाटर)?',
      options: ['ट', 'त', 'ड', 'द'],
      answerIndex: 0,
      explanation: '"ट" is the hard retroflex T sound.'
    },
    aiExplanation: 'Retroflex consonants require curling your tongue back so the underside touches the hard palate.'
  },
  {
    id: 'consonants_dental',
    sectionId: 'script',
    categoryId: 'consonants',
    title: 'Dental Consonants (त वर्ग)',
    hindiTitle: 'दंत्य व्यंजन (त, थ, द, ध, न)',
    difficulty: 'Beginner',
    itemCount: 5,
    estTime: '8 mins',
    xpReward: 70,
    progress: 0,
    isCompleted: false,
    isBookmarked: false,
    description: 'Consonants pronounced with the tongue touching the back of upper teeth.',
    items: [
      { devanagari: 'त', roman: 'ta', english: 'Soft "t" (Spanish "t")', example: 'तरबूज (Tarbooj - Watermelon)' },
      { devanagari: 'थ', roman: 'tha', english: 'Soft aspirated "th" (think)', example: 'थर्मामीटर (Thermometer)' },
      { devanagari: 'द', roman: 'da', english: 'Soft "d" (this)', example: 'दवात (Dawaat - Inkpot)' },
      { devanagari: 'ध', roman: 'dha', english: 'Soft aspirated "dh" (the man)', example: 'धनुष (Dhanush - Bow)' },
      { devanagari: 'न', roman: 'na', english: 'Dental "n" (net)', example: 'नल (Nal - Tap)' }
    ],
    quiz: {
      question: 'How is soft dental "त" different from retroflex "ट"?',
      options: ['Tongue touches upper teeth', 'Tongue curls back', 'Lips close', 'Throat sound'],
      answerIndex: 0,
      explanation: 'Dental "त" touches the back of upper teeth, unlike retroflex "ट" which curls backward.'
    },
    aiExplanation: 'Dental sounds in Hindi are much softer than English hard D and T.'
  },
  {
    id: 'consonants_labial',
    sectionId: 'script',
    categoryId: 'consonants',
    title: 'Labial Consonants (प वर्ग)',
    hindiTitle: 'ओष्ठ्य व्यंजन (प, फ, ब, भ, म)',
    difficulty: 'Beginner',
    itemCount: 5,
    estTime: '8 mins',
    xpReward: 70,
    progress: 0,
    isCompleted: false,
    isBookmarked: false,
    description: 'Consonants articulated by bringing upper and lower lips together.',
    items: [
      { devanagari: 'प', roman: 'pa', english: '"p" (spin)', example: 'पतंग (Patang - Kite)' },
      { devanagari: 'फ', roman: 'pha / fa', english: 'Aspirated "ph" (phone)', example: 'फल (Phal - Fruit)' },
      { devanagari: 'ब', roman: 'ba', english: '"b" (boy)', example: 'बतक (Batak - Duck)' },
      { devanagari: 'भ', roman: 'bha', english: 'Aspirated "bh" (abhor)', example: 'भालू (Bhaalu - Bear)' },
      { devanagari: 'म', roman: 'ma', english: '"m" (mother)', example: 'मछली (Machhli - Fish)' }
    ],
    quiz: {
      question: 'Which consonant starts "Fruit" (फल)?',
      options: ['प', 'फ', 'ब', 'भ'],
      answerIndex: 1,
      explanation: '"फ" (Phal) is the aspirated labial sound.'
    },
    aiExplanation: 'Labials are formed entirely by pressed or popping lips.'
  },

  // Matras
  {
    id: 'matras_1',
    sectionId: 'script',
    categoryId: 'matras',
    title: 'Vowel Signs - Matras Part 1 (ा, ि, ी)',
    hindiTitle: 'मात्राएँ - भाग १ (आ, इ, ई)',
    difficulty: 'Beginner',
    itemCount: 3,
    estTime: '6 mins',
    xpReward: 60,
    progress: 100,
    isCompleted: true,
    isBookmarked: false,
    description: 'Learn how dependent vowel signs attach to consonants.',
    items: [
      { devanagari: 'ा (आ-मात्रा)', roman: 'aa', english: 'Aa-matra (vertical line after consonant)', example: 'का (K + aa = Kaa)' },
      { devanagari: 'ि (इ-मात्रा)', roman: 'i', english: 'Short i-matra (attached BEFORE consonant)', example: 'कि (K + i = Ki)' },
      { devanagari: 'ी (ई-मात्रा)', roman: 'ee', english: 'Long ee-matra (attached AFTER consonant)', example: 'की (K + ee = Kee)' }
    ],
    quiz: {
      question: 'Which matra is attached BEFORE the consonant symbol?',
      options: ['Short i-matra (ि)', 'Long ee-matra (ी)', 'Aa-matra (ा)', 'Oo-matra (ू)'],
      answerIndex: 0,
      explanation: 'Short i-matra (ि) is uniquely drawn to the left (before) the consonant it modifies.'
    },
    aiExplanation: 'When a vowel attaches to a consonant, it drops its full letter form and becomes a Matra symbol.'
  },

  // Conjuncts
  {
    id: 'conjuncts_1',
    sectionId: 'script',
    categoryId: 'conjuncts',
    title: 'Four Classic Conjunct Letters (क्ष, त्र, ज्ञ, श्र)',
    hindiTitle: 'संयुक्त अक्षर',
    difficulty: 'Intermediate',
    itemCount: 4,
    estTime: '7 mins',
    xpReward: 75,
    progress: 25,
    isCompleted: false,
    isBookmarked: true,
    description: 'Learn the unique composite characters formed by joining two consonants.',
    items: [
      { devanagari: 'क्ष', roman: 'ksha', english: 'K + Sha', example: 'क्षमा (Kshama - Forgiveness)' },
      { devanagari: 'त्र', roman: 'tra', english: 'T + Ra', example: 'त्रिशूल (Trishul - Trident)' },
      { devanagari: 'ज्ञ', roman: 'gya', english: 'J + Nya', example: 'ज्ञान (Gyaan - Knowledge)' },
      { devanagari: 'श्र', roman: 'shra', english: 'Sh + Ra', example: 'श्रम (Shram - Labor)' }
    ],
    quiz: {
      question: 'What combined character is used in "Knowledge" (ज्ञान)?',
      options: ['क्ष', 'त्र', 'ज्ञ', 'श्र'],
      answerIndex: 2,
      explanation: '"ज्ञ" (Gya) represents the composite sound of J + Nya.'
    },
    aiExplanation: 'Conjunct letters merge two consonant sounds without an intervening vowel.'
  },

  // ==========================================
  // SECTION 2: GREETINGS & DAILY CONVERSATION
  // ==========================================
  {
    id: 'greetings_basic',
    sectionId: 'greetings',
    categoryId: 'basic_greetings',
    title: 'Essential Greetings & Etiquette',
    hindiTitle: 'मूल अभिवादन और शिष्टाचार',
    difficulty: 'Beginner',
    itemCount: 8,
    estTime: '8 mins',
    xpReward: 80,
    progress: 100,
    isCompleted: true,
    isBookmarked: false,
    description: 'Say hello, goodbye, thank you, sorry, and excuse me respectfully.',
    items: [
      { devanagari: 'नमस्ते / नमस्कार', roman: 'Namaste / Namaskar', english: 'Hello / Formal Respectful Greeting', example: 'नमस्ते जी!' },
      { devanagari: 'सुप्रभात', roman: 'Suprabhat', english: 'Good Morning', example: 'आपकी सुबह मंगलमय हो।' },
      { devanagari: 'शुभ रात्रि', roman: 'Shubh Ratri', english: 'Good Night', example: 'शुभ रात्रि, कल मिलते हैं।' },
      { devanagari: 'धन्यवाद / शुक्रिया', roman: 'Dhanyavaad / Shukriya', english: 'Thank You', example: 'आपकी मदद के लिए धन्यवाद।' },
      { devanagari: 'कृपया', roman: 'Kripaya', english: 'Please', example: 'कृपया यहाँ बैठिए।' },
      { devanagari: 'माफ़ कीजिए', roman: 'Maaf kijiye', english: 'Sorry / Excuse me', example: 'माफ़ कीजिए, क्या समय हुआ है?' },
      { devanagari: 'कोई बात नहीं', roman: 'Koi baat nahi', english: "You're welcome / No problem", example: 'कोई बात नहीं, ठीक है।' },
      { devanagari: 'फिर मिलेंगे', roman: 'Phir milenge', english: 'See you again / Goodbye', example: 'अलविदा, फिर मिलेंगे!' }
    ],
    quiz: {
      question: 'How do you say "Thank You" formally in Hindi?',
      options: ['धन्यवाद (Dhanyavaad)', 'सुप्रभात (Suprabhat)', 'कृपया (Kripaya)', 'नमस्ते (Namaste)'],
      answerIndex: 0,
      explanation: '"धन्यवाद" (Dhanyavaad) or "शुक्रिया" (Shukriya) means Thank You.'
    },
    aiExplanation: 'Adding "जी" (Ji) after names or greetings adds warmth and respect.'
  },
  {
    id: 'greetings_intro',
    sectionId: 'greetings',
    categoryId: 'introductions',
    title: 'Introducing Yourself & Asking Names',
    hindiTitle: 'अपना परिचय देना',
    difficulty: 'Beginner',
    itemCount: 6,
    estTime: '8 mins',
    xpReward: 80,
    progress: 60,
    isCompleted: false,
    isBookmarked: true,
    description: 'State your name, ask others, and say nice to meet you.',
    items: [
      { devanagari: 'आपका नाम क्या है?', roman: 'Aapka naam kya hai?', english: 'What is your name? (Polite)', example: 'नमस्ते, आपका नाम क्या है?' },
      { devanagari: 'मेरा नाम [नाम] है।', roman: 'Mera naam [Name] hai.', english: 'My name is [Name].', example: 'मेरा नाम राहुल है।' },
      { devanagari: 'आपसे मिलकर ख़ुशी हुई।', roman: 'Aapse milkar khushi hui.', english: 'Nice to meet you.', example: 'आपसे मिलकर बहुत ख़ुशी हुई।' },
      { devanagari: 'आप कैसे हैं? / आप कैसी हैं?', roman: 'Aap kaise hain? (m) / Aap kaisi hain? (f)', english: 'How are you?', example: 'नमस्ते जी, आप कैसे हैं?' },
      { devanagari: 'मैं ठीक हूँ।', roman: 'Main theek hoon.', english: "I am fine.", example: 'मैं बिल्कुल ठीक हूँ।' },
      { devanagari: 'आप कहाँ से हैं?', roman: 'Aap kahan se hain?', english: 'Where are you from?', example: 'आप कहाँ के रहने वाले हैं?' }
    ],
    quiz: {
      question: 'How do you say "My name is..." in Hindi?',
      options: ['मेरा नाम... है (Mera naam... hai)', 'आपका नाम क्या है?', 'आप कैसे हैं?', 'मैं ठीक हूँ'],
      answerIndex: 0,
      explanation: '"मेरा नाम [Name] है" means My name is [Name].'
    },
    aiExplanation: '"आप" (Aap) is the polite "you", used for elders and strangers.'
  },
  {
    id: 'scenario_restaurant',
    sectionId: 'greetings',
    categoryId: 'daily_scenarios',
    title: 'Ordering Food at a Dhaba or Restaurant',
    hindiTitle: 'रेस्टोरेंट व ढाबे पर खाना मँगवाना',
    difficulty: 'Intermediate',
    itemCount: 7,
    estTime: '10 mins',
    xpReward: 90,
    progress: 0,
    isCompleted: false,
    isBookmarked: false,
    description: 'Order chai, samosas, water, and ask for the bill at a restaurant.',
    items: [
      { devanagari: 'मेनू कार्ड दीजिए।', roman: 'Menu card deejiye.', english: 'Please give the menu card.', example: 'भैया, मेनू कार्ड दीजिए।' },
      { devanagari: 'एक कप गरमा गरम चाय।', roman: 'Ek cup garma garam chai.', english: 'One cup of hot tea.', example: 'अदरक वाली एक कप चाय देना।' },
      { devanagari: 'कम चीनी / बिना चीनी की चाय', roman: 'Kam cheeni / bina cheeni ki chai', english: 'Tea with less sugar / no sugar', example: 'चाय में कम चीनी रखना।' },
      { devanagari: 'पानी की बोतल दीजिए।', roman: 'Paani ki bottle deejiye.', english: 'Give a bottle of water.', example: 'ठंडे पानी की बोतल दीजिए।' },
      { devanagari: 'खाना बहुत स्वादिष्ट है!', roman: 'Khana bahut swadisht hai!', english: 'The food is very delicious!', example: 'आपका खाना बहुत स्वादिष्ट है।' },
      { devanagari: 'बिल कितना हुआ?', roman: 'Bill kitna hua?', english: 'How much is the bill?', example: 'भैया, कुल बिल कितना हुआ?' },
      { devanagari: 'ऑनलाइन पेमेंट ले सकते हैं?', roman: 'Online payment le sakte hain?', english: 'Can you take online payment?', example: 'क्या UPI पेमेंट चलेगा?' }
    ],
    quiz: {
      question: 'How do you ask for the bill at a restaurant?',
      options: ['बिल कितना हुआ? (Bill kitna hua?)', 'मेनू दीजिए', 'पानी दीजिए', 'चाय बनाइए'],
      answerIndex: 0,
      explanation: '"बिल कितना हुआ?" means How much is the bill?'
    },
    aiExplanation: 'In informal eateries, server or waiter is politely called "भैया" (Bhaiya - Brother).'
  },

  // ==========================================
  // SECTION 3: NUMBERS, TIME & CURRENCY
  // ==========================================
  {
    id: 'numbers_1_10',
    sectionId: 'numbers',
    categoryId: 'counting',
    title: 'Hindi Numbers 1 to 10 (गिनती १-१०)',
    hindiTitle: 'गिनती १ से १०',
    difficulty: 'Beginner',
    itemCount: 10,
    estTime: '7 mins',
    xpReward: 70,
    progress: 100,
    isCompleted: true,
    isBookmarked: false,
    description: 'Learn Hindi numerals 1 to 10 with Devanagari digits.',
    items: [
      { devanagari: '१ (एक)', roman: 'Ek', english: '1 - One', example: 'एक समोसा' },
      { devanagari: '२ (दो)', roman: 'Do', english: '2 - Two', example: 'दो कप चाय' },
      { devanagari: '३ (तीन)', roman: 'Teen', english: '3 - Three', example: 'तीन लोग' },
      { devanagari: '४ (चार)', roman: 'Chaar', english: '4 - Four', example: 'चार दिन' },
      { devanagari: '५ (पाँच)', roman: 'Paanch', english: '5 - Five', example: 'पाँच रुपये' },
      { devanagari: '६ (छह)', roman: 'Chhah', english: '6 - Six', example: 'छह बजे' },
      { devanagari: '७ (सात)', roman: 'Saat', english: '7 - Seven', example: 'सात रँग' },
      { devanagari: '८ (आठ)', roman: 'Aath', english: '8 - Eight', example: 'आठ घंटे' },
      { devanagari: '९ (नौ)', roman: 'Nau', english: '9 - Nine', example: 'नौ ग्रह' },
      { devanagari: '१० (दस)', roman: 'Das', english: '10 - Ten', example: 'दस मिनट' }
    ],
    quiz: {
      question: 'What is the Hindi number for 5 (पाँच)?',
      options: ['Paanch (पाँच)', 'Teen (तीन)', 'Saat (सात)', 'Das (दस)'],
      answerIndex: 0,
      explanation: '5 in Hindi is "पाँच" (Paanch).'
    },
    aiExplanation: 'Hindi digits use traditional Devanagari numeral symbols (१, २, ३, ४, ५, ६, ७, ८, ९, १०).'
  },
  {
    id: 'time_telling',
    sectionId: 'numbers',
    categoryId: 'time_date',
    title: 'Telling Time & Time of Day',
    hindiTitle: 'समय बताना',
    difficulty: 'Intermediate',
    itemCount: 6,
    estTime: '8 mins',
    xpReward: 80,
    progress: 0,
    isCompleted: false,
    isBookmarked: false,
    description: 'Ask for time, tell hours, morning, afternoon, and night.',
    items: [
      { devanagari: 'कितने बजे हैं?', roman: 'Kitne baje hain?', english: 'What time is it?', example: 'घड़ी में कितने बजे हैं?' },
      { devanagari: 'पाँच बजे हैं।', roman: 'Paanch baje hain.', english: "It is 5 o'clock.", example: 'अभी पाँच बजे हैं।' },
      { devanagari: 'साढ़े चार बजे', roman: 'Saadhe chaar baje', english: 'Half past four (4:30)', example: 'मीटिंग साढ़े चार बजे है।' },
      { devanagari: 'सुबह', roman: 'Subah', english: 'Morning', example: 'सुबह 8 बजे' },
      { devanagari: 'दोपहर', roman: 'Dopahar', english: 'Afternoon', example: 'दोपहर 2 बजे' },
      { devanagari: 'शाम / रात', roman: 'Shaam / Raat', english: 'Evening / Night', example: 'शाम 7 बजे' }
    ],
    quiz: {
      question: 'How do you say "4:30" (Half past four) in Hindi?',
      options: ['साढ़े चार बजे (Saadhe chaar baje)', 'चार बजे', 'पाँच बजे', 'दोपहर'],
      answerIndex: 0,
      explanation: '"साढ़े" (Saadhe) means half past.'
    },
    aiExplanation: '"साढ़े" adds 30 minutes to hours starting from 3 onwards.'
  },

  // ==========================================
  // SECTION 4: VOCABULARY BUILDER
  // ==========================================
  {
    id: 'vocab_family',
    sectionId: 'vocabulary',
    categoryId: 'people_home',
    title: 'Family Members & Relatives (परिवार)',
    hindiTitle: 'परिवार के सदस्य',
    difficulty: 'Beginner',
    itemCount: 8,
    estTime: '7 mins',
    xpReward: 70,
    progress: 80,
    isCompleted: false,
    isBookmarked: true,
    description: 'Learn Hindi terms for parents, siblings, grandparents, and relatives.',
    items: [
      { devanagari: 'माता जी / माँ', roman: 'Mata ji / Maa', english: 'Mother', example: 'मेरी माँ बहुत दयालु हैं।' },
      { devanagari: 'पिता जी / पापा', roman: 'Pita ji / Papa', english: 'Father', example: 'मेरे पिता जी डॉक्टर हैं।' },
      { devanagari: 'बड़ा भाई / छोटा भाई', roman: 'Bada bhai / Chhota bhai', english: 'Elder brother / Younger brother', example: 'मेरा एक छोटा भाई है।' },
      { devanagari: 'बड़ी बहन / छोटी बहन', roman: 'Badi behen / Chhoti behen', english: 'Elder sister / Younger sister', example: 'मेरी बड़ी बहन गायिका है।' },
      { devanagari: 'दादा जी / दादी जी', roman: 'Dada ji / Dadi ji', english: 'Paternal Grandfather / Grandmother', example: 'दादा जी कहानी सुनाते हैं।' },
      { devanagari: 'नाना जी / नानी जी', roman: 'Nana ji / Nani ji', english: 'Maternal Grandfather / Grandmother', example: 'हम नानी जी के घर गए।' },
      { devanagari: 'बेटा / बेटी', roman: 'Beta / Beti', english: 'Son / Daughter', example: 'उनका बेटा समझदार है।' },
      { devanagari: 'दोस्त / मित्र', roman: 'Dost / Mitra', english: 'Friend', example: 'वह मेरा सबसे अच्छा दोस्त है।' }
    ],
    quiz: {
      question: 'What is the Hindi word for Paternal Grandfather?',
      options: ['दादा जी (Dada ji)', 'नाना जी (Nana ji)', 'पिता जी', 'भाई'],
      answerIndex: 0,
      explanation: 'Dada ji is paternal grandfather, whereas Nana ji is maternal grandfather.'
    },
    aiExplanation: 'Hindi has distinct, rich kinship terms for paternal vs maternal relatives.'
  },
  {
    id: 'vocab_food',
    sectionId: 'vocabulary',
    categoryId: 'food_nature',
    title: 'Foods, Fruits & Spices (खाना व मसाले)',
    hindiTitle: 'खाद्य पदार्थ व मसाले',
    difficulty: 'Beginner',
    itemCount: 8,
    estTime: '8 mins',
    xpReward: 80,
    progress: 0,
    isCompleted: false,
    isBookmarked: false,
    description: 'Learn names of staple Indian foods, fruits, and fragrant spices.',
    items: [
      { devanagari: 'रोटी / चपाती', roman: 'Roti / Chapati', english: 'Indian Flatbread', example: 'गरम गरम रोटी' },
      { devanagari: 'चावल', roman: 'Chawal', english: 'Rice', example: 'बासमती चावल' },
      { devanagari: 'दाल', roman: 'Daal', english: 'Lentils / Lentil Soup', example: 'दाल और चावल' },
      { devanagari: 'सब्ज़ी', roman: 'Subzi', english: 'Cooked Vegetable Dish', example: 'आलू की सब्ज़ी' },
      { devanagari: 'आम', roman: 'Aam', english: 'Mango (King of fruits)', example: 'मीठा आम' },
      { devanagari: 'हल्दी', roman: 'Haldi', english: 'Turmeric', example: 'हल्दी वाला दूध' },
      { devanagari: 'अदरक', roman: 'Adrak', english: 'Ginger', example: 'अदरक की चाय' },
      { devanagari: 'मसाला', roman: 'Masala', english: 'Spices', example: 'गरम मसाला' }
    ],
    quiz: {
      question: 'What is "Turmeric" called in Hindi?',
      options: ['हल्दी (Haldi)', 'अदरक (Adrak)', 'मसाला (Masala)', 'चावल (Chawal)'],
      answerIndex: 0,
      explanation: '"हल्दी" (Haldi) means Turmeric.'
    },
    aiExplanation: 'Staple Indian meal consists of "दाल रोटी" (Daal Roti).'
  },

  // ==========================================
  // SECTION 5: GRAMMAR MASTERY
  // ==========================================
  {
    id: 'grammar_sov',
    sectionId: 'grammar',
    categoryId: 'foundations',
    title: 'Hindi Sentence Structure (SOV Rule)',
    hindiTitle: 'वाक्य रचना (कर्ता-कर्म-क्रिया)',
    difficulty: 'Beginner',
    itemCount: 5,
    estTime: '10 mins',
    xpReward: 100,
    progress: 100,
    isCompleted: true,
    isBookmarked: true,
    description: 'Learn why Hindi verbs always come at the very END of sentences (Subject-Object-Verb).',
    items: [
      { devanagari: 'Subject + Object + Verb', roman: 'SOV Structure', english: 'English is SVO (I eat apple), Hindi is SOV (Main seb khata hoon).', example: 'मैं (Subject) सेब (Object) खाता हूँ (Verb)।' },
      { devanagari: 'मैं पानी पीता हूँ।', roman: 'Main paani peeta hoon.', english: 'I drink water.', example: 'Subject=मैं, Object=पानी, Verb=पीता हूँ' },
      { devanagari: 'वह किताब पढ़ती है।', roman: 'Vah kitab padhti hai.', english: 'She reads a book.', example: 'Verb "पढ़ती है" is at the end.' },
      { devanagari: 'हम चाय पीते हैं।', roman: 'Hum chai peete hain.', english: 'We drink tea.', example: 'Plural verb "पीते हैं".' },
      { devanagari: 'आप कहाँ रहते हैं?', roman: 'Aap kahan rehte hain?', english: 'Where do you live?', example: 'Question verb stays at the end.' }
    ],
    quiz: {
      question: 'What is the correct word order in Hindi sentences?',
      options: ['Subject - Object - Verb (SOV)', 'Subject - Verb - Object (SVO)', 'Verb - Subject - Object', 'Object - Verb - Subject'],
      answerIndex: 0,
      explanation: 'Hindi always places the Verb at the end of the sentence (SOV).'
    },
    aiExplanation: 'Unlike English ("I read a book"), Hindi places the object first ("I book read" - मैं किताब पढ़ता हूँ).'
  },
  {
    id: 'grammar_postpositions',
    sectionId: 'grammar',
    categoryId: 'advanced_grammar',
    title: 'Hindi Postpositions (में, पर, से, को, का/के/की)',
    hindiTitle: 'परसर्ग / कारक चिह्न',
    difficulty: 'Intermediate',
    itemCount: 6,
    estTime: '12 mins',
    xpReward: 110,
    progress: 40,
    isCompleted: false,
    isBookmarked: true,
    description: 'Learn how Hindi uses POST-positions (placed AFTER nouns instead of before).',
    items: [
      { devanagari: 'में (Mein)', roman: 'in / inside', english: 'In the room = कमरे में', example: 'घर में (In the house)' },
      { devanagari: 'पर (Par)', roman: 'on / at', english: 'On the table = मेज़ पर', example: 'टेबल पर (On the table)' },
      { devanagari: 'से (Se)', roman: 'from / by / with', english: 'From Delhi = दिल्ली से', example: 'भारत से (From India)' },
      { devanagari: 'को (Ko)', roman: 'to / for', english: 'To Rahul = राहुल को', example: 'उसको (To him)' },
      { devanagari: 'का / के / की (Kaa / Ke / Kee)', roman: "of / 's (possessive)", english: "Raj's house = राज का घर", example: 'भारत का नक्शा (Map of India)' },
      { devanagari: 'के लिए (Ke liye)', roman: 'for', english: 'For you = आपके लिए', example: 'आपके लिए (For you)' }
    ],
    quiz: {
      question: 'How do you say "In the house" in Hindi?',
      options: ['घर में (Ghar mein)', 'में घर', 'घर पर', 'घर से'],
      answerIndex: 0,
      explanation: '"में" comes AFTER the noun "घर" (Ghar mein).'
    },
    aiExplanation: 'Prepositions in English ("IN the room") become Postpositions in Hindi ("कमरे में").'
  }
]
