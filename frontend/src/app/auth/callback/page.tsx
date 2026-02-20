"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error getting session:", error);
        router.push("/login?error=auth_failed");
        return;
      }
      
      if (session) {
        // Get user profile to determine role and onboarding status
        const { data: profile } = await supabase
          .from("profiles")
          .select("role, full_name, onboarding_complete")
          .eq("id", session.user.id)
          .single();
        
        if (profile) {
          // AuthContext will handle the redirect based on role and onboarding status
          if (!profile.onboarding_complete) {
            router.push("/onboarding");
          } else if (profile.role === "teacher") {
            router.push("/teacher/dashboard");
          } else {
            router.push("/student/dashboard");
          }
        } else {
          // No profile yet, go to onboarding
          router.push("/onboarding");
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
