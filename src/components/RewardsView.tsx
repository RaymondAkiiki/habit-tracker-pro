'use client';

import { Trophy, Star, Flame, Sprout, Crown, Zap, Award, Lock, Sparkles, Target } from 'lucide-react';
import { Medal, MetricsData } from '@/types';

interface RewardsViewProps {
  currentStreak: number;
  monthlyMetrics: MetricsData;
}

export default function RewardsView({ currentStreak, monthlyMetrics }: RewardsViewProps) {
  const medals: Medal[] = [
    { name: 'First Step', icon: Sprout, threshold: 1, color: 'from-green-400 to-emerald-500', earned: currentStreak >= 1 },
    { name: 'Bronze Warrior', icon: Trophy, threshold: 7, color: 'from-orange-600 to-orange-800', earned: currentStreak >= 7 },
    { name: 'Silver Champion', icon: Trophy, threshold: 30, color: 'from-gray-400 to-gray-600', earned: currentStreak >= 30 },
    { name: 'Gold Legend', icon: Crown, threshold: 90, color: 'from-yellow-400 to-yellow-600', earned: currentStreak >= 90 },
    { name: 'Diamond Elite', icon: Crown, threshold: 180, color: 'from-cyan-400 to-blue-500', earned: currentStreak >= 180 },
    { name: 'Platinum Master', icon: Crown, threshold: 365, color: 'from-purple-400 to-purple-600', earned: currentStreak >= 365 }
  ];

  const earnedCount = medals.filter(m => m.earned).length;
  const nextMedal = medals.find(m => !m.earned);

  return (
    <div className="px-6 pb-24 pt-8 min-h-screen bg-gradient-to-b from-gray-50 via-purple-50/30 to-white">
      {/* Header */}
      <div className="mb-8 animate-[slideDown_0.6s_ease-out]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-800">Achievements</h2>
              <p className="text-sm text-gray-600 font-medium">Your trophy collection</p>
            </div>
          </div>
          <div className="text-center bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl px-5 py-3 shadow-lg">
            <p className="text-3xl font-black">{earnedCount}</p>
            <p className="text-xs font-bold opacity-90">unlocked</p>
          </div>
        </div>

        {/* Progress to next medal */}
        {nextMedal && (
          <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Next Achievement</p>
                  <p className="text-xs text-gray-600 font-medium">{nextMedal.name}</p>
                </div>
              </div>
              <p className="text-2xl font-black text-purple-600">{nextMedal.threshold - currentStreak}</p>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min((currentStreak / nextMedal.threshold) * 100, 100)}%` }}
              >
                <div className="h-full bg-white/30 animate-shimmer"></div>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-2">
              {nextMedal.threshold - currentStreak} more {nextMedal.threshold - currentStreak === 1 ? 'day' : 'days'} to unlock!
            </p>
          </div>
        )}
      </div>

      {/* Medals Grid */}
      <div className="mb-8">
        <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2 animate-[slideUp_0.7s_ease-out]">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Streak Milestones
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {medals.map((medal, idx) => {
            const Icon = medal.icon;
            return (
              <div
                key={idx}
                className={`rounded-3xl p-6 text-center transition-all duration-500 transform hover:scale-105 animate-[slideUp_0.5s_ease-out] ${
                  medal.earned
                    ? `bg-gradient-to-br ${medal.color} text-white shadow-2xl border-2 border-white`
                    : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative inline-block mb-4">
                  {medal.earned ? (
                    <div className="relative">
                      <Icon className="w-16 h-16 mx-auto drop-shadow-lg" />
                      <Sparkles className="w-5 h-5 text-yellow-300 absolute -top-1 -right-1 animate-ping" />
                    </div>
                  ) : (
                    <div className="relative">
                      <Icon className="w-16 h-16 mx-auto opacity-30" />
                      <Lock className="w-6 h-6 absolute bottom-0 right-0 opacity-50" />
                    </div>
                  )}
                </div>
                <p className="font-black text-lg mb-1">{medal.name}</p>
                <p className={`text-sm font-semibold mb-2 ${medal.earned ? 'opacity-90' : 'opacity-60'}`}>
                  {medal.threshold} day streak
                </p>
                {medal.earned ? (
                  <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    <span className="text-xs font-bold">UNLOCKED</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full">
                    <Lock className="w-3 h-3 text-gray-500" />
                    <span className="text-xs font-bold text-gray-600">LOCKED</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Special Badges */}
      <div className="animate-[fadeIn_0.8s_ease-out]">
        <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
          <Star className="w-6 h-6 text-purple-500" />
          Special Badges
        </h3>
        <div className="space-y-4">
          {/* Perfect Month Badge */}
          <div className={`rounded-3xl p-6 transition-all duration-500 transform hover:scale-105 ${
            parseFloat(monthlyMetrics.consistency) === 100
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl border-2 border-white'
              : 'bg-white border-2 border-gray-200 shadow-lg'
          }`}>
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-2xl ${
                parseFloat(monthlyMetrics.consistency) === 100
                  ? 'bg-white/20 backdrop-blur-sm'
                  : 'bg-purple-100'
              }`}>
                <Crown className={`w-12 h-12 ${
                  parseFloat(monthlyMetrics.consistency) === 100 ? 'text-white' : 'text-purple-500'
                }`} />
              </div>
              <div className="flex-1">
                <p className={`font-black text-xl mb-1 ${
                  parseFloat(monthlyMetrics.consistency) === 100 ? 'text-white' : 'text-gray-800'
                }`}>
                  Perfect Month
                </p>
                <p className={`text-sm font-semibold ${
                  parseFloat(monthlyMetrics.consistency) === 100 ? 'text-white/90' : 'text-gray-600'
                }`}>
                  Complete 100% of habits this month
                </p>
              </div>
              {parseFloat(monthlyMetrics.consistency) === 100 ? (
                <div className="flex flex-col items-center gap-1">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                  <span className="text-xs font-bold">EARNED</span>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-3xl font-black text-purple-600">{monthlyMetrics.consistency}%</p>
                  <p className="text-xs font-bold text-gray-500">progress</p>
                </div>
              )}
            </div>
          </div>

          {/* Star Performer Badge */}
          <div className={`rounded-3xl p-6 transition-all duration-500 transform hover:scale-105 ${
            parseFloat(monthlyMetrics.consistency) >= 90
              ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-2xl border-2 border-white'
              : 'bg-white border-2 border-gray-200 shadow-lg'
          }`}>
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-2xl ${
                parseFloat(monthlyMetrics.consistency) >= 90
                  ? 'bg-white/20 backdrop-blur-sm'
                  : 'bg-blue-100'
              }`}>
                <Star className={`w-12 h-12 ${
                  parseFloat(monthlyMetrics.consistency) >= 90 ? 'text-white' : 'text-blue-500'
                }`} />
              </div>
              <div className="flex-1">
                <p className={`font-black text-xl mb-1 ${
                  parseFloat(monthlyMetrics.consistency) >= 90 ? 'text-white' : 'text-gray-800'
                }`}>
                  Star Performer
                </p>
                <p className={`text-sm font-semibold ${
                  parseFloat(monthlyMetrics.consistency) >= 90 ? 'text-white/90' : 'text-gray-600'
                }`}>
                  Maintain 90%+ consistency this month
                </p>
              </div>
              {parseFloat(monthlyMetrics.consistency) >= 90 ? (
                <div className="flex flex-col items-center gap-1">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                  <span className="text-xs font-bold">EARNED</span>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-3xl font-black text-blue-600">{monthlyMetrics.consistency}%</p>
                  <p className="text-xs font-bold text-gray-500">progress</p>
                </div>
              )}
            </div>
          </div>

          {/* On Fire Badge */}
          <div className={`rounded-3xl p-6 transition-all duration-500 transform hover:scale-105 ${
            currentStreak >= 7
              ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-2xl border-2 border-white'
              : 'bg-white border-2 border-gray-200 shadow-lg'
          }`}>
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-2xl ${
                currentStreak >= 7
                  ? 'bg-white/20 backdrop-blur-sm'
                  : 'bg-orange-100'
              }`}>
                <Flame className={`w-12 h-12 ${
                  currentStreak >= 7 ? 'text-white' : 'text-orange-500'
                }`} />
              </div>
              <div className="flex-1">
                <p className={`font-black text-xl mb-1 ${
                  currentStreak >= 7 ? 'text-white' : 'text-gray-800'
                }`}>
                  On Fire
                </p>
                <p className={`text-sm font-semibold ${
                  currentStreak >= 7 ? 'text-white/90' : 'text-gray-600'
                }`}>
                  Maintain a 7-day streak
                </p>
              </div>
              {currentStreak >= 7 ? (
                <div className="flex flex-col items-center gap-1">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                  <span className="text-xs font-bold">EARNED</span>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-3xl font-black text-orange-600">{currentStreak}/7</p>
                  <p className="text-xs font-bold text-gray-500">days</p>
                </div>
              )}
            </div>
          </div>

          {/* Lightning Fast Badge */}
          <div className={`rounded-3xl p-6 transition-all duration-500 transform hover:scale-105 ${
            currentStreak >= 3
              ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-2xl border-2 border-white'
              : 'bg-white border-2 border-gray-200 shadow-lg'
          }`}>
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-2xl ${
                currentStreak >= 3
                  ? 'bg-white/20 backdrop-blur-sm'
                  : 'bg-yellow-100'
              }`}>
                <Zap className={`w-12 h-12 ${
                  currentStreak >= 3 ? 'text-white' : 'text-yellow-500'
                }`} />
              </div>
              <div className="flex-1">
                <p className={`font-black text-xl mb-1 ${
                  currentStreak >= 3 ? 'text-white' : 'text-gray-800'
                }`}>
                  Getting Started
                </p>
                <p className={`text-sm font-semibold ${
                  currentStreak >= 3 ? 'text-white/90' : 'text-gray-600'
                }`}>
                  Complete 3 days in a row
                </p>
              </div>
              {currentStreak >= 3 ? (
                <div className="flex flex-col items-center gap-1">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                  <span className="text-xs font-bold">EARNED</span>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-3xl font-black text-yellow-600">{currentStreak}/3</p>
                  <p className="text-xs font-bold text-gray-500">days</p>
                </div>
              )}
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
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}