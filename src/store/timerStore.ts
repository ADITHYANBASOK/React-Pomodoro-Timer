import { create } from 'zustand';
import { notificationService } from '../services/notificationService';

interface TimerStore {
  timeLeft: number;
  isRunning: boolean;
  currentPhase: 'work' | 'shortBreak' | 'longBreak';
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  completedSessions: number;
  intervalId: number | null;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  updateSettings: (settings: { workDuration: number; shortBreakDuration: number; longBreakDuration: number }) => void;
  initializeAudio: () => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  timeLeft: 25 * 60,
  isRunning: false,
  currentPhase: 'work',
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  completedSessions: 0,
  intervalId: null,

  startTimer: () => {
    if (get().intervalId) {
      clearInterval(get().intervalId);
    }

    const intervalId = setInterval(() => {
      const state = get();
      if (state.timeLeft <= 0) {
        let nextPhase: 'work' | 'shortBreak' | 'longBreak';
        let nextTime: number;
        let notificationMessage: string;
        
        if (state.currentPhase === 'work') {
          const sessions = state.completedSessions + 1;
          if (sessions % 4 === 0) {
            nextPhase = 'longBreak';
            nextTime = state.longBreakDuration * 60;
            notificationMessage = 'Time for a long break!';
          } else {
            nextPhase = 'shortBreak';
            nextTime = state.shortBreakDuration * 60;
            notificationMessage = 'Time for a short break!';
          }
          set({ completedSessions: sessions });
        } else {
          nextPhase = 'work';
          nextTime = state.workDuration * 60;
          notificationMessage = 'Time to focus!';
        }
        
        notificationService.notify('Pomodoro Timer', {
          body: notificationMessage,
          icon: '/timer.svg',
        });
        
        set({
          currentPhase: nextPhase,
          timeLeft: nextTime,
        });
      } else {
        set({ timeLeft: state.timeLeft - 1 });
      }
    }, 1000);

    set({ isRunning: true, intervalId });
  },

  pauseTimer: () => {
    const { intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId);
    }
    set({ isRunning: false, intervalId: null });
  },

  resetTimer: () => {
    const { intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId);
    }
    set({
      timeLeft: get().workDuration * 60,
      isRunning: false,
      currentPhase: 'work',
      completedSessions: 0,
      intervalId: null,
    });
  },

  updateSettings: (settings) => {
    const { intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId);
    }
    set({
      workDuration: settings.workDuration,
      shortBreakDuration: settings.shortBreakDuration,
      longBreakDuration: settings.longBreakDuration,
      timeLeft: settings.workDuration * 60,
      isRunning: false,
      currentPhase: 'work',
      completedSessions: 0,
      intervalId: null,
    });
  },

  initializeAudio: () => {
    notificationService.requestPermission();
  },
}));