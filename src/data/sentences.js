// src/data/sentences.js

// Beginner levels (simple validation)
const basicsSentences = [
  {
    id: 'basics-1',
    level: 1,
    category: 'basics',
    difficulty: 'beginner',
    instructions: "Create a sentence about going to school",
    words: ["day", "She", "school", "goes", "to", "every"],
    correctSentence: "She goes to school every day",
    grammarTip: "Use 'every day' (two words) when referring to each day.",
    example: "I exercise every day.",
    points: 100,
    timeLimit: 60
  },
  {
    id: 'basics-2',
    level: 2,
    category: 'basics',
    difficulty: 'beginner',
    instructions: "Create a sentence about reading",
    words: ["books", "I", "read", "interesting"],
    correctSentence: "I read interesting books",
    grammarTip: "Adjectives (like 'interesting') come before the noun in English.",
    example: "She reads popular novels.",
    points: 100,
    timeLimit: 60
  },
  {
    id: 'basics-3',
    level: 3,
    category: 'basics',
    difficulty: 'beginner',
    instructions: "Create a sentence about the weather",
    words: ["today", "sunny", "It", "is"],
    correctSentence: "It is sunny today",
    grammarTip: "We often use 'It is' to describe the weather.",
    example: "It is rainy today.",
    points: 100,
    timeLimit: 60
  }
];

// Intermediate levels (multiple valid answers)
const dailySentences = [
  {
    id: 'daily-1',
    level: 1,
    category: 'daily',
    difficulty: 'intermediate',
    instructions: "Create a sentence about morning coffee",
    words: ["coffee", "Every", "morning", "drink", "I"],
    correctSentences: [
      "Every morning I drink coffee",
      "I drink coffee every morning"
    ],
    grammarTip: "Time expressions (like 'every morning') can often go at the beginning or the end of a sentence.",
    example: "Every evening I take a walk. / I take a walk every evening.",
    points: 150,
    timeLimit: 60
  },
  {
    id: 'daily-2',
    level: 2,
    category: 'daily',
    difficulty: 'intermediate',
    instructions: "Create a sentence about watching TV",
    words: ["TV", "watch", "usually", "after", "work", "I"],
    correctSentences: [
      "I usually watch TV after work",
      "After work I usually watch TV"
    ],
    grammarTip: "The adverb 'usually' typically comes before the main verb or after the verb 'to be'.",
    example: "She usually eats dinner at 7 PM. / She is usually tired in the evening.",
    points: 150,
    timeLimit: 60
  },
  {
    id: 'daily-3',
    level: 3,
    category: 'daily',
    difficulty: 'intermediate',
    instructions: "Create a sentence about weekend activities",
    words: ["weekend", "friends", "my", "with", "spend", "time", "I", "the"],
    correctSentences: [
      "I spend time with my friends on the weekend",
      "On the weekend I spend time with my friends"
    ],
    grammarTip: "We use 'on the weekend' in American English and 'at the weekend' in British English.",
    example: "He plays soccer on the weekend. / They relax at the weekend.",
    points: 150,
    timeLimit: 75
  }
];

