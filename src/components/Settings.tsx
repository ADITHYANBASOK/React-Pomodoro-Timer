import { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { useTimerStore } from '../store/timerStore';

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const { workDuration, shortBreakDuration, longBreakDuration, updateSettings } = useTimerStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateSettings({
      workDuration: Number(formData.get('workDuration')),
      shortBreakDuration: Number(formData.get('shortBreakDuration')),
      longBreakDuration: Number(formData.get('longBreakDuration')),
    });
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mt-6 flex items-center justify-center space-x-2 rounded-lg bg-white/20 px-4 py-2 text-sm transition-all hover:bg-white/30"
      >
        <FaCog /> <span>Settings</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-gray-800 p-6">
            <h2 className="mb-4 text-xl font-bold">Timer Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm">Work Duration (minutes)</label>
                <input
                  type="number"
                  name="workDuration"
                  defaultValue={workDuration}
                  className="w-full rounded bg-gray-700 p-2"
                />
              </div>
              <div>
                <label className="block text-sm">Short Break (minutes)</label>
                <input
                  type="number"
                  name="shortBreakDuration"
                  defaultValue={shortBreakDuration}
                  className="w-full rounded bg-gray-700 p-2"
                />
              </div>
              <div>
                <label className="block text-sm">Long Break (minutes)</label>
                <input
                  type="number"
                  name="longBreakDuration"
                  defaultValue={longBreakDuration}
                  className="w-full rounded bg-gray-700 p-2"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded bg-gray-600 px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-purple-600 px-4 py-2"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}