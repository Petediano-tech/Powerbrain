
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SessionType = 'focus' | 'break';

interface PomodoroState {
  isEnabled: boolean;
  focusDuration: number; // in minutes
  breakDuration: number; // in minutes
  isActive: boolean;
  timeLeft: number; // in seconds
  sessionType: SessionType;
}

interface PomodoroActions {
  setEnabled: (enabled: boolean) => void;
  setFocusDuration: (duration: number) => void;
  setBreakDuration: (duration: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: (switchToNext?: boolean) => void;
  tick: () => void;
  getProgress: () => number;
}

const initialState: PomodoroState = {
  isEnabled: false,
  focusDuration: 25,
  breakDuration: 5,
  isActive: false,
  timeLeft: 25 * 60,
  sessionType: 'focus',
};

export const usePomodoroStore = create<PomodoroState & PomodoroActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setEnabled: (enabled) => {
        if (!enabled) {
          get().pauseTimer();
        }
        set({ isEnabled: enabled });
      },
      
      setFocusDuration: (duration) => {
        set({ focusDuration: duration });
        if (!get().isActive && get().sessionType === 'focus') {
          set({ timeLeft: duration * 60 });
        }
      },
      
      setBreakDuration: (duration) => {
        set({ breakDuration: duration });
        if (!get().isActive && get().sessionType === 'break') {
          set({ timeLeft: duration * 60 });
        }
      },
      
      startTimer: () => set({ isActive: true }),
      
      pauseTimer: () => set({ isActive: false }),
      
      resetTimer: (switchToNext = false) => {
        const { sessionType, focusDuration, breakDuration } = get();
        let nextSessionType: SessionType = sessionType;
        let nextTimeLeft: number;

        if (switchToNext) {
            nextSessionType = sessionType === 'focus' ? 'break' : 'focus';
        }
        
        if (nextSessionType === 'focus') {
            nextTimeLeft = focusDuration * 60;
        } else {
            nextTimeLeft = breakDuration * 60;
        }

        set({
          isActive: false,
          sessionType: nextSessionType,
          timeLeft: nextTimeLeft,
        });
      },

      tick: () => {
        if (get().timeLeft > 0) {
          set((state) => ({ timeLeft: state.timeLeft - 1 }));
        } else {
          // Timer reached zero, switch session and keep it running
          const { sessionType, focusDuration, breakDuration } = get();
          const nextSessionType = sessionType === 'focus' ? 'break' : 'focus';
          const nextTimeLeft = nextSessionType === 'focus' ? focusDuration * 60 : breakDuration * 60;
          set({
              sessionType: nextSessionType,
              timeLeft: nextTimeLeft,
              isActive: true, // Keep it running
          });
        }
      },

      getProgress: () => {
        const { timeLeft, sessionType, focusDuration, breakDuration } = get();
        const totalDuration = sessionType === 'focus' ? focusDuration * 60 : breakDuration * 60;
        if (totalDuration === 0) return 100;
        const progress = ((totalDuration - timeLeft) / totalDuration) * 100;
        return progress;
      }
    }),
    {
      name: 'powerbrain-pomodoro-storage', 
      storage: createJSONStorage(() => localStorage), 
      // Only persist settings, not the timer's active state
      partialize: (state) => ({
        isEnabled: state.isEnabled,
        focusDuration: state.focusDuration,
        breakDuration: state.breakDuration,
      }),
       // This function is called when rehydrating the state
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (error) {
            console.error("Failed to rehydrate pomodoro store", error);
          } else if (state) {
            // After rehydrating settings, reset the timer to a clean initial state
            state.timeLeft = state.focusDuration * 60;
            state.isActive = false;
            state.sessionType = 'focus';
          }
        }
      }
    }
  )
);
