// src/store/useGameStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useGameStore = create(
  persist(
    (set, get) => ({
      // User Progress
      currentLevel: 1,
      completedLevels: [],
      points: 0,
      stars: 0,
      achievements: [],

      // Game State
      currentSentence: [],
      availableWords: [],
      levelData: null,
      isCorrect: false,
      isWrong: false,
      hintsUsed: 0,

      // Game Actions
      setCurrentLevel: (level) => set({ currentLevel: level }),

      completeLevel: (levelId, score, stars) => {
        const { completedLevels, points } = get();
        const existingLevel = completedLevels.find((l) => l.id === levelId);

        // Update level data if it exists, or add new entry
        const updatedLevels = existingLevel
          ? completedLevels.map((l) =>
              l.id === levelId
                ? {
                    ...l,
                    score: Math.max(l.score, score),
                    stars: Math.max(l.stars, stars),
                  }
                : l
            )
          : [
              ...completedLevels,
              {
                id: levelId,
                score,
                stars,
                completedAt: new Date().toISOString(),
              },
            ];

        set({
          completedLevels: updatedLevels,
          points: points + score,
        });
      },

      startLevel: (levelData) =>
        set({
          levelData,
          availableWords: [...levelData.words], // Create a copy to avoid mutations
          currentSentence: [],
          isCorrect: false,
          isWrong: false,
          hintsUsed: 0,
        }),

      addWordToSentence: (word) => {
        const { currentSentence, availableWords } = get();
        const newAvailableWords = availableWords.filter((w) => w !== word);

        set({
          currentSentence: [...currentSentence, word],
          availableWords: newAvailableWords,
          isWrong: false,
        });
      },

      removeWordFromSentence: (index) => {
        const { currentSentence, availableWords } = get();
        const wordToRemove = currentSentence[index];
        const newSentence = [...currentSentence];
        newSentence.splice(index, 1);

        set({
          currentSentence: newSentence,
          availableWords: [...availableWords, wordToRemove],
          isWrong: false,
        });
      },

      checkSentence: () => {
        const { currentSentence, levelData } = get();
        const userSentence = currentSentence.join(" ");

        // Check against correct sentence
        if (
          levelData.correctSentence &&
          userSentence.toLowerCase() === levelData.correctSentence.toLowerCase()
        ) {
          set({ isCorrect: true });
          return true;
        }

        // Check against multiple correct sentences
        if (
          levelData.correctSentences &&
          levelData.correctSentences.some(
            (sentence) => userSentence.toLowerCase() === sentence.toLowerCase()
          )
        ) {
          set({ isCorrect: true });
          return true;
        }

        // Pattern-based validation for advanced levels
        if (levelData.patterns && levelData.wordTags) {
          const wordArray = userSentence.split(" ");
          const tagSequence = wordArray.map((word) => {
            return levelData.wordTags[word]?.type || "UNKNOWN";
          });

          const isPatternMatch = levelData.patterns.some((pattern) => {
            const patternTags = pattern.split(" ");

            if (tagSequence.length !== patternTags.length) return false;

            for (let i = 0; i < tagSequence.length; i++) {
              if (tagSequence[i] !== patternTags[i]) return false;
            }

            return true;
          });

          if (isPatternMatch) {
            set({ isCorrect: true });
            return true;
          }
        }

        // If no validation passed, sentence is wrong
        set({ isWrong: true });
        return false;
      },

      resetSentence: () =>
        set({
          currentSentence: [],
          availableWords: [...get().levelData.words],
          isWrong: false,
        }),

      useHint: () => set({ hintsUsed: get().hintsUsed + 1 }),

      // Achievement Actions
      unlockAchievement: (achievementId) => {
        const { achievements } = get();
        if (!achievements.includes(achievementId)) {
          set({ achievements: [...achievements, achievementId] });
        }
      },

      // Reset Game
      resetGame: () =>
        set({
          currentLevel: 1,
          completedLevels: [],
          points: 0,
          stars: 0,
          achievements: [],
        }),
    }),
    {
      name: "sentence-master-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useGameStore;