// Advanced levels (pattern-based validation)
const businessSentences = [
  {
    id: 'business-1',
    level: 1,
    category: 'business',
    difficulty: 'advanced',
    instructions: "Create a sentence about reviewing a document",
    words: ["carefully", "John", "the document", "reviewed"],
    wordTags: {
      "carefully": { type: "ADVERB" },
      "John": { type: "SUBJECT" },
      "the document": { type: "OBJECT" },
      "reviewed": { type: "VERB" }
    },
    patterns: [
      "[SUBJECT] [VERB] [OBJECT] [ADVERB]",
      "[SUBJECT] [ADVERB] [VERB] [OBJECT]",
      "[ADVERB] [SUBJECT] [VERB] [OBJECT]"
    ],
    grammarTip: "Adverbs like 'carefully' can be placed in different positions to add variety to your sentences.",
    example: "She quickly finished the project. / She finished the project quickly. / Quickly, she finished the project.",
    points: 200,
    timeLimit: 90
  },
  {
    id: 'business-2',
    level: 2,
    category: 'business',
    difficulty: 'advanced',
    instructions: "Create a sentence about scheduling a meeting",
    words: ["next week", "the team", "a meeting", "scheduled", "the manager"],
    wordTags: {
      "next week": { type: "TIME" },
      "the team": { type: "OBJECT" },
      "a meeting": { type: "OBJECT" },
      "scheduled": { type: "VERB" },
      "the manager": { type: "SUBJECT" }
    },
    patterns: [
      "[SUBJECT] [VERB] [OBJECT] [TIME]",
      "[SUBJECT] [VERB] [OBJECT] for [OBJECT] [TIME]",
      "[TIME] [SUBJECT] [VERB] [OBJECT]"
    ],
    grammarTip: "In business English, it's common to use the active voice to clearly identify who did what.",
    example: "The CEO approved the budget yesterday. / Yesterday, the CEO approved the budget.",
    points: 200,
    timeLimit: 90
  },
  {
    id: 'business-3',
    level: 3,
    category: 'business',
    difficulty: 'advanced',
    instructions: "Create a sentence about giving a presentation",
    words: ["on", "the new product", "confidently", "presented", "she", "to clients"],
    wordTags: {
      "on": { type: "PREP" },
      "the new product": { type: "TOPIC" },
      "confidently": { type: "ADVERB" },
      "presented": { type: "VERB" },
      "she": { type: "SUBJECT" },
      "to clients": { type: "AUDIENCE" }
    },
    patterns: [
      "[SUBJECT] [ADVERB] [VERB] [PREP] [TOPIC] [AUDIENCE]",
      "[SUBJECT] [VERB] [PREP] [TOPIC] [AUDIENCE] [ADVERB]",
      "[ADVERB], [SUBJECT] [VERB] [PREP] [TOPIC] [AUDIENCE]"
    ],
    grammarTip: "When describing presentations, you can vary your sentence structure to emphasize different aspects.",
    example: "He eloquently spoke about climate change to the board. / He spoke about climate change to the board eloquently.",
    points: 250,
    timeLimit: 100
  }
];

// Academic sentences
const academicSentences = [
  {
    id: 'academic-1',
    level: 1,
    category: 'academic',
    difficulty: 'advanced',
    instructions: "Create a sentence about a scientific study",
    words: ["the researchers", "conducted", "a comprehensive study", "on climate change", "last year"],
    wordTags: {
      "the researchers": { type: "SUBJECT" },
      "conducted": { type: "VERB" },
      "a comprehensive study": { type: "OBJECT" },
      "on climate change": { type: "TOPIC" },
      "last year": { type: "TIME" }
    },
    patterns: [
      "[SUBJECT] [VERB] [OBJECT] [TOPIC] [TIME]",
      "[TIME], [SUBJECT] [VERB] [OBJECT] [TOPIC]",
      "[SUBJECT] [VERB], [TIME], [OBJECT] [TOPIC]"
    ],
    grammarTip: "Academic writing typically uses more formal vocabulary and complex sentence structures.",
    example: "The scientists published groundbreaking research on quantum physics in the journal.",
    points: 200,
    timeLimit: 90
  }
];

// Idioms & Expressions
const idiomSentences = [
  {
    id: 'idioms-1',
    level: 1,
    category: 'idioms',
    difficulty: 'intermediate',
    instructions: "Create a sentence with the idiom 'break the ice'",
    words: ["to", "break", "the", "ice", "he", "told", "a", "joke"],
    correctSentences: [
      "He told a joke to break the ice",
      "To break the ice he told a joke"
    ],
    grammarTip: "The idiom 'break the ice' means to do or say something to relieve initial tension or awkwardness.",
    example: "She asked an interesting question to break the ice at the meeting.",
    points: 150,
    timeLimit: 60
  }
];

// Combine all sentence data
const allSentences = [
  ...basicsSentences,
  ...dailySentences,
  ...businessSentences,
  ...academicSentences,
  ...idiomSentences
];

export const getSentencesByCategory = (category) => {
  return allSentences.filter(sentence => sentence.category === category);
};

export const getSentenceById = (id) => {
  return allSentences.find(sentence => sentence.id === id);
};

export default allSentences;