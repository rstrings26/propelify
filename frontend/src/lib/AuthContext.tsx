"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  profile: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    const initAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          await loadProfile(session.user.id);
        }
      } catch (error) {
        console.error("Error loading session:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadProfile(session.user.id);
        } else {
          setProfile(null);
          // Clear localStorage
          if (typeof window !== "undefined") {
            localStorage.removeItem("userRole");
            localStorage.removeItem("studentName");
            localStorage.removeItem("userSession");
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId: string) => {
    let { data: profileData, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    // If profile doesn't exist, create it from user metadata
    if (error && error.code === 'PGRST116') {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const metadata = user.user_metadata || {};
        const hasRegionSchool = metadata.region_school && metadata.region_school !== '';
        
        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert({
            id: userId,
            full_name: metadata.full_name || metadata.name || "",
            role: "student",
            region_school: metadata.region_school || "",
            // If region_school exists, user filled manual form, skip onboarding
            onboarding_complete: hasRegionSchool,
            level: metadata.level || "O Level",
          })
          .select()
          .single();

        if (newProfile) {
          profileData = newProfile;
        } else if (createError) {
          console.error("Error creating profile:", createError);
        }
      }
    }

    if (profileData) {
      setProfile(profileData);
      
      // Update localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("userRole", profileData.role || "student");
        localStorage.setItem("studentName", profileData.full_name || "User");
      }
    } else if (error && error.code !== 'PGRST116') {
      console.error("Error loading profile:", error);
    }
  };

  const signOut = async () => {
    try {
      // First, clear local state
      setUser(null);
      setProfile(null);
      
      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.clear();
      }
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      }
      
      // Redirect to landing page
      router.push("/");
    } catch (error) {
      console.error("Error during sign out:", error);
      // Still redirect even if there's an error
      router.push("/");
    }
  };

  // Auto-redirect based on auth state and route
  useEffect(() => {
    if (loading) return;

    const publicRoutes = ["/", "/login", "/signup", "/auth/callback", "/past-papers"];
    const isPublicRoute = publicRoutes.includes(pathname || "");

    // If not logged in and trying to access protected route
    if (!user && !isPublicRoute) {
      router.push("/login");
      return;
    }

    // If logged in and on public auth routes, redirect to appropriate dashboard
    if (user && profile && (pathname === "/login" || pathname === "/signup")) {
      redirectToDashboard();
      return;
    }

    // If logged in but onboarding not complete (Google OAuth users), redirect to onboarding
    if (user && profile && !profile.onboarding_complete && pathname !== "/onboarding" && !isPublicRoute) {
      router.push("/onboarding");
    }
  }, [user, profile, loading, pathname]);

  const redirectToDashboard = () => {
    if (!profile) return;

    if (profile.role === "teacher") {
      router.push("/teacher/dashboard");
    } else if (profile.role === "admin") {
      router.push("/admin/dashboard");
    } else {
      if (profile.onboarding_complete) {
        router.push("/student/dashboard");
      } else {
        router.push("/onboarding");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
