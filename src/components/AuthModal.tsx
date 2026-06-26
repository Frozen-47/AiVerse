import React, { useState, useEffect } from 'react';
import { X, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useTokens, useTheme } from '../lib/theme';
import { supabase } from '../lib/supabase';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, signInWithOAuth } = useAuth();
  const t = useTokens();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'amoled';

  const [isLogin, setIsLogin] = useState(authMode === 'signin');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Synchronize isLogin state with authMode from context
  useEffect(() => {
    setIsLogin(authMode === 'signin');
  }, [authMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate checkbox in signup mode
    if (!isLogin && !agreeTerms) {
      setError('You must agree to the Terms & Conditions to create an account.');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        closeAuthModal();
      } else {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              firstName: firstName.trim(),
              lastName: lastName.trim(),
            }
          }
        });
        if (err) throw err;
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

  // Strictly Monochromatic Dynamic Styling Rules (No Purple Accents)
  const bgCol = isDark ? "bg-[#0d0d0d] text-white" : "bg-white text-[#0d0d0d]";
  const borderCol = isDark ? "border-white/10" : "border-black/10";
  const borderFocusCol = isDark 
    ? "focus:border-white focus:ring-1 focus:ring-white/10" 
    : "focus:border-black focus:ring-1 focus:ring-black/10";
  
  const textPrimary = isDark ? "text-white" : "text-[#0d0d0d]";
  const textSecondary = isDark ? "text-white/50" : "text-black/50";
  const textMuted = isDark ? "text-white/30" : "text-black/30";
  
  const ctaBtn = isDark 
    ? "bg-white hover:bg-white/90 text-[#0d0d0d] font-bold" 
    : "bg-[#0d0d0d] hover:bg-[#1a1a1a] text-white font-bold";
    
  const socialBtn = isDark
    ? "bg-transparent border-white/10 text-white hover:bg-white/5"
    : "bg-transparent border-black/10 text-[#0d0d0d] hover:bg-black/5";
    
  const checkboxBorder = isDark ? "border-white/10 bg-white/[0.02]" : "border-black/10 bg-black/[0.02]";
  const checkboxChecked = isDark ? "peer-checked:bg-white peer-checked:border-white" : "peer-checked:bg-black peer-checked:border-black";
  const checkMarkColor = isDark ? "text-[#0d0d0d]" : "text-white";
  const linkColor = isDark ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black";

  return (
    <div 
      className={`${t.modalOverlay} !z-[110]`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      {/* Split-Screen Modal Container */}
      <div 
        className={`relative w-full max-w-4xl flex rounded-3xl overflow-hidden shadow-2xl transition-colors duration-300 border ${
          isDark ? "border-white/5 bg-[#0d0d0d]" : "border-black/5 bg-white"
        } animate-[fadeIn_0.2s_ease-out]`}
        style={{ minHeight: "580px" }}
      >
        {/* Unified Close Button at the top-right */}
        <button
          onClick={closeAuthModal}
          className={`absolute top-5 right-5 z-30 p-2 rounded-xl border transition-all active:scale-95 cursor-pointer backdrop-blur-md ${
            isDark 
              ? "border-white/10 text-white hover:bg-white/5 bg-transparent" 
              : "border-black/10 text-[#0d0d0d] hover:bg-black/5 bg-transparent"
          } ${
            !isLogin 
              ? "md:border-white/10 md:text-white md:hover:bg-white/10 md:bg-white/5" 
              : ""
          }`}
          title="Close modal"
          aria-label="Close modal"
        >
          <X size={14} />
        </button>

        {/* ══════════ SLIDING HERO PANEL (TECH CONSTELLATION) ══════════ */}
        <div 
          className={`hidden md:flex md:w-1/2 absolute top-0 bottom-0 z-20 transition-all duration-700 ease-in-out flex-col justify-between p-8 select-none ${
            isLogin ? "left-0 translate-x-0" : "left-0 translate-x-full"
          }`}
        >
          {/* Deep Matte Tech Black Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e] via-[#080808] to-[#030303] z-0" />
          
          {/* Glowing Radial Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_90%)] z-0" />

          {/* High-Fidelity SVG Neural Network / Cybernetic Grid Constellation */}
          <svg 
            className="absolute inset-0 w-full h-full stroke-white/5 fill-none pointer-events-none z-0" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
            
            {/* Neural Connections */}
            <path d="M 20 30 L 50 20 L 80 40 L 50 60 L 20 30 Z" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.4" />
            <path d="M 50 20 L 50 60" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.4" />
            <path d="M 20 30 L 80 40" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.4" />
            <path d="M 30 75 L 50 60 L 70 80" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.4" />
            <path d="M 50 20 L 50 5" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="1 1" strokeWidth="0.4" />
            
            {/* Constellation Nodes */}
            <circle cx="50" cy="20" r="2" fill="#000" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" />
            <circle cx="20" cy="30" r="1.5" fill="#000" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />
            <circle cx="80" cy="40" r="2.5" fill="#000" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" />
            <circle cx="50" cy="60" r="3" fill="#000" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8" />
            <circle cx="30" cy="75" r="1.5" fill="#000" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />
            <circle cx="70" cy="80" r="2" fill="#000" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
            
            {/* Cybernetic Fields */}
            <circle cx="50" cy="60" r="10" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.4" strokeDasharray="2 2" />
            <circle cx="50" cy="60" r="18" stroke="rgba(255, 255, 255, 0.015)" strokeWidth="0.4" />
            <circle cx="80" cy="40" r="7" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.4" strokeDasharray="1 2" />
          </svg>

          {/* Top Row: Logo Only (No Back to Site Button) */}
          <div className="flex items-center justify-between relative z-10 w-full">
            {/* AIVerse Logo */}
            <span className="text-white font-black text-[22px] tracking-tight font-sans">
              AIVerse
            </span>
          </div>

          {/* Bottom Branding Content */}
          <div className="relative z-10 mt-auto mb-4 text-left">
            <div className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest bg-white/10 border border-white/10 rounded-full px-3 py-1 mb-4 text-white/70 backdrop-blur-md">
              <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
              AI Knowledge Base
            </div>
            
            <h3 className="text-2xl font-black text-white leading-tight tracking-tight mb-2.5">
              Every AI tool, <span className="block text-neutral-400">one universe.</span>
            </h3>
            
            <p className="text-[11.5px] font-medium text-neutral-500 leading-relaxed max-w-[260px]">
              A citation-backed encyclopedia of models, frameworks, and datasets — built for builders.
            </p>
          </div>

          {/* Three dot indicators at the bottom */}
          <div className="flex gap-1.5 relative z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>
        </div>

        {/* ══════════ LEFT COLUMN: SIGN UP FORM ══════════ */}
        <div 
          className={`w-full flex flex-col justify-center p-8 sm:p-10 transition-all duration-700 ease-in-out ${bgCol} ${
            isLogin 
              ? 'hidden md:absolute md:top-0 md:bottom-0 md:left-0 md:w-1/2 md:flex md:translate-x-full md:opacity-0 md:pointer-events-none' 
              : 'flex md:absolute md:top-0 md:bottom-0 md:left-0 md:w-1/2 md:translate-x-0 md:opacity-100 md:pointer-events-auto'
          }`}
        >
          {/* Form Header */}
          <div className="mb-6">
            <h2 className={`text-2xl font-black tracking-tight mb-1 ${textPrimary}`}>
              Create an account
            </h2>
            <div className={`text-[11.5px] font-semibold ${textSecondary}`}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setIsLogin(true); setError(null); }}
                className={`underline underline-offset-2 font-bold cursor-pointer transition-colors ${textPrimary}`}
              >
                Log in
              </button>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="First name"
                  className={`w-full px-4 py-2.5 rounded-xl border bg-transparent text-xs font-semibold placeholder:text-neutral-500 focus:outline-hidden transition-all ${borderCol} ${textPrimary} ${borderFocusCol}`}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Last name"
                  className={`w-full px-4 py-2.5 rounded-xl border bg-transparent text-xs font-semibold placeholder:text-neutral-500 focus:outline-hidden transition-all ${borderCol} ${textPrimary} ${borderFocusCol}`}
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className={`w-full px-4 py-2.5 rounded-xl border bg-transparent text-xs font-semibold placeholder:text-neutral-500 focus:outline-hidden transition-all ${borderCol} ${textPrimary} ${borderFocusCol}`}
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Enter your password"
                className={`w-full pl-4 pr-10 py-2.5 rounded-xl border bg-transparent text-xs font-semibold placeholder:text-neutral-500 focus:outline-hidden transition-all ${borderCol} ${textPrimary} ${borderFocusCol}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors cursor-pointer p-0.5 ${textMuted} hover:${textPrimary}`}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${checkboxBorder} ${checkboxChecked}`}>
                  <svg
                    className={`w-2.5 h-2.5 opacity-0 peer-checked:opacity-100 transition-opacity ${checkMarkColor}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </label>
              <span className={`text-[10px] font-semibold ${textSecondary}`}>
                I agree to the{' '}
                <a href="/terms" target="_blank" className={`underline ${linkColor}`}>
                  Terms & Conditions
                </a>
              </span>
            </div>

            {error && (
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-500 text-[10.5px] font-semibold leading-normal">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs tracking-wider uppercase transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4 ${ctaBtn}`}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>Create account</span>
              )}
            </button>
          </form>

          {/* Separator */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${borderCol}`} />
            </div>
            <div className={`relative flex justify-center text-[9px] uppercase tracking-widest font-black ${textMuted}`}>
              <span className={`px-3 transition-colors duration-300 ${isDark ? "bg-[#0d0d0d]" : "bg-white"}`}>
                Or register with
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleOAuth('google')}
              disabled={loading}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border font-bold text-[11px] transition-all shadow-sm active:scale-98 cursor-pointer ${socialBtn}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleOAuth('github')}
              disabled={loading}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border font-bold text-[11px] transition-all shadow-sm active:scale-98 cursor-pointer ${socialBtn}`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>
        </div>

        {/* ══════════ RIGHT COLUMN: SIGN IN FORM ══════════ */}
        <div 
          className={`w-full flex flex-col justify-center p-8 sm:p-10 transition-all duration-700 ease-in-out ${bgCol} ${
            isLogin 
              ? 'flex md:absolute md:top-0 md:bottom-0 md:left-1/2 md:w-1/2 md:translate-x-0 md:opacity-100 md:pointer-events-auto' 
              : 'hidden md:absolute md:top-0 md:bottom-0 md:left-1/2 md:w-1/2 md:-translate-x-full md:opacity-0 md:pointer-events-none'
          }`}
        >
          {/* Form Header */}
          <div className="mb-6">
            <h2 className={`text-2xl font-black tracking-tight mb-1 ${textPrimary}`}>
              Sign in to account
            </h2>
            <div className={`text-[11.5px] font-semibold ${textSecondary}`}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => { setIsLogin(false); setError(null); }}
                className={`underline underline-offset-2 font-bold cursor-pointer transition-colors ${textPrimary}`}
              >
                Sign up
              </button>
            </div>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className={`w-full px-4 py-2.5 rounded-xl border bg-transparent text-xs font-semibold placeholder:text-neutral-500 focus:outline-hidden transition-all ${borderCol} ${textPrimary} ${borderFocusCol}`}
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className={`w-full pl-4 pr-10 py-2.5 rounded-xl border bg-transparent text-xs font-semibold placeholder:text-neutral-500 focus:outline-hidden transition-all ${borderCol} ${textPrimary} ${borderFocusCol}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors cursor-pointer p-0.5 ${textMuted} hover:${textPrimary}`}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-500 text-[10.5px] font-semibold leading-normal">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs tracking-wider uppercase transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4 ${ctaBtn}`}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>

          {/* Separator */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${borderCol}`} />
            </div>
            <div className={`relative flex justify-center text-[9px] uppercase tracking-widest font-black ${textMuted}`}>
              <span className={`px-3 transition-colors duration-300 ${isDark ? "bg-[#0d0d0d]" : "bg-white"}`}>
                Or sign in with
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleOAuth('google')}
              disabled={loading}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border font-bold text-[11px] transition-all shadow-sm active:scale-98 cursor-pointer ${socialBtn}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleOAuth('github')}
              disabled={loading}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border font-bold text-[11px] transition-all shadow-sm active:scale-98 cursor-pointer ${socialBtn}`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
