"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  ChevronDown,
  Eye,
  EyeOff,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { CountrySelect } from '@/components/ui/CountrySelect';

import { API_URL } from "@/lib/api";

function generateCaptcha() {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let result = "";

  for (let i = 0; i < 5; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return result;
}

export default function RegisterPage() {
  const router = useRouter();

  const [referralCode, setReferralCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [country, setCountry] = useState("Pakistan");
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");
  if (ref) {
    setReferralCode(ref.toUpperCase());
  }
  setCaptcha(generateCaptcha());
}, []); // ✅ Empty array = sirf ek baar chalega

  function refreshCaptcha() {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (!name.trim()) {
        throw new Error("Please enter your full name.");
      }

      if (!email.trim()) {
        throw new Error("Please enter your email address.");
      }

      if (!country) {
        throw new Error("Please select your country.");
      }

      if (password.length < 8) {
        throw new Error(
          "Password must be at least 8 characters."
        );
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      if (!captchaInput.trim()) {
        throw new Error("Please enter the security code.");
      }

      if (
        captchaInput.trim().toUpperCase() !==
        captcha.toUpperCase()
      ) {
        refreshCaptcha();

        throw new Error(
          "Invalid security code. Please try again."
        );
      }

      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            country,
            password,
            referralCode:
              referralCode.trim() || undefined,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Registration failed"
        );
      }

      setMessage(
        "Registration successful! Redirecting to sign in..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }


  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--BOTEXIUM-bg)] px-5 py-10 text-white">
      <div className="w-full max-w-md">
        <div className="glass-card-static p-7 sm:p-9">

          {/* HEADER */}

          <div className="mb-8">
            <span className="BOTEXIUM-label">
              BOTEXIUM ECOSYSTEM
            </span>

            <h1 className="hero-title mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Create Your Account
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Join the BOTEXIUM digital ecosystem and create your
              member account.
            </p>
          </div>

          {/* REFERRAL NOTICE */}

          {referralCode && (
            <div className="mb-6 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.05] px-4 py-3 text-sm text-cyan-300">
              Referral Code:{" "}
              <strong>{referralCode}</strong>
            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* FULL NAME */}

            <div>
              <label
                htmlFor="name"
                className="text-xs font-semibold tracking-wide text-gray-400"
              >
                FULL NAME
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                autoComplete="name"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/40 focus:bg-white/[0.06]"
                placeholder="Enter your full name"
              />
            </div>

            {/* EMAIL */}

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
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/40 focus:bg-white/[0.06]"
                placeholder="you@example.com"
              />
            </div>

                 {/* COUNTRY */}
           <div>
            <label className="text-xs font-semibold tracking-wide text-gray-400">
               COUNTRY
             </label>
              <div className="mt-2">
               <CountrySelect
                value={country}
                onChange={(value) => setCountry(value)}
               />
             </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label
                htmlFor="password"
                className="text-xs font-semibold tracking-wide text-gray-400"
              >
                PASSWORD
              </label>

              <div className="relative mt-2">
                <input
                  id="password"
                  type={
                    showPassword ? "text" : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/40 focus:bg-white/[0.06]"
                  placeholder="Create a password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (value) => !value
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-cyan-300"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <p className="mt-2 text-[10px] text-gray-600">
                Minimum 8 characters.
              </p>
            </div>

            {/* CONFIRM PASSWORD */}

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
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  autoComplete="new-password"
                  required
                  className={`w-full rounded-xl border bg-white/[0.04] px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:bg-white/[0.06] ${
                    confirmPassword &&
                    password !== confirmPassword
                      ? "border-red-400/40 focus:border-red-400/50"
                      : confirmPassword &&
                          password ===
                            confirmPassword
                        ? "border-green-400/30 focus:border-green-400/40"
                        : "border-white/10 focus:border-cyan-400/40"
                  }`}
                  placeholder="Confirm your password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (value) => !value
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-cyan-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {confirmPassword &&
                password !== confirmPassword && (
                  <p className="mt-2 text-[10px] text-red-300">
                    Passwords do not match.
                  </p>
                )}

              {confirmPassword &&
                password === confirmPassword && (
                  <p className="mt-2 text-[10px] text-green-300">
                    Passwords match.
                  </p>
                )}
            </div>

            {/* REFERRAL CODE */}

            <div>
              <label
                htmlFor="referralCode"
                className="text-xs font-semibold tracking-wide text-gray-400"
              >
                REFERRAL CODE{" "}
                <span className="text-gray-600">
                  (OPTIONAL)
                </span>
              </label>

              <input
                id="referralCode"
                type="text"
                value={referralCode}
                onChange={(e) =>
                  setReferralCode(
                    e.target.value.toUpperCase()
                  )
                }
                autoComplete="off"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-mono text-sm tracking-wider text-white uppercase outline-none transition placeholder:text-gray-600 focus:border-cyan-400/40 focus:bg-white/[0.06]"
                placeholder="Optional"
              />
            </div>

            {/* CAPTCHA */}

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="captcha"
                  className="text-xs font-semibold tracking-wide text-gray-400"
                >
                  SECURITY VERIFICATION
                </label>

                <ShieldCheck
                  size={15}
                  className="text-cyan-300"
                />
              </div>

              <div className="flex gap-2">
                <div className="relative flex h-[46px] flex-1 select-none items-center justify-center overflow-hidden rounded-xl border border-cyan-400/15 bg-cyan-400/[0.04] font-mono text-lg font-bold tracking-[7px] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,.05)]">
                  <span className="relative z-10">
                    {captcha}
                  </span>

                  <span className="absolute left-0 top-1/2 h-px w-full rotate-[-8deg] bg-cyan-300/10" />

                  <span className="absolute left-0 top-1/2 h-px w-full rotate-[8deg] bg-cyan-300/10" />
                </div>

                <button
                  type="button"
                  onClick={refreshCaptcha}
                  aria-label="Refresh security code"
                  className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.05] hover:text-cyan-300"
                >
                  <RefreshCw size={16} />
                </button>
              </div>

              <input
                id="captcha"
                type="text"
                value={captchaInput}
                onChange={(e) =>
                  setCaptchaInput(
                    e.target.value.toUpperCase()
                  )
                }
                autoComplete="off"
                required
                maxLength={5}
                className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-mono text-sm tracking-[3px] text-white uppercase outline-none transition placeholder:text-gray-600 focus:border-cyan-400/40 focus:bg-white/[0.06]"
                placeholder="ENTER SECURITY CODE"
              />

              <p className="mt-2 text-[10px] leading-5 text-gray-600">
                Enter the security code shown above.
              </p>
            </div>

            {/* ERROR */}

            {error && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm leading-5 text-red-300">
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {message && (
              <div className="rounded-xl border border-green-400/20 bg-green-400/[0.06] px-4 py-3 text-sm leading-5 text-green-300">
                {message}
              </div>
            )}

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="premium-btn w-full justify-center py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          {/* LOGIN LINK */}

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an BOTEXIUM account?{" "}
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