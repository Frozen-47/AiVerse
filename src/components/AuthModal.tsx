import React, { useState, useEffect } from 'react';
import { X, Loader2, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useTokens, useTheme } from '../lib/theme';
import { supabase } from '../lib/supabase';
import { TurnstileWidget } from './TurnstileWidget';
import { isSessionHumanVerified } from '../lib/turnstile';

type AuthViewMode = 'signin' | 'signup' | 'forgot' | 'reset';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, signInWithOAuth } = useAuth();
  const t = useTokens();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'amoled';

  const [mode, setMode] = useState<AuthViewMode>(authMode || 'signin');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotEmailSent, setForgotEmailSent] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(() =>
    isSessionHumanVerified() ? 'session_verified' : null
  );

  // Render-time state reset when modal opens (avoids setState in effect)
  const [trackedOpenKey, setTrackedOpenKey] = useState<string | null>(null);
  const openKey = isAuthModalOpen ? (authMode || 'signin') : null;
  if (openKey !== trackedOpenKey) {
    setTrackedOpenKey(openKey);
    if (openKey !== null) {
      setMode(authMode || 'signin');
      setError(null);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFirstName('');
      setLastName('');
      setAgreeTerms(false);
      setForgotEmailSent(false);
      setResetPasswordSuccess(false);
      setTurnstileToken(isSessionHumanVerified() ? 'session_verified' : null);
    }
  }

  // Block background scroll and support Escape key when modal is open
  useEffect(() => {
    if (!isAuthModalOpen) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAuthModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const switchMode = (newMode: AuthViewMode) => {
    setMode(newMode);
    setError(null);
    setForgotEmailSent(false);
    setResetPasswordSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (mode !== 'reset' && !turnstileToken) {
      setError('Please complete the Cloudflare security verification.');
      setLoading(false);
      return;
    }

    if (mode === 'signup' && !agreeTerms) {
      setError('Please agree to the Terms & Conditions to continue.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'signin') {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        closeAuthModal();
      } else if (mode === 'signup') {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { firstName: firstName.trim(), lastName: lastName.trim() } },
        });
        if (err) throw err;
        closeAuthModal();
      } else if (mode === 'forgot') {
        if (!email.trim()) {
          setError('Please enter your email address.');
          setLoading(false);
          return;
        }
        const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : 'https://aiverse.frozenn.in/',
        });
        if (err) throw err;
        setForgotEmailSent(true);
      } else if (mode === 'reset') {
        if (!password || password.length < 6) {
          setError('Password must be at least 6 characters.');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }
        const { error: err } = await supabase.auth.updateUser({ password });
        if (err) throw err;
        setResetPasswordSuccess(true);
        setTimeout(() => {
          closeAuthModal();
        }, 2500);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError(null);
    try {
      await signInWithOAuth(provider);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'OAuth sign-in failed.');
      setLoading(false);
    }
  };

  /* ─── Derived theme values ──────────────────────────────────── */
  const surface = isDark ? '#0d0e12' : '#ffffff';
  const border  = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  const fg      = isDark ? '#ffffff' : '#0f172a';
  const fgMid   = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(15,23,42,0.55)';

  /* ─── CSS helpers (Tailwind) ────────────────────────────────── */
  const inputCls = [
    'w-full px-4 py-3 rounded-xl border outline-none',
    'text-[13px] font-medium transition-all duration-200',
    'placeholder:font-normal',
    isDark
      ? 'border-white/[0.1] bg-[#121319] text-white placeholder:text-white/30 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20'
      : 'border-neutral-200 bg-neutral-50/70 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
  ].join(' ');

  const primaryBtnCls = [
    'w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl',
    'text-[12px] font-bold tracking-wide uppercase transition-all duration-200',
    'active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none cursor-pointer',
    'shadow-lg shadow-indigo-500/20 bg-indigo-600 text-white hover:bg-indigo-500',
  ].join(' ');

  const oauthBtnCls = [
    'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border',
    'text-[12px] font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer',
    isDark
      ? 'border-white/[0.1] bg-[#121319] text-white/80 hover:bg-white/[0.06] hover:border-indigo-500/35 hover:text-white'
      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-indigo-500/35 hover:text-neutral-900',
  ].join(' ');

  return (
    /* ── Backdrop ─────────────────────────────────────────────── */
    <div
      className={`${t.modalOverlay} !z-[110] flex items-center justify-center p-4 backdrop-blur-md`}
      style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.78)' : 'rgba(15,23,42,0.45)' }}
      onClick={(e) => { if (e.target === e.currentTarget) closeAuthModal(); }}
    >
      {/*
        ── Modal shell ─────────────────────────────────────────
        Two columns: hero (left) + form (right). On mobile, hero hides.
        The form area uses a cross-fade + slide technique so switching
        sign-in ↔ sign-up feels like a page turn rather than a pop.
      */}
      <div
        className={`
          relative w-full max-w-[840px] flex rounded-2xl overflow-hidden
          border shadow-2xl
          animate-[modalIn_0.25s_cubic-bezier(0.22,1,0.36,1)_both]
        `}
        style={{
          background: surface,
          borderColor: border,
          minHeight: 580,
        }}
      >
        {/* ── Close button ─────────────────────────────────────── */}
        <button
          onClick={closeAuthModal}
          aria-label="Close"
          className={`
            absolute top-5 right-5 z-50 w-8 h-8 rounded-xl
            flex items-center justify-center transition-all duration-150
            active:scale-90 cursor-pointer border hover:bg-white/5
          `}
          style={{
            background: isDark ? '#121319' : 'transparent',
            borderColor: border,
            color: fgMid,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = fg)}
          onMouseLeave={(e) => (e.currentTarget.style.color = fgMid)}
        >
          <X size={14} strokeWidth={2.5} />
        </button>

        {/* ════════════════════════════════════════════════════════
            HERO PANEL — always left, fixed width on desktop
        ════════════════════════════════════════════════════════ */}
        <div
          className="hidden md:flex relative md:w-[42%] flex-shrink-0 flex-col justify-between p-9 select-none overflow-hidden border-r border-white/[0.08]"
          style={{ background: '#050507' }}
        >
          {/* Ambient gradient blob */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 75% 60% at 25% 70%, rgba(99,102,241,0.16) 0%, transparent 70%),
                radial-gradient(ellipse 55% 45% at 85% 20%, rgba(6,182,212,0.10) 0%, transparent 70%)
              `,
            }}
          />

          {/* Micro grid */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-35"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="microgrid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(129,140,248,0.08)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#microgrid)" />
          </svg>

          {/* Constellation SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 200 300"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Edges */}
            {[
              'M60 80 L130 60', 'M130 60 L170 110', 'M170 110 L120 160',
              'M120 160 L60 80', 'M60 80 L120 160',
              'M120 160 L80 230', 'M80 230 L160 210', 'M160 210 L120 160',
              'M130 60 L170 110',
            ].map((d, i) => (
              <path key={i} d={d} stroke="rgba(129,140,248,0.16)" strokeWidth="0.8" />
            ))}
            {/* Nodes */}
            {[
              { cx: 60,  cy: 80,  r: 2.5, o: 0.45 },
              { cx: 130, cy: 60,  r: 2,   o: 0.4  },
              { cx: 170, cy: 110, r: 3,   o: 0.55 },
              { cx: 120, cy: 160, r: 3.5, o: 0.7  },
              { cx: 80,  cy: 230, r: 2,   o: 0.35 },
              { cx: 160, cy: 210, r: 2.5, o: 0.4  },
            ].map((n, i) => (
              <circle
                key={i}
                cx={n.cx} cy={n.cy} r={n.r}
                fill="#050507"
                stroke={`rgba(129,140,248,${n.o})`}
                strokeWidth="1"
              />
            ))}
            {/* Dashed orbit rings */}
            <circle cx="120" cy="160" r="22" stroke="rgba(99,102,241,0.15)" strokeWidth="0.6" strokeDasharray="3 3" />
            <circle cx="120" cy="160" r="38" stroke="rgba(6,182,212,0.10)" strokeWidth="0.6" />
          </svg>

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]" />
            <span className="text-white font-black text-xl tracking-tight">AiVerse</span>
          </div>

          {/* Tagline block */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 mb-5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[9px] font-semibold uppercase tracking-widest text-indigo-300">
                AI Knowledge Base
              </span>
            </div>

            <h3 className="text-[26px] font-black text-white leading-[1.15] tracking-tight mb-3">
              Every AI tool,<br />
              <span className="bg-linear-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">one universe.</span>
            </h3>

            <p className="text-[12px] text-neutral-400 font-medium leading-relaxed max-w-[220px]">
              A citation-backed encyclopedia of models, frameworks, and datasets — built for builders.
            </p>

            {/* Progress dots */}
            <div className="flex gap-1.5 mt-8">
              <span className="w-5 h-1.5 rounded-full bg-indigo-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            FORM AREA — takes remaining width, clips overflow for
            the slide/fade transition between sign-in and sign-up
        ════════════════════════════════════════════════════════ */}
        <div className="relative flex-1 overflow-hidden">

          {/* ── SIGN UP FORM ──────────────────────────────────── */}
          <FormPanel visible={mode === 'signup'} surface={surface}>
            <FormHeader
              title="Create account"
              sub="Already have one?"
              linkLabel="Sign in"
              onLink={() => switchMode('signin')}
              isDark={isDark}
            />

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  className={inputCls}
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  autoComplete="given-name"
                />
                <input
                  className={inputCls}
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  autoComplete="family-name"
                />
              </div>

              <input
                className={inputCls}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />

              <PasswordField
                value={password}
                onChange={setPassword}
                show={showPassword}
                toggle={() => setShowPassword((v) => !v)}
                inputCls={inputCls}
                isDark={isDark}
                minLength={6}
              />

              {/* Terms checkbox */}
              <label className="flex items-start gap-3 cursor-pointer pt-1 group">
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div
                    className={`
                      w-4 h-4 rounded-md border transition-all duration-150
                      flex items-center justify-center
                      peer-checked:border-indigo-600 peer-checked:bg-indigo-600
                      ${isDark ? 'border-white/20 bg-[#121319]' : 'border-neutral-300 bg-white'}
                    `}
                  >
                    <svg
                      className="w-2.5 h-2.5 opacity-0 peer-checked:opacity-100 transition-opacity text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                </div>
                <span className="text-[11px] font-medium leading-relaxed" style={{ color: fgMid }}>
                  I agree to the{' '}
                  <a
                    href="/terms"
                    target="_blank"
                    className="text-indigo-600 dark:text-indigo-400 underline underline-offset-2 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms & Conditions
                  </a>
                </span>
              </label>

              {!turnstileToken && (
                <div className="py-1">
                  <TurnstileWidget
                    action="signup"
                    size="compact"
                    onVerify={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken(null)}
                  />
                </div>
              )}

              <ErrorMsg msg={error} />

              <button type="submit" disabled={loading || !turnstileToken} className={primaryBtnCls}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <><span>Create account</span><ArrowRight size={14} strokeWidth={2.5} /></>
                )}
              </button>
            </form>

            <Divider label="or register with" isDark={isDark} surface={surface} />
            <OAuthButtons onGoogle={() => handleOAuth('google')} onGitHub={() => handleOAuth('github')} cls={oauthBtnCls} loading={loading} />
          </FormPanel>

          {/* ── SIGN IN FORM ──────────────────────────────────── */}
          <FormPanel visible={mode === 'signin'} surface={surface}>
            <FormHeader
              title="Welcome back"
              sub="No account yet?"
              linkLabel="Sign up"
              onLink={() => switchMode('signup')}
              isDark={isDark}
            />

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                className={inputCls}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />

              <PasswordField
                value={password}
                onChange={setPassword}
                show={showPassword}
                toggle={() => setShowPassword((v) => !v)}
                inputCls={inputCls}
                isDark={isDark}
              />

              <div className="flex justify-end pt-0.5">
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-[12px] font-medium text-indigo-600 dark:text-indigo-400 transition-colors hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {!turnstileToken && (
                <div className="py-1">
                  <TurnstileWidget
                    action="signin"
                    size="compact"
                    onVerify={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken(null)}
                  />
                </div>
              )}

              <ErrorMsg msg={error} />

              <button type="submit" disabled={loading || !turnstileToken} className={primaryBtnCls}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <><span>Sign in</span><ArrowRight size={14} strokeWidth={2.5} /></>
                )}
              </button>
            </form>

            <Divider label="or sign in with" isDark={isDark} surface={surface} />
            <OAuthButtons onGoogle={() => handleOAuth('google')} onGitHub={() => handleOAuth('github')} cls={oauthBtnCls} loading={loading} />
          </FormPanel>

          {/* ── FORGOT PASSWORD FORM ───────────────────────────── */}
          <FormPanel visible={mode === 'forgot'} surface={surface}>
            <FormHeader
              title="Reset password"
              sub="Remembered your password?"
              linkLabel="Sign in"
              onLink={() => switchMode('signin')}
              isDark={isDark}
            />

            {forgotEmailSent ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold mb-1" style={{ color: fg }}>Check your email</h3>
                  <p className="text-[12px] leading-relaxed max-w-[280px] mx-auto" style={{ color: fgMid }}>
                    We sent a password reset link to <strong style={{ color: fg }}>{email}</strong>. Click the link to choose a new password.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className={primaryBtnCls}
                >
                  Back to sign in
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <p className="text-[12px] leading-relaxed mb-2" style={{ color: fgMid }}>
                  Enter your email address and we will send you a link to reset your password.
                </p>

                <input
                  className={inputCls}
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />

                {!turnstileToken && (
                  <div className="py-1">
                    <TurnstileWidget
                      action="forgot_password"
                      size="compact"
                      onVerify={(token) => setTurnstileToken(token)}
                      onExpire={() => setTurnstileToken(null)}
                    />
                  </div>
                )}

                <ErrorMsg msg={error} />

                <button type="submit" disabled={loading || !turnstileToken} className={primaryBtnCls}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    <><span>Send reset link</span><ArrowRight size={14} strokeWidth={2.5} /></>
                  )}
                </button>
              </form>
            )}
          </FormPanel>

          {/* ── SET NEW PASSWORD FORM (RECOVERY) ───────────────── */}
          <FormPanel visible={mode === 'reset'} surface={surface}>
            <div className="mb-6">
              <h2 className="text-[24px] font-black tracking-tight mb-1" style={{ color: fg }}>
                Set new password
              </h2>
              <p className="text-[12px] font-medium" style={{ color: fgMid }}>
                Enter a new secure password for your AiVerse account.
              </p>
            </div>

            {resetPasswordSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold mb-1" style={{ color: fg }}>Password updated!</h3>
                  <p className="text-[12px]" style={{ color: fgMid }}>
                    Your password has been successfully updated.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => closeAuthModal()}
                  className={primaryBtnCls}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <PasswordField
                  value={password}
                  onChange={setPassword}
                  show={showPassword}
                  toggle={() => setShowPassword((v) => !v)}
                  inputCls={inputCls}
                  isDark={isDark}
                  minLength={6}
                />

                <div className="relative">
                  <input
                    className={inputCls}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <ErrorMsg msg={error} />

                <button type="submit" disabled={loading} className={primaryBtnCls}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    <><span>Update password</span><ArrowRight size={14} strokeWidth={2.5} /></>
                  )}
                </button>
              </form>
            )}
          </FormPanel>
        </div>
      </div>

      {/* ── Keyframe injection ───────────────────────────────── */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
};

/* ─── Sub-components ──────────────────────────────────────────── */

/** Animated panel wrapper — handles the cross-fade + slight slide */
const FormPanel: React.FC<{
  visible: boolean;
  surface: string;
  children: React.ReactNode;
}> = ({ visible, surface, children }) => (
  <div
    className={`
      absolute inset-0 flex flex-col justify-center px-10 py-10
      transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
      overflow-y-auto
    `}
    style={{
      background: surface,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(18px)',
      pointerEvents: visible ? 'auto' : 'none',
    }}
  >
    {children}
  </div>
);

/** Form title + mode toggle link */
const FormHeader: React.FC<{
  title: string;
  sub: string;
  linkLabel: string;
  onLink: () => void;
  isDark: boolean;
}> = ({ title, sub, linkLabel, onLink, isDark }) => (
  <div className="mb-7">
    <h2
      className="text-[24px] font-black tracking-tight mb-1.5"
      style={{ color: isDark ? '#fff' : '#0f172a' }}
    >
      {title}
    </h2>
    <p className="text-[12px] font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(15,23,42,0.5)' }}>
      {sub}{' '}
      <button
        type="button"
        onClick={onLink}
        className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-2 cursor-pointer transition-opacity"
      >
        {linkLabel}
      </button>
    </p>
  </div>
);

/** Password input with toggle */
const PasswordField: React.FC<{
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  toggle: () => void;
  inputCls: string;
  isDark: boolean;
  minLength?: number;
}> = ({ value, onChange, show, toggle, inputCls, isDark, minLength }) => (
  <div className="relative">
    <input
      className={inputCls + ' pr-11'}
      type={show ? 'text' : 'password'}
      placeholder="Password"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      minLength={minLength}
      autoComplete={show ? 'off' : 'current-password'}
    />
    <button
      type="button"
      onClick={toggle}
      tabIndex={-1}
      className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer transition-opacity hover:opacity-70"
      style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(15,23,42,0.35)' }}
    >
      {show ? <EyeOff size={15} /> : <Eye size={15} />}
    </button>
  </div>
);

/** Animated error banner */
const ErrorMsg: React.FC<{ msg: string | null }> = ({ msg }) => {
  if (!msg) return null;
  return (
    <div
      className="px-4 py-3 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-500 dark:text-rose-400 text-[11.5px] font-medium leading-normal"
      style={{ animation: 'panelIn 0.2s ease both' }}
    >
      {msg}
    </div>
  );
};

/** Horizontal divider with centred label */
const Divider: React.FC<{ label: string; isDark: boolean; surface: string }> = ({ label, isDark, surface }) => (
  <div className="relative my-6">
    <div className="absolute inset-0 flex items-center">
      <div
        className="w-full border-t"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)' }}
      />
    </div>
    <div className="relative flex justify-center">
      <span
        className="px-3 text-[10px] font-bold uppercase tracking-widest"
        style={{ background: surface, color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(15,23,42,0.35)' }}
      >
        {label}
      </span>
    </div>
  </div>
);

/** Google + GitHub OAuth row */
const OAuthButtons: React.FC<{
  onGoogle: () => void;
  onGitHub: () => void;
  cls: string;
  loading: boolean;
}> = ({ onGoogle, onGitHub, cls, loading }) => (
  <div className="flex gap-3">
    <button type="button" onClick={onGoogle} disabled={loading} className={cls}>
      <GoogleIcon />
      <span>Google</span>
    </button>
    <button type="button" onClick={onGitHub} disabled={loading} className={cls}>
      <GitHubIcon />
      <span>GitHub</span>
    </button>
  </div>
);

const GoogleIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);