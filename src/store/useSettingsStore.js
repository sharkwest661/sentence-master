// src/store/useSettingsStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useSettingsStore = create(
  persist(
    (set) => ({
      soundEnabled: true,
      vibrationEnabled: true,
      showHints: true,
      darkMode: false,
      difficulty: "normal", // 'easy', 'normal', 'hard'

      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleVibration: () =>
        set((state) => ({ vibrationEnabled: !state.vibrationEnabled })),
      toggleHints: () => set((state) => ({ showHints: !state.showHints })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setDifficulty: (difficulty) => set({ difficulty }),
    }),
    {
      name: "sentence-master-settings",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useSettingsStore;
