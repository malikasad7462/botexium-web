export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const api = {
  auth: {
    me: `${API_URL}/api/auth/me`,
    login: `${API_URL}/api/auth/login`,
    register: `${API_URL}/api/auth/register`,
    logout: `${API_URL}/api/auth/logout`,
    changePassword: `${API_URL}/api/auth/change-password`,
    forgotPassword: `${API_URL}/api/auth/forgot-password`,
    resetPassword: `${API_URL}/api/auth/reset-password`,
    verifyResetToken: `${API_URL}/api/auth/verify-reset-token`,
    myReferrals: `${API_URL}/api/auth/my-referrals`,
    twoFactorStatus: `${API_URL}/api/auth/2fa/status`,
    twoFactorEnable: `${API_URL}/api/auth/2fa/enable`,
    twoFactorVerify: `${API_URL}/api/auth/2fa/verify`,
    twoFactorDisable: `${API_URL}/api/auth/2fa/disable`,
  },
};