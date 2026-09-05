"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // Add this import

import { API_URL } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Add this

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      router.push("/dashboard");
      
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--BOTEXIUM-bg)] px-5 py-10 text-white">
      <div className="w-full max-w-md">
        <div className="glass-card-static p-7 sm:p-9">
          <div className="mb-8">
            <span className="BOTEXIUM-label">BOTEXIUM ECOSYSTEM</span>

            <h1 className="hero-title mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Welcome Back
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Sign in to access your BOTEXIUM dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="text-xs font-semibold tracking-wide text-gray-400"
              >
                EMAIL ADDRESS
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/40 focus:bg-white/[0.06]"
                placeholder="you@example.com"
              />
            </div>

            {/* PASSWORD FIELD WITH SHOW/HIDE */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold tracking-wide text-gray-400"
                >
                  PASSWORD
                </label>
                {/* Forgot Password Link - Add this */}
                <a
                  href="/forgot-password"
                  className="text-xs text-cyan-300/70 transition hover:text-cyan-300"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="relative mt-2">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/40 focus:bg-white/[0.06]"
                  placeholder="Enter your password"
                />

                {/* Show/Hide Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-cyan-300"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="premium-btn w-full justify-center py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an BOTEXIUM account?{" "}
            <a
              href="/register"
              className="font-semibold text-cyan-300 transition hover:text-cyan-200"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}