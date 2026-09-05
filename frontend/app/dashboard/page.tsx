"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";

import { API_URL } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
          router.replace("/login");
          return;
        }
        setAuthenticated(true);
      } catch {
        router.replace("/login");
      } finally {
        setCheckingAuth(false);
      }
    }
    checkAuthentication();
  }, [router]);

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-300" />
          <p className="mt-4 text-sm text-gray-500">Verifying...</p>
        </div>
      </main>
    );
  }

  if (!authenticated) return null;

  return <DashboardShell />;
}