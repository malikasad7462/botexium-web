const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const apiConfig = {
  baseUrl: API_URL,

  auth: {
    register: "/api/auth/register",
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    me: "/api/auth/me",
  },
} as const;

export function apiUrl(path: string): string {
  return `${apiConfig.baseUrl}${path}`;
}