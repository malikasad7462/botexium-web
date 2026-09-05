"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

const API_URL = "http://localhost:5000";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
      setEmail("");
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
          {/* Back Button */}
          <button
            onClick={() => router.push("/login")}
            className="mb-6 flex items-center gap-2 text-sm text-gray-400 transition hover:text-cyan-300"
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </button>

          <div className="mb-8">
            <span className="BOTEXIUM-label">BOTEXIUM ECOSYSTEM</span>

            <h1 className="hero-title mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Forgot Password
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {success ? (
            // Success Message
            <div className="space-y-4">
              <div className="rounded-xl border border-green-400/20 bg-green-400/[0.06] p-4 text-center">
                <CheckCircle className="mx-auto mb-3 h-12 w-12 text-green-400" />
                <h3 className="text-lg font-semibold text-green-300">
                  Check Your Email
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  We've sent a password reset link to your email address.
                  Please check your inbox and follow the instructions.
                </p>
              </div>

              <button
                onClick={() => router.push("/login")}
                className="premium-btn w-full justify-center py-3.5 text-sm"
              >
                Return to Sign In
              </button>
            </div>
          ) : (
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

              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="premium-btn w-full justify-center py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            Remember your password?{" "}
            <a
              href="/login"
              className="font-semibold text-cyan-300 transition hover:text-cyan-200"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}