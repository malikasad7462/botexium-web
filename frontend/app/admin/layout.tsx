"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });
        const data = await res.json();

        if (!data.success || !data.user) {
          router.replace("/login");
          return;
        }

        // ✅ Admin role check
        if (!["ADMIN", "SUPER_ADMIN"].includes(data.user.role)) {
          router.replace("/dashboard");
          return;
        }

        setAuthorized(true);
      } catch {
        router.replace("/login");
      } finally {
        setChecking(false);
      }
    }

    checkAdmin();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-300" />
          <p className="mt-4 text-gray-500">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
}