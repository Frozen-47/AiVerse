import React from "react";
import { ArrowLeft, Shield, Lock, Eye, Database, Globe, UserCheck } from "lucide-react";
import { useTokens } from "../lib/theme";

interface PrivacyPolicyProps {
  onBackToHome: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBackToHome }) => {
  const t = useTokens();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-[fadeUp_0.4s_ease-out]">
      {/* Back button */}
      <button
        onClick={onBackToHome}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold border shadow-sm transition-all mb-8 cursor-pointer ${t.surface} ${t.border} ${t.textPrimary} hover:border-cyan-500/30 hover:scale-[1.02] active:scale-[0.98]`}
      >
        <ArrowLeft size={14} />
        Back to Catalog
      </button>

      {/* Header */}
      <div className="mb-10">
        <div className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest border rounded-full px-4 py-1.5 mb-5 ${t.surface} ${t.border} ${t.textMuted}`}>
          <Shield size={12} className="text-cyan-400" />
          Trust & Transparency
        </div>
        <h1 className={`text-[clamp(32px,5vw,48px)] font-black leading-[1.1] tracking-[-0.03em] mb-4 ${t.textPrimary}`}>
          Privacy{" "}
          <span className="bg-linear-to-r from-cyan-300 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
            Policy
          </span>
        </h1>
        <p className={`text-[14px] font-light ${t.textSecondary}`}>
          Last updated: May 20, 2026 · Thank you for building with AiVerse.
        </p>
      </div>

      {/* Main Glassmorphic Container */}
      <div className={`border rounded-3xl p-6 sm:p-10 backdrop-blur-xl ${t.surface} ${t.border} shadow-2xl space-y-10`}>
        {/* Intro */}
        <section className="space-y-3">
          <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2.5 ${t.textPrimary}`}>
            <Eye size={18} className="text-cyan-400" />
            1. Introduction
          </h2>
          <p className={`text-[14px] leading-relaxed font-light ${t.textSecondary}`}>
            Welcome to <strong>AiVerse</strong> (available at <a href="https://aiverse.frozenn.in" className="text-cyan-400 hover:underline">https://aiverse.frozenn.in</a>). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our open-source AI Knowledge Base, personalize your dashboard, or submit catalog entries.
          </p>
        </section>

        <hr className={`${t.border}`} />

        {/* Data Collection */}
        <section className="space-y-3">
          <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2.5 ${t.textPrimary}`}>
            <Database size={18} className="text-cyan-400" />
            2. Information We Collect
          </h2>
          <p className={`text-[14px] leading-relaxed font-light mb-3 ${t.textSecondary}`}>
            To provide a personalized catalog and maintain community contributions, we may collect the following types of information:
          </p>
          <ul className="space-y-2 pl-4 border-l-2 border-cyan-500/20">
            <li className="text-[14px] leading-relaxed font-light">
              <strong className={t.textPrimary}>Account & Authentication Details:</strong> When you sign up or sign in using our third-party authentication provider (Supabase Auth), we receive your email, display name, and avatar image from your selected OAuth provider (e.g., GitHub or Google).
            </li>
            <li className="text-[14px] leading-relaxed font-light">
              <strong className={t.textPrimary}>Personalization Preferences:</strong> We collect your role (e.g., Developer, Researcher) and selected topics of interest to customize your feed.
            </li>
            <li className="text-[14px] leading-relaxed font-light">
              <strong className={t.textPrimary}>Bookmarks & Favorites:</strong> We store the list of AI entries you bookmark to sync them across your devices.
            </li>
            <li className="text-[14px] leading-relaxed font-light">
              <strong className={t.textPrimary}>Community Submissions:</strong> If you submit an AI model, tool, or framework to the catalog, we store the details provided (name, description, link, organization) along with your user profile metadata as the submitter.
            </li>
          </ul>
        </section>

        <hr className={`${t.border}`} />

        {/* How We Use Info */}
        <section className="space-y-3">
          <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2.5 ${t.textPrimary}`}>
            <UserCheck size={18} className="text-cyan-400" />
            3. How We Use Your Information
          </h2>
          <p className={`text-[14px] leading-relaxed font-light ${t.textSecondary}`}>
            We use the collected data solely for the following purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[14px] leading-relaxed font-light text-white/70">
            <li className={t.textSecondary}>To personalize your feed with "Picked for you" catalog recommendations.</li>
            <li className={t.textSecondary}>To synchronize bookmarks and preferences across your web and mobile platforms.</li>
            <li className={t.textSecondary}>To evaluate and approve new directory listings submitted by the community.</li>
            <li className={t.textSecondary}>To maintain the integrity of our community and prevent spam.</li>
          </ul>
        </section>

        <hr className={`${t.border}`} />

        {/* Storage */}
        <section className="space-y-3">
          <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2.5 ${t.textPrimary}`}>
            <Lock size={18} className="text-cyan-400" />
            4. Storage & Third-Party Services
          </h2>
          <p className={`text-[14px] leading-relaxed font-light ${t.textSecondary}`}>
            We leverage modern and secure cloud infrastructure to host and run AiVerse:
          </p>
          <ul className="space-y-2 pl-4 border-l-2 border-cyan-500/20">
            <li className="text-[14px] leading-relaxed font-light">
              <strong className={t.textPrimary}>Supabase:</strong> Our database and authentication are hosted by Supabase. Your passwords are never handled directly by us. All authentication is token-based and fully secured.
            </li>
            <li className="text-[14px] leading-relaxed font-light">
              <strong className={t.textPrimary}>Vercel:</strong> Our web frontend is hosted on Vercel. Vercel collects anonymous request information (IP addresses, user agents) to prevent DDoS attacks and optimize content delivery.
            </li>
            <li className="text-[14px] leading-relaxed font-light">
              <strong className={t.textPrimary}>Local Storage:</strong> We use browser localStorage to remember local theme preferences and guest onboarding choices prior to registration.
            </li>
          </ul>
        </section>

        <hr className={`${t.border}`} />

        {/* User Rights */}
        <section className="space-y-3">
          <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2.5 ${t.textPrimary}`}>
            <Globe size={18} className="text-cyan-400" />
            5. Your Data Rights & Deletion
          </h2>
          <p className={`text-[14px] leading-relaxed font-light ${t.textSecondary}`}>
            We believe you should have complete control over your data. At any time, you can edit your profile information or empty your bookmarks. If you wish to delete your account and all associated data permanently, please contact us or delete your preferences within the platform, and we will purge your record from our Supabase instance immediately.
          </p>
        </section>

        <hr className={`${t.border}`} />

        {/* Contact */}
        <section className="space-y-3">
          <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2.5 ${t.textPrimary}`}>
            <Shield size={18} className="text-cyan-400" />
            6. Changes to this Policy & Contact
          </h2>
          <p className={`text-[14px] leading-relaxed font-light mb-4 ${t.textSecondary}`}>
            We may update this policy occasionally to reflect changes in our catalog features or third-party dependencies.
          </p>
          <p className={`text-[14px] leading-relaxed font-light ${t.textSecondary}`}>
            If you have any questions or concerns regarding this policy, please reach out to us:
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <a
              href="https://github.com/Frozen-47/AiVerse"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${t.surface2} ${t.border} ${t.textPrimary} hover:border-cyan-500/20`}
            >
              GitHub Repository
            </a>
            <a
              href="https://discord.com/users/1272910357517701147"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${t.surface2} ${t.border} ${t.textPrimary} hover:border-cyan-500/20`}
            >
              Contact on Discord
            </a>
          </div>
        </section>
      </div>

      {/* Quick Footer back */}
      <div className="mt-8 text-center">
        <button
          onClick={onBackToHome}
          className={`text-xs underline underline-offset-4 font-medium transition-colors cursor-pointer ${t.textSecondary} hover:${t.textPrimary}`}
        >
          Return to home page
        </button>
      </div>
    </div>
  );
};
