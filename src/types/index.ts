export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Habit {
  id: string;
  name: string;
  userId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Completion {
  id: string;
  habitId: string;
  userId: string;
  date: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface MetricsData {
  uniqueDays: number;
  totalDays: number;
  consistency: string;
}

export interface Medal {
  name: string;
  icon: any;
  threshold: number;
  color: string;
  earned: boolean;
}