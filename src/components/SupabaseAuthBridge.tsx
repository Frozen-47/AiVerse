import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { bindSupabaseAuth } from "../lib/supabase";

/** Forwards Clerk session JWTs to Supabase so RLS can match clerk_<sub> user keys. */
export function SupabaseAuthBridge() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    bindSupabaseAuth(async () => {
      if (!isLoaded || !isSignedIn) return null;
      const template = import.meta.env.VITE_CLERK_SUPABASE_JWT_TEMPLATE;
      try {
        if (template) {
          return await getToken({ template });
        }
        return await getToken();
      } catch {
        return null;
      }
    });
  }, [getToken, isLoaded, isSignedIn]);

  return null;
}
