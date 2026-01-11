'use client';

import { Calendar, TrendingUp, Flame, Award, Target, Zap, BarChart3, Clock } from 'lucide-react';
import { MetricsData } from '@/types';

interface StatsViewProps {
  monthlyMetrics: MetricsData;
  yearlyMetrics: MetricsData;
  currentStreak: number;
}

export default function StatsView({ 
  monthlyMetrics, 
  yearlyMetrics, 
  currentStreak 
}: StatsViewProps) {
  const getConsistencyLevel = (percentage: string) => {
    const num = parseFloat(percentage);
    if (num >= 90) return { label: 'Excellent', color: 'text-green-600', emoji: '🌟' };
    if (num >= 70) return { label: 'Great', color: 'text-blue-600', emoji: '💪' };
    if (num >= 50) return { label: 'Good', color: 'text-yellow-600', emoji: '👍' };
    return { label: 'Keep Going', color: 'text-orange-600', emoji: '🚀' };
  };

  const monthlyLevel = getConsistencyLevel(monthlyMetrics.consistency);
  const yearlyLevel = getConsistencyLevel(yearlyMetrics.consistency);

  return (
    <div className="px-6 pb-24 pt-8 min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/30 to-white">
      {/* Header */}
      <div className="mb-8 animate-[slideDown_0.6s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-800">Your Stats</h2>
            <p className="text-sm text-gray-600 font-medium">Track your progress journey</p>
          </div>
        </div>
      </div>

      {/* Current Streak - Hero Card */}
      <div className="mb-6 animate-[slideUp_0.6s_ease-out]">
        <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Flame className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">Current Streak</h3>
                  <p className="text-white/80 text-sm font-medium">Keep the fire burning!</p>
                </div>
              </div>
              <div className="text-6xl animate-bounce">🔥</div>
            </div>
            
            <div className="flex items-baseline gap-3 mb-2">
              <p className="text-7xl font-black">{currentStreak}</p>
              <p className="text-3xl font-bold opacity-80">days</p>
            </div>
            <p className="text-white/90 font-semibold text-lg">
              {currentStreak === 0 && "Start today and build your streak!"}
              {currentStreak === 1 && "Great start! Keep it going tomorrow!"}
              {currentStreak > 1 && currentStreak < 7 && "You're building momentum! 💪"}
              {currentStreak >= 7 && currentStreak < 30 && "Amazing consistency! 🌟"}
              {currentStreak >= 30 && "You're unstoppable! 🚀"}
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Stats */}
      <div className="mb-6 animate-[slideUp_0.7s_ease-out]">
        <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Calendar className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-black">Last 30 Days</h3>
                <p className="text-white/80 text-sm font-medium">Your recent performance</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5" />
                  <p className="text-sm font-bold opacity-90">Active Days</p>
                </div>
                <p className="text-5xl font-black mb-1">{monthlyMetrics.uniqueDays}</p>
                <p className="text-sm opacity-80 font-medium">out of 30 days</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5" />
                  <p className="text-sm font-bold opacity-90">Consistency</p>
                </div>
                <p className="text-5xl font-black mb-1">{monthlyMetrics.consistency}%</p>
                <p className="text-sm opacity-80 font-medium">completion rate</p>
              </div>
            </div>
            
            {/* Consistency badge */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{monthlyLevel.emoji}</div>
                <div>
                  <p className="font-black text-lg">Performance Level</p>
                  <p className="text-sm opacity-90 font-medium">{monthlyLevel.label}</p>
                </div>
              </div>
              <Award className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Yearly Stats */}
      <div className="mb-6 animate-[slideUp_0.8s_ease-out]">
        <div className="bg-gradient-to-br from-orange-500 via-pink-500 to-red-600 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-300/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <TrendingUp className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-black">Last 365 Days</h3>
                <p className="text-white/80 text-sm font-medium">Your yearly journey</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5" />
                  <p className="text-sm font-bold opacity-90">Active Days</p>
                </div>
                <p className="text-5xl font-black mb-1">{yearlyMetrics.uniqueDays}</p>
                <p className="text-sm opacity-80 font-medium">out of 365 days</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5" />
                  <p className="text-sm font-bold opacity-90">Consistency</p>
                </div>
                <p className="text-5xl font-black mb-1">{yearlyMetrics.consistency}%</p>
                <p className="text-sm opacity-80 font-medium">completion rate</p>
              </div>
            </div>
            
            {/* Yearly badge */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{yearlyLevel.emoji}</div>
                <div>
                  <p className="font-black text-lg">Yearly Performance</p>
                  <p className="text-sm opacity-90 font-medium">{yearlyLevel.label}</p>
                </div>
              </div>
              <Award className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick insights */}
      <div className="animate-[fadeIn_1s_ease-out]">
        <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          Quick Insights
        </h3>
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">Daily Average</p>
                <p className="text-sm text-gray-600 font-medium">
                  {yearlyMetrics.uniqueDays > 0 
                    ? `You've been active ${(yearlyMetrics.uniqueDays / 365 * 100).toFixed(0)}% of the year`
                    : 'Start tracking to see your average'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">Streak Status</p>
                <p className="text-sm text-gray-600 font-medium">
                  {currentStreak === 0 && 'Start today to begin your streak!'}
                  {currentStreak > 0 && currentStreak < 7 && `${7 - currentStreak} more days to reach 1 week!`}
                  {currentStreak >= 7 && currentStreak < 30 && `${30 - currentStreak} more days to reach 1 month!`}
                  {currentStreak >= 30 && 'Amazing! You have a monthly streak! 🎉'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}