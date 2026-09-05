import { apiConfig, apiUrl } from "@/config/api";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  referredById: string | null;
  role: string;
  status: string;
  points: number;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: CurrentUser;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const response = await fetch(
      apiUrl(apiConfig.auth.me),
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      }
    );

    const data: AuthResponse = await response.json();

    if (!response.ok || !data.success || !data.user) {
      return null;
    }

    return data.user;
  } catch {
    return null;
  }
}

export async function logoutUser(): Promise<boolean> {
  try {
    const response = await fetch(
      apiUrl(apiConfig.auth.logout),
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data: AuthResponse = await response.json();

    return response.ok && data.success;
  } catch {
    return false;
  }
}