import React from "react";
import { ArrowLeft, Scale, ShieldAlert, FileText, CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";
import { useTokens } from "../lib/theme";

interface TermsOfServiceProps {
  onBackToHome: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBackToHome }) => {
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
          <Scale size={12} className="text-cyan-400" />
          Legal Agreement
        </div>
        <h1 className={`text-[clamp(32px,5vw,48px)] font-black leading-[1.1] tracking-[-0.03em] mb-4 ${t.textPrimary}`}>
          Terms of{" "}
          <span className="bg-linear-to-r from-cyan-300 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
            Service
          </span>
        </h1>
        <p className={`text-[14px] font-light ${t.textSecondary}`}>
          Last updated: May 20, 2026 · Please read these terms carefully before using AiVerse.
        </p>
      </div>

      {/* Main Glassmorphic Container */}
      <div className={`border rounded-3xl p-6 sm:p-10 backdrop-blur-xl ${t.surface} ${t.border} shadow-2xl space-y-10`}>
        {/* Acceptance */}
        <section className="space-y-3">
          <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2.5 ${t.textPrimary}`}>
            <CheckCircle2 size={18} className="text-cyan-400" />
            1. Acceptance of Terms
          </h2>
          <p className={`text-[14px] leading-relaxed font-light ${t.textSecondary}`}>
            By accessing or using <strong>AiVerse</strong> (available at <a href="https://aiverse.frozenn.in" className="text-cyan-400 hover:underline">https://aiverse.frozenn.in</a>), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not access or use our platform.
          </p>
        </section>

        <hr className={`${t.border}`} />

        {/* Purpose */}
        <section className="space-y-3">
          <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2.5 ${t.textPrimary}`}>
            <FileText size={18} className="text-cyan-400" />
            2. Description of Service
          </h2>
          <p className={`text-[14px] leading-relaxed font-light ${t.textSecondary}`}>
            AiVerse is an open-source, community-driven catalog and knowledge base for Artificial Intelligence tools, machine learning models, frameworks, and datasets. Users can browse entries, personalize their dashboards based on interests, bookmark entries, and submit new AI tools to the directory.
          </p>
        </section>

        <hr className={`${t.border}`} />

        {/* User Accounts */}
        <section className="space-y-3">
          <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2.5 ${t.textPrimary}`}>
            <ShieldAlert size={18} className="text-cyan-400" />
            3. Accounts & Authentication
          </h2>
          <p className={`text-[14px] leading-relaxed font-light ${t.textSecondary}`}>
            To utilize personalized features like custom feeds or entry bookmarking, you may authenticate using third-party social log-ins (e.g., GitHub, Google) facilitated securely by Supabase. You are responsible for keeping your login credentials secure and for all activity occurring under your account.
          </p>
        </section>

        <hr className={`${t.border}`} />

        {/* User Submissions */}
        <section className="space-y-3">
          <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2.5 ${t.textPrimary}`}>
            <AlertTriangle size={18} className="text-cyan-400" />
            4. User Contributions & Directory Submissions
          </h2>
          <p className={`text-[14px] leading-relaxed font-light ${t.textSecondary}`}>
            When you submit an entry to the AiVerse directory, you warrant that the information is accurate, up-to-date, and does not violate any third-party copyrights or trademarks.
          </p>
          <p className={`text-[14px] leading-relaxed font-light ${t.textSecondary}`}>
            We reserve the right to review, edit, reject, or remove any submission at our sole discretion to maintain the quality and safety of our directory.
          </p>
        </section>

        <hr className={`${t.border}`} />

        {/* Disclaimer */}
        <section className="space-y-3">
          <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2.5 ${t.textPrimary}`}>
            <AlertTriangle size={18} className="text-cyan-400" />
            5. Disclaimer of Warranties
          </h2>
          <p className={`text-[14px] leading-relaxed font-light ${t.textSecondary}`}>
            AiVerse is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, regarding the accuracy, completeness, reliability, or availability of the information listed in the catalog. Your use of the directory is solely at your own risk.
          </p>
        </section>

        <hr className={`${t.border}`} />

        {/* Contact */}
        <section className="space-y-3">
          <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2.5 ${t.textPrimary}`}>
            <HelpCircle size={18} className="text-cyan-400" />
            6. Changes to Terms & Contact Information
          </h2>
          <p className={`text-[14px] leading-relaxed font-light mb-4 ${t.textSecondary}`}>
            We reserve the right to modify these terms at any time. Changes will be posted directly to this page with an updated "Last updated" date.
          </p>
          <p className={`text-[14px] leading-relaxed font-light ${t.textSecondary}`}>
            If you have any questions or feedback regarding these terms, please contact us:
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <a
              href="https://github.com/Frozen-47/AiVerse"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${t.surface2} ${t.border} ${t.textPrimary} hover:border-cyan-500/20`}
            >
              GitHub Project
            </a>
            <a
              href="https://discord.com/users/1272910357517701147"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${t.surface2} ${t.border} ${t.textPrimary} hover:border-cyan-500/20`}
            >
              Discord Server
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
