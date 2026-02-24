"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function validatePassword(pw: string) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(pw);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters, include upper and lowercase, a number, and a special character.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Sign up with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: name,
            school: school,
            city: city,
            country: country,
            region_school: `${school}, ${city}, ${country}`
          }
        }
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // Show success message - profile will be created by database trigger or on first login
      setMessage("Signup successful! Please check your email to verify your account.");
      setTimeout(() => {
        router.push("/login?message=confirm_email");
      }, 2000);

    } catch (err) {
      console.error("Signup error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
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
      console.error("Google signup error:", err);
      setError("Failed to initiate Google signup");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-pink-50 to-yellow-50 relative overflow-hidden py-12">
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

      {/* Signup Card */}
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-2xl z-10 relative border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-brand-burgundy mb-2">Join Propel</h1>
          <p className="text-gray-600">Start your O/A Levels journey today</p>
        </div>

        {/* Google Signup Button - Prominent */}
        <Button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 py-3.5 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg mb-6"
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

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">OR SIGN UP WITH EMAIL</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">School</label>
              <input
                type="text"
                placeholder="Your School"
                value={school}
                onChange={e => setSchool(e.target.value)}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
              <input
                type="text"
                placeholder="Your City"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
              <input
                type="text"
                placeholder="Your Country"
                value={country}
                onChange={e => setCountry(e.target.value)}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded-lg">
            <p className="font-semibold mb-1">Password Requirements:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>At least 8 characters</li>
              <li>One uppercase and one lowercase letter</li>
              <li>One number and one special character</li>
            </ul>
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
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-red font-semibold hover:text-brand-burgundy transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
