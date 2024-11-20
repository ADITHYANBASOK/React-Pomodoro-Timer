import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import { useTimerStore } from '../store/timerStore';

export default function Controls() {
  const { isRunning, startTimer, pauseTimer, resetTimer } = useTimerStore();

  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={() => isRunning ? pauseTimer() : startTimer()}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/30"
      >
        {isRunning ? <FaPause /> : <FaPlay />}
      </button>
      <button
        onClick={resetTimer}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/30"
      >
        <FaRedo />
      </button>
    </div>
  );
}