import React, { useState } from 'react';
import { X, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useTokens } from '../lib/theme';
import { supabase } from '../lib/supabase';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, signInWithOAuth } = useAuth();
  const t = useTokens();

  
  const [isLogin, setIsLogin] = useState(authMode === 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    setIsLogin(authMode === 'signin');
  }, [authMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        closeAuthModal();
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        closeAuthModal();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError(null);
    try {
      await signInWithOAuth(provider);
    } catch (err: any) {
      setError(err.message || 'An error occurred during social authentication');
      setLoading(false);
    }
  };

  return (
    <div 
      className={t.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-8 ${t.modal}`}>
        <button
          onClick={closeAuthModal}
          className={`absolute top-4 right-4 p-2 rounded-lg border transition-colors ${t.surface} ${t.border} ${t.textMuted} hover:${t.textPrimary}`}
        >
          <X size={16} />
        </button>

        <div className="mb-8">
          <h2 className={`text-2xl font-black tracking-tight mb-2 ${t.textPrimary}`}>
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className={`text-sm ${t.textSecondary}`}>
            {isLogin ? 'Enter your details to sign in to your account' : 'Join AiVerse to personalize your experience'}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleOAuth('google')}
            disabled={loading}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${t.surface} ${t.border} ${t.textPrimary} hover:${t.surfaceHover} disabled:opacity-50`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="text-xs font-semibold">Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleOAuth('github')}
            disabled={loading}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${t.surface} ${t.border} ${t.textPrimary} hover:${t.surfaceHover} disabled:opacity-50`}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="text-xs font-semibold">GitHub</span>
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${t.border}`} />
          </div>
          <div className="relative flex justify-center">
            <span className={`px-3 ${t.modal} rounded-md ${t.sectionLabel} mb-0`}>Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={t.sectionLabel}>
              Email
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${t.textMuted}`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${t.surface} ${t.border} ${t.textPrimary} focus:outline-hidden focus:border-black/20 focus:ring-1 focus:ring-black/20 transition-all`}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className={t.sectionLabel}>
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${t.textMuted}`} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${t.surface} ${t.border} ${t.textPrimary} focus:outline-hidden focus:border-black/20 focus:ring-1 focus:ring-black/20 transition-all`}
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-black text-white hover:from-black hover:to-transparent text-white shadow-md shadow-black/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            className={`text-sm ${t.textMuted} hover:${t.textPrimary} transition-colors`}
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};
