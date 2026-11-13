import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase, getOAuthAvatarUrl } from "../lib/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoaded: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: "signin" | "signup" | "forgot" | "reset") => void;
  closeAuthModal: () => void;
  authMode: "signin" | "signup" | "forgot" | "reset";
  signOut: (redirectTo?: string) => Promise<void>;
  signInWithOAuth: (provider: "google" | "github") => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup" | "forgot" | "reset">("signin");

  const syncOAuthAvatar = async (currentUser: User) => {
    try {
      const realAvatar = getOAuthAvatarUrl(currentUser);
      if (!realAvatar) return;
      const meta = currentUser.user_metadata || {};
      if (!meta.avatar_url || meta.avatar_url.includes("dicebear.com") || meta.avatar_url !== realAvatar) {
        await supabase.auth.updateUser({
          data: {
            ...meta,
            avatar_url: realAvatar,
            avatarUrl: realAvatar,
            picture: realAvatar,
          },
        });
      }
    } catch {
      // Non-critical background sync
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoaded(true);
      if (session?.user) {
        syncOAuthAvatar(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        syncOAuthAvatar(session.user);
      }
      if (event === "PASSWORD_RECOVERY") {
        setAuthMode("reset");
        setIsAuthModalOpen(true);
      }
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        setIsAuthModalOpen(false);
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("aiverse_auth_change", { detail: { event, session } }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const openAuthModal = (mode: "signin" | "signup" | "forgot" | "reset" = "signin") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const signOut = async (redirectTo: string = "/dashboard") => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("Failed to sign out from Supabase:", err);
    } finally {
      setUser(null);
      setSession(null);
      setIsAuthModalOpen(false);

      // Clean local storage user-specific keys and bookmarks
      try {
        localStorage.removeItem("aiverse_bookmarks");
        localStorage.removeItem("vox_chatgpt_sessions");
      } catch {}

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("aiverse_auth_signout"));
        if (redirectTo) {
          if (window.location.pathname === redirectTo && !window.location.search) {
            window.location.reload();
          } else {
            window.location.href = redirectTo;
          }
        }
      }
    }
  };

  const signInWithOAuth = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{
      user, session, isLoaded, isAuthModalOpen, openAuthModal, closeAuthModal, authMode, signOut, signInWithOAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Helper components replacing Clerk's
export const SignedIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoaded } = useAuth();
  if (!isLoaded || !user) return null;
  return <>{children}</>;
};

export const SignedOut: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoaded } = useAuth();
  if (!isLoaded || user) return null;
  return <>{children}</>;
};
