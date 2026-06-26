import React, { useState, useEffect } from 'react';
import { X, Loader2, Eye, EyeOff, ArrowRight } from 'lucide-react';
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

  // Reset fields on open/close
  useEffect(() => {
    if (isAuthModalOpen) {
      setIsLogin(authMode === 'signin');
      setError(null);
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setAgreeTerms(false);
    }
  }, [authMode, isAuthModalOpen]);

  // Block background scroll when modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const switchMode = (login: boolean) => {
    setIsLogin(login);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isLogin && !agreeTerms) {
      setError('Please agree to the Terms & Conditions to continue.');
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
          options: { data: { firstName: firstName.trim(), lastName: lastName.trim() } },
        });
        if (err) throw err;
        closeAuthModal();
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
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
      setError(err.message || 'OAuth sign-in failed.');
      setLoading(false);
    }
  };

  /* ─── Derived theme values ──────────────────────────────────── */
  const surface = isDark ? '#0c0c0c' : '#ffffff';
  const border  = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const fg      = isDark ? '#ffffff' : '#0c0c0c';
  const fgMid   = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';

  /* ─── CSS helpers (Tailwind) ────────────────────────────────── */
  const inputCls = [
    'w-full px-4 py-3 rounded-xl border bg-transparent outline-none',
    'text-[13px] font-medium transition-all duration-200',
    'placeholder:font-normal',
    isDark
      ? 'border-white/[0.08] text-white placeholder:text-white/30 focus:border-white/25 focus:bg-white/[0.03]'
      : 'border-black/[0.08] text-black placeholder:text-black/30 focus:border-black/25 focus:bg-black/[0.02]',
  ].join(' ');

  const primaryBtnCls = [
    'w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl',
    'text-[12px] font-bold tracking-wide uppercase transition-all duration-200',
    'active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none cursor-pointer',
    'shadow-lg',
    isDark
      ? 'bg-white text-black hover:bg-white/90 shadow-white/10'
      : 'bg-black text-white hover:bg-black/85 shadow-black/10',
  ].join(' ');

  const oauthBtnCls = [
    'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border',
    'text-[12px] font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer',
    isDark
      ? 'border-white/[0.08] text-white/70 hover:bg-white/[0.05] hover:text-white'
      : 'border-black/[0.08] text-black/60 hover:bg-black/[0.04] hover:text-black',
  ].join(' ');

  return (
    /* ── Backdrop ─────────────────────────────────────────────── */
    <div
      className={`${t.modalOverlay} !z-[110] flex items-center justify-center p-4 backdrop-blur-sm`}
      style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.4)' }}
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
          relative w-full max-w-[840px] flex rounded-3xl overflow-hidden
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
            active:scale-90 cursor-pointer border
          `}
          style={{
            background: 'transparent',
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
          className="hidden md:flex relative md:w-[42%] flex-shrink-0 flex-col justify-between p-9 select-none overflow-hidden"
          style={{ background: '#050505' }}
        >
          {/* Ambient gradient blob */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 70% 55% at 30% 65%, rgba(255,255,255,0.04) 0%, transparent 70%),
                radial-gradient(ellipse 50% 40% at 80% 20%, rgba(255,255,255,0.025) 0%, transparent 70%)
              `,
            }}
          />

          {/* Micro grid */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="microgrid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="0.5" />
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
              <path key={i} d={d} stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
            ))}
            {/* Nodes */}
            {[
              { cx: 60,  cy: 80,  r: 2.5, o: 0.4  },
              { cx: 130, cy: 60,  r: 2,   o: 0.35 },
              { cx: 170, cy: 110, r: 3,   o: 0.5  },
              { cx: 120, cy: 160, r: 3.5, o: 0.6  },
              { cx: 80,  cy: 230, r: 2,   o: 0.3  },
              { cx: 160, cy: 210, r: 2.5, o: 0.35 },
            ].map((n, i) => (
              <circle
                key={i}
                cx={n.cx} cy={n.cy} r={n.r}
                fill="#050505"
                stroke={`rgba(255,255,255,${n.o})`}
                strokeWidth="1"
              />
            ))}
            {/* Dashed orbit rings */}
            <circle cx="120" cy="160" r="22" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" strokeDasharray="3 3" />
            <circle cx="120" cy="160" r="38" stroke="rgba(255,255,255,0.025)" strokeWidth="0.6" />
          </svg>

          {/* Logo */}
          <div className="relative z-10">
            <span className="text-white font-black text-xl tracking-tight">AIVerse</span>
          </div>

          {/* Tagline block */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 mb-5 px-3 py-1 rounded-full border border-white/10 bg-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
              <span className="text-[9px] font-semibold uppercase tracking-widest text-white/50">
                AI Knowledge Base
              </span>
            </div>

            <h3 className="text-[26px] font-black text-white leading-[1.15] tracking-tight mb-3">
              Every AI tool,<br />
              <span className="text-white/40">one universe.</span>
            </h3>

            <p className="text-[12px] text-white/35 font-medium leading-relaxed max-w-[220px]">
              A citation-backed encyclopedia of models, frameworks, and datasets — built for builders.
            </p>

            {/* Progress dots */}
            <div className="flex gap-1.5 mt-8">
              <span className="w-4 h-1.5 rounded-full bg-white/80" />
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
          <FormPanel visible={!isLogin} surface={surface} isDark={isDark}>
            <FormHeader
              title="Create account"
              sub="Already have one?"
              linkLabel="Sign in"
              onLink={() => switchMode(true)}
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
                      peer-checked:border-transparent
                      ${isDark
                        ? 'border-white/15 peer-checked:bg-white'
                        : 'border-black/15 peer-checked:bg-black'}
                    `}
                  >
                    <svg
                      className={`w-2.5 h-2.5 opacity-0 peer-checked:opacity-100 transition-opacity ${isDark ? 'text-black' : 'text-white'}`}
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
                    className="underline underline-offset-2 transition-colors"
                    style={{ color: isDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.65)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms & Conditions
                  </a>
                </span>
              </label>

              <ErrorMsg msg={error} />

              <button type="submit" disabled={loading} className={primaryBtnCls}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <><span>Create account</span><ArrowRight size={14} strokeWidth={2.5} /></>
                )}
              </button>
            </form>

            <Divider label="or register with" isDark={isDark} surface={surface} />
            <OAuthButtons onGoogle={() => handleOAuth('google')} onGitHub={() => handleOAuth('github')} cls={oauthBtnCls} loading={loading} />
          </FormPanel>

          {/* ── SIGN IN FORM ──────────────────────────────────── */}
          <FormPanel visible={isLogin} surface={surface} isDark={isDark}>
            <FormHeader
              title="Welcome back"
              sub="No account yet?"
              linkLabel="Sign up"
              onLink={() => switchMode(false)}
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

              <ErrorMsg msg={error} />

              <button type="submit" disabled={loading} className={primaryBtnCls}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <><span>Sign in</span><ArrowRight size={14} strokeWidth={2.5} /></>
                )}
              </button>
            </form>

            <Divider label="or sign in with" isDark={isDark} surface={surface} />
            <OAuthButtons onGoogle={() => handleOAuth('google')} onGitHub={() => handleOAuth('github')} cls={oauthBtnCls} loading={loading} />
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
  isDark: boolean;
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
      style={{ color: isDark ? '#fff' : '#0c0c0c' }}
    >
      {title}
    </h2>
    <p className="text-[12px] font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
      {sub}{' '}
      <button
        type="button"
        onClick={onLink}
        className="font-bold underline underline-offset-2 cursor-pointer transition-opacity hover:opacity-70"
        style={{ color: isDark ? '#fff' : '#0c0c0c' }}
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
      style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}
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
      className="px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/8 text-red-400 text-[11.5px] font-medium leading-normal"
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
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)' }}
      />
    </div>
    <div className="relative flex justify-center">
      <span
        className="px-3 text-[10px] font-bold uppercase tracking-widest"
        style={{ background: surface, color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
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