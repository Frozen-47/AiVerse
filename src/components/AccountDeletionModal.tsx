import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ShieldAlert, Shield, X, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useTheme } from "../lib/theme";
import { supabase } from "../lib/supabase";
import { parseProfileMeta, type OnboardingProfile } from "../lib/onboarding";

interface AccountDeletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onboardingProfile?: OnboardingProfile | null;
  onStatusChange?: (requested: boolean) => void;
}

export const AccountDeletionModal: React.FC<AccountDeletionModalProps> = ({
  isOpen,
  onClose,
  onboardingProfile = null,
  onStatusChange,
}) => {
  const { user } = useAuth();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "amoled";

  const [deletionRequested, setDeletionRequested] = useState(false);
  const [deletionReason, setDeletionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const parsedMeta = React.useMemo(
    () => parseProfileMeta(onboardingProfile?.referralSource),
    [onboardingProfile?.referralSource]
  );

  // Sync deletion status whenever user or metadata changes
  useEffect(() => {
    if (parsedMeta || user) {
      const isReq = Boolean(
        (parsedMeta as any)?.deletionRequested ||
        (parsedMeta as any)?.deletion_requested ||
        (user?.user_metadata as any)?.deletionRequested
      );
      setDeletionRequested(isReq);

      const existingReason =
        (parsedMeta as any)?.deletionReason ||
        (user?.user_metadata as any)?.deletionReason ||
        "";
      if (existingReason && !deletionReason) {
        setDeletionReason(existingReason);
      }
    }
  }, [parsedMeta, user]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleRequestDeletion = async () => {
    if (!user) return;
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const reasonTrimmed = deletionReason.trim();

      // 1. Try calling the dedicated RPC
      try {
        await supabase.rpc("request_account_deletion", {
          reason: reasonTrimmed,
        });
      } catch (e) {
        console.warn("request_account_deletion RPC fallback:", e);
      }

      // 2. Persist to user_preferences
      const userKey = user.id.startsWith("supabase_") ? user.id : `supabase_${user.id}`;
      const { data: prefData } = await supabase
        .from("user_preferences")
        .select("referral_source")
        .or(`user_key.eq.${userKey},user_key.eq.${user.id}`)
        .maybeSingle();

      let meta: any = {};
      if (prefData?.referral_source) {
        try {
          meta = JSON.parse(prefData.referral_source);
        } catch {
          meta = { source: prefData.referral_source };
        }
      } else if (onboardingProfile?.referralSource) {
        try {
          meta = JSON.parse(onboardingProfile.referralSource);
        } catch {}
      }

      meta.deletionRequested = true;
      meta.deletionReason = reasonTrimmed;
      meta.deletionRequestedAt = new Date().toISOString();

      await supabase
        .from("user_preferences")
        .upsert(
          {
            user_key: userKey,
            role: (onboardingProfile?.role as string) || "developer",
            interests: onboardingProfile?.interests || [],
            referral_source: JSON.stringify(meta),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_key" }
        );

      // 3. Persist to auth user_metadata
      try {
        await supabase.auth.updateUser({
          data: {
            ...user.user_metadata,
            deletionRequested: true,
            deletionReason: reasonTrimmed,
            deletionRequestedAt: meta.deletionRequestedAt,
          },
        });
      } catch {}

      setDeletionRequested(true);
      onStatusChange?.(true);
      setFeedback({
        type: "success",
        message: "Deletion request submitted. An administrator will review and process your request.",
      });
    } catch (err: any) {
      console.error("Account deletion request error:", err);
      setFeedback({
        type: "error",
        message: err.message || "Failed to submit deletion request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelDeletionRequest = async () => {
    if (!user) return;
    setIsSubmitting(true);
    setFeedback(null);
    try {
      try {
        await supabase.rpc("cancel_account_deletion_request");
      } catch (e) {
        console.warn("cancel_account_deletion_request RPC fallback:", e);
      }

      const userKey = user.id.startsWith("supabase_") ? user.id : `supabase_${user.id}`;
      const { data: prefData } = await supabase
        .from("user_preferences")
        .select("referral_source")
        .or(`user_key.eq.${userKey},user_key.eq.${user.id}`)
        .maybeSingle();

      let meta: any = {};
      if (prefData?.referral_source) {
        try {
          meta = JSON.parse(prefData.referral_source);
        } catch {}
      }

      delete meta.deletionRequested;
      delete meta.deletion_requested;
      delete meta.deletionReason;
      delete meta.deletion_reason;
      delete meta.deletionRequestedAt;
      delete meta.deletion_requested_at;

      await supabase
        .from("user_preferences")
        .update({
          referral_source: JSON.stringify(meta),
          updated_at: new Date().toISOString(),
        })
        .or(`user_key.eq.${userKey},user_key.eq.${user.id}`);

      try {
        await supabase.auth.updateUser({
          data: {
            ...user.user_metadata,
            deletionRequested: false,
            deletionReason: "",
            deletionRequestedAt: null,
          },
        });
      } catch {}

      setDeletionRequested(false);
      onStatusChange?.(false);
      setFeedback({
        type: "info",
        message: "Your account deletion request has been withdrawn.",
      });
    } catch (err: any) {
      console.error("Cancel deletion request error:", err);
      setFeedback({
        type: "error",
        message: err.message || "Failed to cancel deletion request.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-deletion-title"
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div
        className={`relative w-full max-w-lg p-6 sm:p-7 rounded-3xl shadow-2xl space-y-4 my-auto max-h-[92vh] overflow-y-auto border transition-all animate-[fadeIn_0.15s_ease-out] ${
          isDark
            ? "bg-[#1e1f20] border-[#3c4043] text-white"
            : "bg-white border-[#dadce0] text-neutral-900"
        }`}
        style={{
          boxShadow: isDark
            ? "0 25px 60px -15px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.08)"
            : "0 25px 60px -15px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.06)",
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-40"
          title="Close dialog (Esc)"
        >
          <X size={16} />
        </button>

        {/* Header with Icon */}
        <div className="flex items-center gap-3.5 pr-8">
          <div className="w-11 h-11 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 border border-red-500/20 shadow-xs">
            <ShieldAlert size={22} className="stroke-[2.2px]" />
          </div>
          <div>
            <h3 id="account-deletion-title" className="text-base sm:text-lg font-bold tracking-tight">
              {deletionRequested ? "Account Deletion Request" : "Request Account Deletion"}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Platform Administrator Approval Required
            </p>
          </div>
        </div>

        {/* Security Policy Information Box */}
        <div
          className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
            isDark
              ? "bg-[#131314] border-[#3c4043] text-neutral-300"
              : "bg-[#f8fafd] border-[#c2e7ff] text-[#001d35]"
          }`}
        >
          <div className="flex items-center gap-2 font-semibold">
            <Shield size={14} className={isDark ? "text-[#a8c7fa]" : "text-[#1a73e8]"} />
            <span>Security & Governance Policy</span>
          </div>
          <p className="text-[11.5px] leading-relaxed opacity-90 font-light">
            Under platform security policy, regular users do not have permission to delete accounts directly. An account deletion request must be reviewed and approved by a platform administrator.
          </p>
        </div>

        {/* Feedback Alert if present */}
        {feedback && (
          <div
            className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              feedback.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                : feedback.type === "error"
                ? "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
                : "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 size={14} className="shrink-0" />
            ) : (
              <AlertTriangle size={14} className="shrink-0" />
            )}
            <span className="flex-1 leading-relaxed">{feedback.message}</span>
          </div>
        )}

        {/* Modal Body: Active Pending Request vs New Request Form */}
        {deletionRequested ? (
          <div className="space-y-4 pt-1">
            <div className="p-3.5 rounded-2xl border border-amber-500/25 bg-amber-500/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                <Clock size={14} />
                <span>Your deletion request is currently pending administrator review</span>
              </div>
              {deletionReason ? (
                <div className="text-[11.5px] text-neutral-600 dark:text-neutral-300 font-light">
                  <span className="font-medium text-neutral-700 dark:text-neutral-200">Submitted reason: </span>
                  <span className="italic">"{deletionReason}"</span>
                </div>
              ) : null}
            </div>

            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Once approved by an administrator, your credentials in <strong className="text-neutral-700 dark:text-neutral-200 font-medium">auth.users</strong>, bookmarks, ratings, and profile links will be permanently purged. You may withdraw this request at any time prior to approval.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium border border-neutral-300 dark:border-[#3c4043] hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleCancelDeletionRequest}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-200 border border-neutral-300 dark:border-[#3c4043] hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Cancelling..." : "Cancel Deletion Request"}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <p className="text-xs text-neutral-600 dark:text-neutral-300 font-medium">
                Upon administrator approval:
              </p>
              <ul className="text-[11.5px] text-neutral-500 dark:text-neutral-400 space-y-1 list-disc list-inside">
                <li>
                  Your login credentials in <strong className="text-neutral-700 dark:text-neutral-200 font-medium">auth.users</strong> will be permanently purged.
                </li>
                <li>Saved bookmarks, ratings, and profile links will be wiped.</li>
                <li>This action cannot be undone once approved.</li>
              </ul>
            </div>

            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
                Reason for deletion (optional)
              </label>
              <textarea
                rows={3}
                value={deletionReason}
                onChange={(e) => setDeletionReason(e.target.value)}
                placeholder="Tell the administrator why you are requesting account deletion..."
                className={`w-full p-3 rounded-2xl border text-xs resize-none outline-none transition-all ${
                  isDark
                    ? "bg-[#131314] border-[#3c4043] text-white placeholder:text-neutral-500 focus:border-[#a8c7fa]"
                    : "bg-white border-[#dadce0] text-neutral-900 placeholder:text-neutral-400 focus:border-[#1a73e8]"
                }`}
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium border border-neutral-300 dark:border-[#3c4043] hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Keep Account
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleRequestDeletion}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] text-white dark:text-[#041e49] transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
              >
                {isSubmitting ? "Submitting..." : "Submit Deletion Request"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
};
