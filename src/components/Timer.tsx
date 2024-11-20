import { useTimerStore } from '../store/timerStore';
import { formatTime } from '../utils/timeUtils';

export default function Timer() {
  const { timeLeft, currentPhase } = useTimerStore();
  
  return (
    <div className="text-center">
      <div className="mb-4 text-lg font-medium opacity-90">
        {currentPhase === 'work' ? 'Focus Time' : 
         currentPhase === 'shortBreak' ? 'Short Break' : 'Long Break'}
      </div>
      <div className="mb-8 text-8xl font-bold tracking-tight">
        {formatTime(timeLeft)}
      </div>
    </div>
  );
}