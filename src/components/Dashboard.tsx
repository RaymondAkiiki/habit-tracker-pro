'use client';

import { useState } from 'react';
import { Plus, Check, X, Flame, Target, Sparkles, Zap, TrendingUp, ChevronRight } from 'lucide-react';
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
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const today = getTodayDate();
  const todayCompletions = completions.filter(c => c.date === today);
  const completedHabitIds = new Set(todayCompletions.map(c => c.habitId));

  const pendingHabits = habits.filter(h => !completedHabitIds.has(h.id));
  const doneHabits = habits.filter(h => completedHabitIds.has(h.id));

  const progress = habits.length > 0 ? (doneHabits.length / habits.length) * 100 : 0;

  const toggleHabit = async (habitId: string) => {
    setCompletingId(habitId);
    try {
      await fetch('/api/completions/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitId })
      });
      
      // Delay for animation
      setTimeout(() => {
        setCompletingId(null);
        onRefresh();
      }, 600);
    } catch (error) {
      console.error('Toggle error:', error);
      setCompletingId(null);
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
    if (!confirm('Delete this habit? This action cannot be undone.')) return;
    
    setDeletingId(habitId);
    try {
      await fetch(`/api/habits/${habitId}`, {
        method: 'DELETE'
      });
      
      setTimeout(() => {
        setDeletingId(null);
        onRefresh();
      }, 300);
    } catch (error) {
      console.error('Delete error:', error);
      setDeletingId(null);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="pb-24 min-h-screen bg-gradient-to-b from-gray-50 via-purple-50/30 to-white">
      {/* Animated Header with glassmorphism */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-6 pt-8 pb-8 rounded-b-[3rem] text-white mb-6 shadow-2xl relative overflow-hidden">
        {/* Decorative animated elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative z-10">
          {/* Greeting section */}
          <div className="mb-6 animate-[slideDown_0.6s_ease-out]">
            <p className="text-white/80 text-sm font-semibold mb-1">{getGreeting()}</p>
            <h2 className="text-4xl font-black mb-2 flex items-center gap-3">
              {user.name}
              <span className="animate-wave inline-block text-3xl">👋</span>
            </h2>
            <p className="text-white/90 font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Let's build consistency today
            </p>
          </div>
          
          {/* Stats cards with progress bar */}
          <div className="space-y-4 animate-[slideUp_0.6s_ease-out]">
            {/* Progress bar */}
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold">Today's Progress</span>
                <span className="text-2xl font-black">{Math.round(progress)}%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                </div>
              </div>
              <p className="text-xs text-white/70 mt-2 font-medium">
                {doneHabits.length} of {habits.length} habits completed
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-orange-500/30 rounded-xl">
                    <Flame className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold">Streak</span>
                </div>
                <p className="text-3xl font-black">{currentStreak}</p>
                <p className="text-xs text-white/70 font-medium mt-1">days strong 🔥</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-green-500/30 rounded-xl">
                    <Target className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold">Completed</span>
                </div>
                <p className="text-3xl font-black">{doneHabits.length}/{habits.length}</p>
                <p className="text-xs text-white/70 font-medium mt-1">today's goal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Habits Section */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-5 animate-[fadeIn_0.8s_ease-out]">
          <div>
            <h3 className="text-2xl font-black text-gray-800 flex items-center gap-2">
              Today's Habits
              {pendingHabits.length > 0 && (
                <span className="text-lg px-3 py-1 bg-purple-100 text-purple-600 rounded-full font-bold">
                  {pendingHabits.length}
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-500 font-medium mt-1">Complete your daily goals</p>
          </div>
          <button
            onClick={() => setShowAddHabit(true)}
            className="p-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 group"
          >
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Empty state */}
        {pendingHabits.length === 0 && !showAddHabit && doneHabits.length === 0 && (
          <div className="text-center py-16 animate-[fadeIn_0.8s_ease-out]">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-purple-500" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Start Your Journey</h4>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Add your first habit and begin building consistency today!
            </p>
            <button
              onClick={() => setShowAddHabit(true)}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Create First Habit
            </button>
          </div>
        )}

        {pendingHabits.length === 0 && !showAddHabit && doneHabits.length > 0 && (
          <div className="text-center py-12 animate-[fadeIn_0.8s_ease-out]">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-2">All Done! 🎉</h4>
            <p className="text-gray-600 font-medium">
              You've completed all your habits for today!
            </p>
          </div>
        )}

        {/* Pending habits list */}
        <div className="space-y-3">
          {pendingHabits.map((habit, index) => (
            <div
              key={habit.id}
              className={`bg-white rounded-3xl p-5 shadow-lg border-2 border-gray-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group animate-[slideIn_0.5s_ease-out] ${
                deletingId === habit.id ? 'animate-[slideOut_0.3s_ease-out]' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    disabled={completingId === habit.id}
                    className="relative w-14 h-14 rounded-2xl border-3 border-gray-300 hover:border-purple-500 transition-all duration-300 flex items-center justify-center active:scale-90 disabled:opacity-50 group-hover:scale-110 bg-gradient-to-br from-gray-50 to-white"
                  >
                    {completingId === habit.id ? (
                      <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <div className="w-7 h-7 rounded-xl bg-gray-200 group-hover:bg-gradient-to-br group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300"></div>
                    )}
                  </button>
                  <div className="flex-1">
                    <span className="text-gray-800 font-bold text-lg block group-hover:text-purple-600 transition-colors">
                      {habit.name}
                    </span>
                    <p className="text-xs text-gray-500 font-medium mt-1">Tap to complete</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Habit Form */}
      {showAddHabit && (
        <div className="px-6 mb-6 animate-[slideDown_0.4s_ease-out]">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border-2 border-purple-200 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500 rounded-xl">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-800">Add New Habit</h4>
            </div>
            <input
              type="text"
              placeholder="e.g., Drink 8 glasses of water"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addHabit()}
              autoFocus
              disabled={loading}
              className="w-full px-5 py-4 rounded-2xl border-2 border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 mb-4 disabled:opacity-50 text-gray-800 font-semibold placeholder:text-gray-400 placeholder:font-normal bg-white shadow-sm"
            />
            <div className="flex gap-3">
              <button
                onClick={addHabit}
                disabled={loading || !newHabitName.trim()}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Add Habit</span>
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowAddHabit(false);
                  setNewHabitName('');
                }}
                disabled={loading}
                className="px-6 bg-white text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 active:scale-95 disabled:opacity-50 border-2 border-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completed Habits Section */}
      {doneHabits.length > 0 && (
        <div className="px-6 animate-[fadeIn_0.8s_ease-out]">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xl font-black text-gray-800">Completed Today</h3>
            <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
          </div>
          <div className="space-y-3">
            {doneHabits.map((habit, index) => (
              <div
                key={habit.id}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-5 shadow-lg border-2 border-green-200 animate-[slideIn_0.5s_ease-out]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center active:scale-90 transition-transform shadow-lg"
                  >
                    <Check className="w-7 h-7 text-white font-bold" />
                  </button>
                  <div className="flex-1">
                    <span className="text-gray-600 line-through font-semibold text-lg block">
                      {habit.name}
                    </span>
                    <p className="text-xs text-green-600 font-bold mt-1 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Completed
                    </p>
                  </div>
                  <div className="text-2xl animate-bounce">✨</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100px);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-20deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}