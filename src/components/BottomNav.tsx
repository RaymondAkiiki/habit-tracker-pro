'use client';

import { Check, TrendingUp, Award, Sparkles } from 'lucide-react';

interface BottomNavProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function BottomNav({ currentView, onViewChange }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', icon: Check, label: 'Habits', color: 'from-purple-500 to-pink-500' },
    { id: 'stats', icon: TrendingUp, label: 'Stats', color: 'from-blue-500 to-purple-500' },
    { id: 'rewards', icon: Award, label: 'Rewards', color: 'from-orange-500 to-pink-500' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t-2 border-gray-100 px-6 py-3 shadow-2xl z-50">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-50"></div>
      
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`relative flex flex-col items-center gap-1 py-3 rounded-2xl transition-all duration-300 transform ${
                isActive 
                  ? 'scale-105' 
                  : 'scale-100 hover:scale-105 active:scale-95'
              }`}
            >
              {/* Active background with gradient */}
              {isActive && (
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-10 rounded-2xl animate-[pulse_2s_ease-in-out_infinite]`}></div>
              )}
              
              {/* Icon container */}
              <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? `bg-gradient-to-r ${item.color} shadow-lg` 
                  : 'bg-transparent'
              }`}>
                <Icon 
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400'
                  }`} 
                />
                
                {/* Sparkle effect on active */}
                {isActive && (
                  <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-ping" />
                )}
              </div>
              
              {/* Label */}
              <span className={`text-xs font-bold transition-colors duration-300 ${
                isActive 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r ' + item.color
                  : 'text-gray-500'
              }`}>
                {item.label}
              </span>
              
              {/* Active indicator dot */}
              {isActive && (
                <div className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.color} animate-bounce`}></div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Safe area for iOS */}
      <div className="h-safe-area-inset-bottom"></div>
    </div>
  );
}