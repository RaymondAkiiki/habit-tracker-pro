import { Completion } from '@/types';

export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function calculateMetrics(completions: Completion[], days: number) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const relevantCompletions = completions.filter(c => {
    const compDate = new Date(c.date);
    return compDate >= startDate && compDate <= endDate;
  });

  const uniqueDays = new Set(relevantCompletions.map(c => c.date)).size;
  const consistency = (uniqueDays / days) * 100;

  return {
    uniqueDays,
    totalDays: days,
    consistency: consistency.toFixed(1)
  };
}

export function calculateStreak(completions: Completion[]): number {
  const dates = [...new Set(completions.map(c => c.date))].sort().reverse();
  let streak = 0;
  const today = new Date();
  
  for (let i = 0; i < dates.length; i++) {
    const date = new Date(dates[i]);
    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);
    
    if (date.toISOString().split('T')[0] === expectedDate.toISOString().split('T')[0]) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}