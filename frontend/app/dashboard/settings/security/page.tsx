"use client";

import { useState, useEffect } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { 
  Shield, 
  Key, 
  Smartphone, 
  Globe, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle,
  QrCode,
  RefreshCw
} from "lucide-react";
import { GlassCard } from "@/components/dashboard/GlassCard";

import { API_URL } from "@/lib/api";

export default function SecurityPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 2FA States
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorSecret, setTwoFactorSecret] = useState("");
  const [twoFactorQR, setTwoFactorQR] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);

  // Check 2FA Status
  useEffect(() => {
    async function check2FAStatus() {
      try {
        const res = await fetch(`${API_URL}/api/auth/2fa/status`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setTwoFactorEnabled(data.enabled);
        }
      } catch (error) {
        console.error("2FA status check failed:", error);
      }
    }
    check2FAStatus();
  }, []);

  // Enable 2FA
  const handleEnable2FA = async () => {
    setTwoFactorLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/auth/2fa/enable`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to enable 2FA");
      }

      setTwoFactorSecret(data.secret);
      setTwoFactorQR(data.qrCode);
      setShow2FASetup(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setTwoFactorLoading(false);
    }
  };

  // Verify 2FA
  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setTwoFactorLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/auth/2fa/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token: otpToken }),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Invalid OTP code");
      }

      setTwoFactorEnabled(true);
      setShow2FASetup(false);
      setMessage("2FA enabled successfully!");
      setOtpToken("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setTwoFactorLoading(false);
    }
  };

  // Disable 2FA
  const handleDisable2FA = async () => {
    if (!confirm("Are you sure you want to disable 2FA?")) return;

    setTwoFactorLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/auth/2fa/disable`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to disable 2FA");
      }

      setTwoFactorEnabled(false);
      setMessage("2FA disabled successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setTwoFactorLoading(false);
    }
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to change password.");
      
      setMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div>
          <div className="text-xs font-semibold tracking-[0.16em] text-gray-500 uppercase">
            BOTEXIUM SECURITY
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Security Settings
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Manage your account security and authentication preferences.
          </p>
        </div>

        {/* 2FA Section */}
        <GlassCard className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
              <Smartphone size={20} strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-semibold text-white">Two-Factor Authentication</h3>
                {twoFactorEnabled && (
                  <span className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-semibold text-green-400">
                    ENABLED
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-400">
                {twoFactorEnabled 
                  ? "Your account is protected with 2FA." 
                  : "Add an extra layer of security to your account."}
              </p>

              {!twoFactorEnabled && !show2FASetup && (
                <button 
                  onClick={handleEnable2FA}
                  disabled={twoFactorLoading}
                  className="mt-4 premium-btn text-sm px-6 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {twoFactorLoading ? "Setting up..." : "Enable 2FA"}
                </button>
              )}

              {twoFactorEnabled && (
                <button 
                  onClick={handleDisable2FA}
                  disabled={twoFactorLoading}
                  className="mt-4 border border-red-400/30 text-red-400 hover:bg-red-400/10 rounded-lg px-6 py-2.5 text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {twoFactorLoading ? "Disabling..." : "Disable 2FA"}
                </button>
              )}

              {/* 2FA Setup Flow */}
              {show2FASetup && (
                <div className="mt-4 p-4 rounded-xl bg-[#050816] border border-cyan-500/10">
                  <h4 className="text-sm font-semibold text-white mb-3">Setup 2FA</h4>
                  
                  {twoFactorQR && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-400 mb-2">Scan this QR code with Google Authenticator:</p>
                      <div className="bg-white p-2 rounded-lg inline-block">
                        <img src={twoFactorQR} alt="2FA QR Code" className="w-32 h-32" />
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mb-3">
                    Or enter this secret manually: <span className="font-mono text-cyan-400">{twoFactorSecret}</span>
                  </p>

                  <form onSubmit={handleVerify2FA} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.12em] text-gray-400">
                        ENTER OTP CODE
                      </label>
                      <div className="flex gap-3 mt-2">
                        <input
                          type="text"
                          value={otpToken}
                          onChange={(e) => setOtpToken(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          placeholder="000000"
                          className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40 placeholder:text-gray-600"
                          required
                          maxLength={6}
                        />
                        <button
                          type="submit"
                          disabled={twoFactorLoading || otpToken.length < 6}
                          className="premium-btn px-6 py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {twoFactorLoading ? "Verifying..." : "Verify"}
                        </button>
                      </div>
                    </div>
                  </form>

                  <button
                    onClick={() => {
                      setShow2FASetup(false);
                      setOtpToken("");
                      setTwoFactorQR("");
                      setTwoFactorSecret("");
                    }}
                    className="mt-3 text-sm text-gray-500 hover:text-cyan-400 transition"
                  >
                    Cancel setup
                  </button>
                </div>
              )}
            </div>
          </div>
        </GlassCard>

        {/* Change Password Section */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Key size={20} strokeWidth={1.8} className="text-cyan-300" />
            <h3 className="text-base font-semibold text-white">Change Password</h3>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold tracking-[0.12em] text-gray-400">
                CURRENT PASSWORD
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-cyan-400/40 focus:bg-white/[0.06]"
                placeholder="Enter current password"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-[0.12em] text-gray-400">
                NEW PASSWORD
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-cyan-400/40 focus:bg-white/[0.06]"
                placeholder="Enter new password"
                required
                minLength={8}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-[0.12em] text-gray-400">
                CONFIRM PASSWORD
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`mt-2 w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:bg-white/[0.06] ${
                  confirmPassword && newPassword !== confirmPassword
                    ? "border-red-400/40 focus:border-red-400/50"
                    : confirmPassword && newPassword === confirmPassword
                    ? "border-green-400/30 focus:border-green-400/40"
                    : "border-white/10 focus:border-cyan-400/40"
                }`}
                placeholder="Confirm new password"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <span className="text-sm text-gray-500">
                {showPassword ? "Hide" : "Show"} passwords
              </span>
            </div>

            {message && (
              <div className="flex items-center gap-2 rounded-xl border border-green-400/20 bg-green-400/[0.06] px-4 py-3 text-sm text-green-300">
                <CheckCircle size={16} />
                <span>{message}</span>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="premium-btn w-full justify-center py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </GlassCard>

        {/* Active Sessions - Coming Soon */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Globe size={20} strokeWidth={1.8} className="text-cyan-300" />
            <h3 className="text-base font-semibold text-white">Active Sessions</h3>
            <span className="rounded-full border border-cyan-400/10 bg-cyan-400/[0.04] px-2 py-0.5 text-[9px] font-semibold tracking-[0.08em] text-cyan-300">
              COMING SOON
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Manage active sessions across devices.
          </p>
        </GlassCard>
      </div>
    </DashboardShell>
  );
}