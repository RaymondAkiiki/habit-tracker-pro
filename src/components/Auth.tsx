'use client';

import { useState } from 'react';
import { Trophy, Sparkles, Eye, EyeOff, Mail, Lock, User as UserIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { User } from '@/types';

interface AuthProps {
  onLogin: (user: User) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async () => {
    // Validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    if (!isLogin && !name.trim()) {
      setError('Name is required');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Show success animation
      setShowSuccess(true);
      
      // Wait for animation then proceed
      setTimeout(() => {
        onLogin(data.user);
      }, 1000);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-400/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-64 h-64 bg-pink-400/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo section with bounce animation */}
        <div className="text-center mb-8 animate-[slideDown_0.8s_ease-out]">
          <div className="inline-flex items-center justify-center p-6 bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 rounded-[2rem] mb-6 shadow-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-500 cursor-pointer">
            <Trophy className="w-20 h-20 text-white animate-[bounce_2s_ease-in-out_infinite]" />
            <Sparkles className="w-6 h-6 text-yellow-200 absolute -top-2 -right-2 animate-ping" />
          </div>
          <h1 className="text-6xl font-black text-white mb-3 tracking-tight drop-shadow-lg">
            Habit<span className="text-yellow-300 animate-pulse">Track</span>
          </h1>
          <p className="text-white/90 text-xl font-semibold tracking-wide">
            Build consistency, unlock greatness ✨
          </p>
        </div>

        {/* Main card with glassmorphism */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl p-8 border-2 border-white/30 animate-[slideUp_0.8s_ease-out] relative overflow-hidden">
          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-400/20 to-transparent rounded-tr-full"></div>

          {/* Tab switcher */}
          <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-2xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Success message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 text-green-700 rounded-2xl font-semibold animate-[slideDown_0.5s_ease-out] flex items-center gap-3 shadow-lg">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 animate-[spin_0.5s_ease-in-out]" />
              <span>🎉 Welcome aboard! Loading your dashboard...</span>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 text-red-700 rounded-2xl font-semibold animate-[shake_0.5s_ease-in-out] flex items-center gap-3 shadow-lg">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-5 relative z-10">
            {/* Name field for signup */}
            {!isLogin && (
              <div className="animate-[slideDown_0.3s_ease-out]">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-purple-600" />
                  Full Name
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    disabled={loading}
                    className="w-full px-5 py-4 pl-12 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-semibold placeholder:text-gray-400 placeholder:font-normal bg-white shadow-sm"
                  />
                  <UserIcon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'name' ? 'text-purple-600' : 'text-gray-400'}`} />
                </div>
              </div>
            )}
            
            {/* Email field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-600" />
                Email Address
              </label>
              <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  disabled={loading}
                  className="w-full px-5 py-4 pl-12 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-semibold placeholder:text-gray-400 placeholder:font-normal bg-white shadow-sm"
                />
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-purple-600' : 'text-gray-400'}`} />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-600" />
                Password
              </label>
              <div className={`relative transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  disabled={loading}
                  className="w-full px-5 py-4 pl-12 pr-12 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-semibold placeholder:text-gray-400 placeholder:font-normal bg-white shadow-sm"
                />
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-purple-600' : 'text-gray-400'}`} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={loading || showSuccess}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed relative overflow-hidden group mt-6"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : showSuccess ? (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    <span>Success!</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In Now' : 'Create Account'}</span>
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </>
                )}
              </span>
              {/* Animated gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Toggle auth mode */}
          <div className="mt-6 text-center">
            <button
              onClick={toggleMode}
              disabled={loading}
              className="text-gray-600 hover:text-purple-600 transition-colors font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform transition-transform inline-block"
            >
              {isLogin ? (
                <>
                  Don't have an account? <span className="text-purple-600 underline">Sign up</span>
                </>
              ) : (
                <>
                  Already have an account? <span className="text-purple-600 underline">Sign in</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center mt-8 text-white/90 text-sm font-semibold tracking-wide animate-[fadeIn_1s_ease-out]">
          🚀 Join thousands building better habits every day
        </p>
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
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}