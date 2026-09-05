"use client";

import { FormEvent, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

const API_URL = "http://localhost:5000";

// Inner component that uses useSearchParams
function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  // Validate token on page load
  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setError("Invalid or missing reset token.");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/auth/verify-reset-token?token=${token}`
        );
        const data = await response.json();

        if (response.ok && data.valid) {
          setTokenValid(true);
        } else {
          setTokenValid(false);
          setError(data.message || "Invalid or expired reset token.");
        }
      } catch {
        setTokenValid(false);
        setError("Failed to verify reset token.");
      }
    };

    verifyToken();
  }, [token]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to reset password.");
      }

      setSuccess(true);
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  // Show error if token is invalid
  if (tokenValid === false) {
    return (
      <div className="text-center">
        <AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-400" />
        <h2 className="text-2xl font-bold">Invalid Reset Link</h2>
        <p className="mt-3 text-sm text-gray-400">
          {error || "The password reset link is invalid or has expired."}
        </p>
        <button
          onClick={() => router.push("/forgot-password")}
          className="mt-6 premium-btn w-full justify-center py-3.5 text-sm"
        >
          Request New Link
        </button>
      </div>
    );
  }

  // Show loading while verifying token
  if (tokenValid === null) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
        <p className="text-sm text-gray-400">Verifying reset link...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <span className="apex-label">BOTEXIUM ECOSYSTEM</span>
        <h1 className="hero-title mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Reset Password
        </h1>
        <p className="mt-3 text-sm leading-6 text-gray-400">
          Enter your new password below.
        </p>
      </div>

      {success ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-green-400/20 bg-green-400/[0.06] p-4 text-center">
            <CheckCircle className="mx-auto mb-3 h-12 w-12 text-green-400" />
            <h3 className="text-lg font-semibold text-green-300">
              Password Reset Successful!
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Your password has been updated. Redirecting to login...
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div>
            <label
              htmlFor="password"
              className="text-xs font-semibold tracking-wide text-gray-400"
            >
              NEW PASSWORD
            </label>
            <div className="relative mt-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/40 focus:bg-white/[0.06]"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-cyan-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="mt-2 text-[10px] text-gray-600">
              Minimum 8 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="text-xs font-semibold tracking-wide text-gray-400"
            >
              CONFIRM PASSWORD
            </label>
            <div className="relative mt-2">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`w-full rounded-xl border bg-white/[0.04] px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:bg-white/[0.06] ${
                  confirmPassword && password !== confirmPassword
                    ? "border-red-400/40 focus:border-red-400/50"
                    : confirmPassword && password === confirmPassword
                    ? "border-green-400/30 focus:border-green-400/40"
                    : "border-white/10 focus:border-cyan-400/40"
                }`}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-cyan-300"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="mt-2 text-[10px] text-red-300">
                Passwords do not match.
              </p>
            )}
            {confirmPassword && password === confirmPassword && (
              <p className="mt-2 text-[10px] text-green-300">
                Passwords match.
              </p>
            )}
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
            {loading ? "Resetting..." : "Reset Password"}
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
    </>
  );
}

// Main page component with Suspense boundary
export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--apex-bg)] px-5 py-10 text-white">
      <div className="w-full max-w-md">
        <div className="glass-card-static p-7 sm:p-9">
          <Suspense
            fallback={
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
                <p className="text-sm text-gray-400">Loading...</p>
              </div>
            }
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}