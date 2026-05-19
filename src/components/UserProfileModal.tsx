import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { fetchProfileByUsername, type PublicBuilderProfile } from "../lib/supabase";
import { useTokens } from "../lib/theme";
import { roleLabel } from "../lib/onboarding";
import { useAuth } from "./AuthContext";

interface UserProfileModalProps {
  username: string;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  username,
  onClose,
}) => {
  const t = useTokens();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<PublicBuilderProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if this profile belongs to the signed-in user
  const isOwnProfile =
    user?.user_metadata?.username?.toLowerCase() === username.toLowerCase();

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    // If it's the signed-in user's own profile, populate from user_metadata directly
    if (isOwnProfile) {
      const meta = user?.user_metadata;
      setProfile({
        userKey: user?.id || "",
        displayName: meta?.firstName || "Builder",
        username: meta?.username || username,
        description: meta?.description || "",
        github: meta?.github || "",
        linkedin: meta?.linkedin || "",
        medium: meta?.medium || "",
        devto: meta?.devto || "",
        portfolio: meta?.portfolio || "",
        role: meta?.role || "Developer",
        interests: meta?.interests || [],
      });
      setLoading(false);
      return;
    }

    // Otherwise, fetch from public Supabase preferences table
    fetchProfileByUsername(username)
      .then((data) => {
        if (!active) return;
        if (data) {
          setProfile(data);
        } else {
          setError(`No profile found for ${username}`);
        }
      })
      .catch(() => {
        if (active) setError("Could not load developer profile.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [username, isOwnProfile, user]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const initials = profile?.displayName
    ? profile.displayName.slice(0, 2).toUpperCase()
    : username.slice(1, 3).toUpperCase();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden p-6 ${t.modal} ${t.border} animate-[fadeUp_0.25s_ease-out]`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full border transition-all hover:scale-105 active:scale-95 cursor-pointer ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textPrimary}`}
          aria-label="Close profile"
        >
          <X size={15} />
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 size={32} className="animate-spin text-cyan-400" />
            <p className={`text-sm ${t.textMuted}`}>Retrieving builder profile...</p>
          </div>
        ) : error || !profile ? (
          <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-lg font-bold">
              !
            </div>
            <div>
              <p className={`text-base font-bold ${t.textPrimary}`}>Profile Unavailable</p>
              <p className={`text-xs ${t.textMuted} mt-1 max-w-[280px]`}>
                {error || "This builder hasn't set up a public profile page yet."}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textPrimary}`}
            >
              Go Back
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Header: Avatar, Name & Handles */}
            <div className="flex items-center gap-4 mt-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-linear-to-br from-cyan-500 via-blue-600 to-indigo-600 text-white font-extrabold text-xl shadow-lg border-2 border-white/10 shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <h3 className={`text-lg font-black leading-tight truncate ${t.textPrimary}`}>
                  {profile.displayName}
                </h3>
                <span className="inline-block text-xs font-bold text-cyan-400 mt-0.5">
                  {profile.username}
                </span>
                <span className={`block text-[10px] uppercase font-bold tracking-wider opacity-60 ${t.textMuted} mt-0.5`}>
                  {profile.role ? roleLabel(profile.role as any) : "AiVerse Builder"}
                </span>
              </div>
            </div>

            {/* Description / Bio */}
            {profile.description && (
              <div className="mt-5">
                <p className={`text-xs ${t.textMuted} uppercase tracking-wider font-bold`}>Bio</p>
                <div className={`mt-1.5 p-3 rounded-2xl border text-xs leading-relaxed italic ${t.surface} ${t.border} ${t.textSecondary}`}>
                  "{profile.description}"
                </div>
              </div>
            )}

            {/* Interests / Tags */}
            {profile.interests && profile.interests.length > 0 && (
              <div className="mt-5">
                <p className={`text-xs ${t.textMuted} uppercase tracking-wider font-bold`}>
                  Focus Areas
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {profile.interests.map((interest) => (
                    <span
                      key={interest}
                      className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border bg-white/5 border-white/5 ${t.textSecondary}`}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links Row */}
            {(profile.github ||
              profile.linkedin ||
              profile.medium ||
              profile.devto ||
              profile.portfolio) && (
              <div className="mt-5 border-t border-white/5 pt-4">
                <p className={`text-xs ${t.textMuted} uppercase tracking-wider font-bold`}>
                  Find Builder On
                </p>
                <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/5 text-xs font-medium"
                      title="GitHub"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                  )}
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-[#0a66c2] transition-colors border border-white/5 text-xs font-medium"
                      title="LinkedIn"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {profile.medium && (
                    <a
                      href={profile.medium}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/5 text-xs font-medium"
                      title="Medium"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zm3.04 0c0 3.24-.32 5.87-.71 5.87s-.72-2.63-.72-5.87.32-5.87.72-5.87.71 2.63.71 5.87z" />
                      </svg>
                      <span>Medium</span>
                    </a>
                  )}
                  {profile.devto && (
                    <a
                      href={profile.devto}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/5 text-xs font-medium"
                      title="Dev.to"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 448 512" fill="currentColor">
                        <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM304.14 0H43.86C19.63 0 0 19.63 0 43.86v424.28C0 492.37 19.63 512 43.86 512h360.28c24.23 0 43.86-19.63 43.86-43.86V43.86C448 19.63 428.37 0 304.14 0zM151.05 311.77c0 12.18-4.85 21.78-14.55 28.8-9.7 7.03-22.66 10.54-38.89 10.54H62.22V175.12h35.39c16.23 0 29.19 3.51 38.89 10.54 9.7 7.03 14.55 16.62 14.55 28.8v97.31zm102.3-120.87h-64.44v45.48h51.38v28.29h-51.38v46.12h64.44v28.31H158.46V162.5h94.89v28.4zm102.3 124.36c0 18.28-5.97 32.5-17.9 42.66-11.93 10.16-28.31 15.24-49.13 15.24-20.82 0-37.2-5.08-49.13-15.24-11.93-10.16-17.9-24.38-17.9-42.66v-96.1h32.93v95.82c0 9.57 2.74 16.8 8.22 21.68 5.48 4.88 13.78 7.32 24.89 7.32s19.41-2.44 24.89-7.32c5.48-4.88 8.22-12.11 8.22-21.68v-95.82h32.93v96.1z" />
                      </svg>
                      <span>Dev.to</span>
                    </a>
                  )}
                  {profile.portfolio && (
                    <a
                      href={profile.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-cyan-400 transition-colors border border-white/5 text-xs font-medium"
                      title="Portfolio"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      <span>Portfolio</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Edit Profile Action (if own profile) */}
          </div>
        )}
      </div>
    </div>
  );
};
