'use client';

import { useState } from 'react';
import { Plus, Check, X, Flame, Target } from 'lucide-react';
import { User, Habit, Completion } from '@/types';
import { getTodayDate } from '@/lib/utils';

interface DashboardProps {
  user: User;
  habits: Habit[];
  completions: Completion[];
  currentStreak: number;
  onRefresh: () => void;
}

export default function Dashboard({ 
  user, 
  habits, 
  completions, 
  currentStreak,
  onRefresh 
}: DashboardProps) {
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [loading, setLoading] = useState(false);

  const today = getTodayDate();
  const todayCompletions = completions.filter(c => c.date === today);
  const completedHabitIds = new Set(todayCompletions.map(c => c.habitId));

  const pendingHabits = habits.filter(h => !completedHabitIds.has(h.id));
  const doneHabits = habits.filter(h => completedHabitIds.has(h.id));

  const toggleHabit = async (habitId: string) => {
    try {
      await fetch('/api/completions/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitId })
      });
      onRefresh();
    } catch (error) {
      console.error('Toggle error:', error);
    }
  };

  const addHabit = async () => {
    if (!newHabitName.trim() || loading) return;
    
    setLoading(true);
    try {
      await fetch('/api/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newHabitName })
      });
      setNewHabitName('');
      setShowAddHabit(false);
      onRefresh();
    } catch (error) {
      console.error('Add habit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHabit = async (habitId: string) => {
    if (!confirm('Delete this habit?')) return;
    
    try {
      await fetch(`/api/habits/${habitId}`, {
        method: 'DELETE'
      });
      onRefresh();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 rounded-b-3xl text-white mb-6">
        <h2 className="text-2xl font-bold mb-2">Hello, {user.name}! 👋</h2>
        <p className="opacity-90">Let&apos;s build consistency today</p>
        
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5" />
              <span className="text-sm font-medium">Streak</span>
            </div>
            <p className="text-2xl font-bold">{currentStreak} days</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium">Today</span>
            </div>
            <p className="text-2xl font-bold">{doneHabits.length}/{habits.length}</p>
          </div>
        </div>
      </div>

      {/* Pending Habits */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Today&apos;s Habits</h3>
          <button
            onClick={() => setShowAddHabit(true)}
            className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition active:scale-95"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {pendingHabits.length === 0 && !showAddHabit && (
          <div className="text-center py-8 text-gray-400">
            <p className="mb-2">No habits yet</p>
            <p className="text-sm">Tap + to add your first habit</p>
          </div>
        )}

        <div className="space-y-3">
          {pendingHabits.map(habit => (
            <div
              key={habit.id}
              className="bg-white rounded-2xl p-4 shadow-md border-2 border-gray-100 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className="w-10 h-10 rounded-full border-3 border-gray-300 hover:border-purple-500 transition flex items-center justify-center active:scale-95"
                >
                  <div className="w-6 h-6 rounded-full bg-gray-200 group-hover:bg-purple-200 transition"></div>
                </button>
                <span className="text-gray-800 font-medium">{habit.name}</span>
              </div>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Habit Form */}
      {showAddHabit && (
        <div className="px-4 mb-6">
          <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200">
            <input
              type="text"
              placeholder="New habit name..."
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addHabit()}
              autoFocus
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-300 focus:border-purple-500 focus:outline-none mb-3 disabled:opacity-50"
            />
            <div className="flex gap-2">
              <button
                onClick={addHabit}
                disabled={loading}
                className="flex-1 bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Habit'}
              </button>
              <button
                onClick={() => {
                  setShowAddHabit(false);
                  setNewHabitName('');
                }}
                disabled={loading}
                className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition active:scale-95 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completed Habits */}
      {doneHabits.length > 0 && (
        <div className="px-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Completed ✨</h3>
          <div className="space-y-3">
            {doneHabits.map(habit => (
              <div
                key={habit.id}
                className="bg-green-50 rounded-2xl p-4 shadow-md border-2 border-green-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center active:scale-95"
                  >
                    <Check className="w-6 h-6 text-white" />
                  </button>
                  <span className="text-gray-600 line-through">{habit.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}