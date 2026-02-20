"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams?.get("error");
    const msg = searchParams?.get("message");
    if (error) setError("Authentication failed. Please try again.");
    if (msg === "confirm_email") setMessage("Please check your email to confirm your account.");
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (signInError) {
        if (signInError.message.includes("Email not confirmed")) {
          setError("Please verify your email address before logging in. Check your inbox.");
        } else {
          setError(signInError.message);
        }
        setLoading(false);
        return;
      }

      if (data.session) {
        // Fetch user role from profiles table
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role, full_name, onboarding_complete")
          .eq("id", data.user.id)
          .single();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          setError("Failed to fetch user profile");
          setLoading(false);
          return;
        }

        // The AuthContext will handle the redirect automatically
        // Just refresh to trigger the context
        window.location.href = profile?.role === "teacher" ? "/teacher/dashboard" :
                               profile?.role === "admin" ? "/admin/dashboard" :
                               !profile?.onboarding_complete ? "/onboarding" :
                               "/student/dashboard";
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Failed to initiate Google login");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-pink-50 relative overflow-hidden">
      {/* Home Button */}
      <Link href="/" className="absolute top-6 left-6 z-10 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 text-brand-burgundy font-semibold rounded-lg hover:bg-white transition-all shadow-sm">
        ← Home
      </Link>
      
      {/* Scattered geometric shapes and A/O Levels text */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top left circle */}
        <div className="absolute top-8 left-8 w-32 h-32 bg-brand-light rounded-full opacity-60 animate-pulse" style={{ animationDuration: '3s' }} />
        {/* Top right triangle */}
        <div className="absolute top-4 right-24 w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-brand-blue/30 opacity-70 animate-bounce" style={{ animationDuration: '4s' }} />
        {/* Bottom left diamond */}
        <div className="absolute bottom-16 left-16 w-20 h-20 bg-brand-red rotate-45 opacity-60 animate-pulse" style={{ animationDuration: '3.5s' }} />
        {/* Bottom right quarter circle */}
        <div className="absolute bottom-8 right-8 w-32 h-32 bg-brand-yellow rounded-tl-[100px] opacity-60" />
        {/* Center left pink block */}
        <div className="absolute top-1/2 left-8 w-24 h-48 bg-brand-pink rounded-tr-[70px] rounded-br-[70px] opacity-50 -translate-y-1/2 animate-pulse" style={{ animationDuration: '4s' }} />
        {/* Center right outlined square */}
        <div className="absolute top-1/2 right-24 w-20 h-20 border-[8px] border-brand-pink bg-white/70 opacity-60 -translate-y-1/2" />
        {/* Random O/A Levels text */}
        <span className="absolute top-20 left-1/2 text-5xl font-black text-brand-burgundy opacity-10 select-none" style={{ transform: 'rotate(-12deg)' }}>O LEVELS</span>
        <span className="absolute bottom-24 right-1/2 text-4xl font-black text-brand-pink opacity-10 select-none" style={{ transform: 'rotate(8deg)' }}>A LEVELS</span>
        <span className="absolute top-1/3 right-12 text-3xl font-black text-brand-blue opacity-10 select-none" style={{ transform: 'rotate(-6deg)' }}>O LEVELS</span>
        <span className="absolute bottom-1/4 left-1/3 text-3xl font-black text-brand-yellow opacity-10 select-none" style={{ transform: 'rotate(10deg)' }}>A LEVELS</span>
      </div>

      {/* Login Card */}
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md z-10 relative border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-brand-burgundy mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 p-3.5 rounded-xl focus:border-brand-red focus:outline-none transition-colors"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 p-3.5 rounded-xl focus:border-brand-red focus:outline-none transition-colors"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}
          
          {message && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
              <p className="text-green-700 text-sm font-medium">{message}</p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-brand-red hover:bg-brand-burgundy text-white py-3.5 rounded-xl font-semibold text-lg transition-all transform hover:scale-[1.02] shadow-lg"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 py-3.5 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
          disabled={loading}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </Button>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-brand-red font-semibold hover:text-brand-burgundy transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
