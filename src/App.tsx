import { useEffect } from 'react';
import Timer from './components/Timer';
import Controls from './components/Controls';
import Settings from './components/Settings';
import { useTimerStore } from './store/timerStore';

function App() {
  const { initializeAudio } = useTimerStore();

  useEffect(() => {
    initializeAudio();
  }, [initializeAudio]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <div className="container mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Pomodoro Timer</h1>
        <div className="w-full rounded-2xl bg-white/10 p-8 backdrop-blur-lg">
          <Timer />
          <Controls />
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default App;