"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            console.error("Error exchanging auth code:", exchangeError);
            router.push("/login?error=auth_failed");
            return;
          }
        } else if (window.location.hash) {
          const hashParams = new URLSearchParams(window.location.hash.slice(1));
          const accessToken = hashParams.get("access_token");
          const refreshToken = hashParams.get("refresh_token");

          if (accessToken && refreshToken) {
            const { error: setSessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (setSessionError) {
              console.error("Error setting session from hash:", setSessionError);
              router.push("/login?error=auth_failed");
              return;
            }
          }
        }

        if (window.location.hash) {
          window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
        }
      } catch (error) {
        console.error("Error handling auth callback:", error);
        router.push("/login?error=auth_failed");
        return;
      }

      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error getting session:", error);
        router.push("/login?error=auth_failed");
        return;
      }
      
      if (session) {
        // Get user profile to determine role
        const { data: profile } = await supabase
          .from("profiles")
          .select("role, full_name")
          .eq("id", session.user.id)
          .single();
        
        if (profile) {
          // Redirect based on role (no onboarding)
          if (profile.role === "teacher") {
            router.push("/teacher/dashboard");
          } else if (profile.role === "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/student/dashboard");
          }
        } else {
          // No profile yet, go directly to student dashboard
          router.push("/student/dashboard");
        }
      } else {
        router.push("/login");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}
