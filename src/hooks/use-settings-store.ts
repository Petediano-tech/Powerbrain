
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SettingsState {
  // Accessibility
  font: string;
  fontSize: number;
  
  // Notifications
  dailyQuotes: boolean;
  quizReminders: boolean;

  // Actions
  setFont: (font: string) => void;
  setFontSize: (size: number) => void;
  setDailyQuotes: (enabled: boolean) => void;
  setQuizReminders: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Default values
      font: 'poppins',
      fontSize: 16,
      dailyQuotes: true,
      quizReminders: true,

      // Setter functions
      setFont: (font) => set({ font }),
      setFontSize: (size) => set({ fontSize: size }),
      setDailyQuotes: (enabled) => set({ dailyQuotes: enabled }),
      setQuizReminders: (enabled) => set({ quizReminders: enabled }),
    }),
    {
      name: 'powerbrain-user-settings', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
