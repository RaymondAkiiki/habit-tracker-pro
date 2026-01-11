'use client';

import { useState, useEffect } from 'react';
import Auth from '@/components/Auth';
import Dashboard from '@/components/Dashboard';
import StatsView from '@/components/StatsView';
import RewardsView from '@/components/RewardsView';
import BottomNav from '@/components/BottomNav';
import { User, Habit, Completion } from '@/types';
import { calculateMetrics, calculateStreak } from '@/lib/utils';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  // Check if user has valid auth token by trying to fetch their data
  const checkAuth = async () => {
    try {
      // Try to load user data - if successful, user is authenticated
      const success = await loadData();
      if (!success) {
        // No valid session, show login
        setLoading(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setLoading(false);
    }
  };

  const loadData = async (): Promise<boolean> => {
    try {
      // Fetch user info, habits, and completions in parallel
      const [userRes, habitsRes, completionsRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/habits'),
        fetch('/api/completions')
      ]);

      // If any request fails with 401, user is not authenticated
      if (!userRes.ok || !habitsRes.ok || !completionsRes.ok) {
        if (userRes.status === 401 || habitsRes.status === 401 || completionsRes.status === 401) {
          console.log('Not authenticated - showing login');
          return false;
        }
        throw new Error('Failed to load data');
      }

      const userData = await userRes.json();
      const habitsData = await habitsRes.json();
      const completionsData = await completionsRes.json();
      
      setUser(userData);
      setHabits(habitsData);
      setCompletions(completionsData);

      setLoading(false);
      return true;
    } catch (error) {
      console.error('Load data error:', error);
      setLoading(false);
      return false;
    }
  };

  const handleLogin = async (userData: User) => {
    setUser(userData);
    await loadData();
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setHabits([]);
      setCompletions([]);
      setCurrentView('dashboard');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const monthlyMetrics = calculateMetrics(completions, 30);
  const yearlyMetrics = calculateMetrics(completions, 365);
  const currentStreak = calculateStreak(completions);

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'dashboard' && (
        <Dashboard
          user={user}
          habits={habits}
          completions={completions}
          currentStreak={currentStreak}
          onRefresh={loadData}
        />
      )}
      {currentView === 'stats' && (
        <StatsView
          monthlyMetrics={monthlyMetrics}
          yearlyMetrics={yearlyMetrics}
          currentStreak={currentStreak}
        />
      )}
      {currentView === 'rewards' && (
        <RewardsView
          currentStreak={currentStreak}
          monthlyMetrics={monthlyMetrics}
        />
      )}
      <BottomNav currentView={currentView} onViewChange={setCurrentView} />
    </div>
  );
}