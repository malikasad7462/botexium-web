import { Router } from "express";
import bcrypt from "bcryptjs"; // ✅ bcrypt import
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { registerUser, getUserByEmail, generateReferralLink, getMyReferrals, getMyReferralsByUserId, loginUser, getCurrentUser, requestPasswordReset, verifyResetToken, resetPassword, } from "./auth.service";
import { authenticate, createAccessToken, } from "./auth.middleware";
// ✅ Prisma import - auth.service se prisma use karo (kyunke wahan adapter set hai)
import { prisma } from "./auth.service";
const router = Router();
const COOKIE_NAME = "BOTEXIUM_token";
function getCookieOptions() {
    const isProduction = process.env.NODE_ENV === "production";
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
    };
}
/*
|--------------------------------------------------------------------------
| REGISTER
|--------------------------------------------------------------------------
*/
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, country, referralCode } = req.body;
        const user = await registerUser({
            name,
            email,
            password,
            country,
            referralCode,
        });
        return res.status(201).json({
            success: true,
            message: "Registration successful",
            user,
        });
    }
    catch (error) {
        console.error("REGISTER ERROR:", error);
        const message = error instanceof Error ? error.message : "Registration failed";
        return res.status(400).json({
            success: false,
            message,
        });
    }
});
/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser({
            email,
            password,
        });
        const accessToken = createAccessToken(user.id);
        res.cookie(COOKIE_NAME, accessToken, getCookieOptions());
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user,
        });
    }
    catch (error) {
        console.error("LOGIN ERROR:", error);
        const message = error instanceof Error ? error.message : "Login failed";
        return res.status(401).json({
            success: false,
            message,
        });
    }
});
/*
|--------------------------------------------------------------------------
| FORGOT PASSWORD - Request Reset Link
|--------------------------------------------------------------------------
*/
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }
        const result = await requestPasswordReset(email);
        return res.status(200).json({
            success: true,
            message: "Password reset link sent to your email",
        });
    }
    catch (error) {
        console.error("FORGOT PASSWORD ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
});
/*
|--------------------------------------------------------------------------
| VERIFY RESET TOKEN
|--------------------------------------------------------------------------
*/
router.get("/verify-reset-token", async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is required",
            });
        }
        const isValid = await verifyResetToken(token);
        return res.status(200).json({
            success: true,
            valid: isValid,
        });
    }
    catch (error) {
        console.error("VERIFY RESET TOKEN ERROR:", error);
        return res.status(500).json({
            success: false,
            valid: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
});
/*
|--------------------------------------------------------------------------
| RESET PASSWORD - Update with Token
|--------------------------------------------------------------------------
*/
router.post("/reset-password", async (req, res) => {
    try {
        const { token, password } = req.body;
        if (!token || !password) {
            return res.status(400).json({
                success: false,
                message: "Token and password are required",
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });
        }
        const result = await resetPassword(token, password);
        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    }
    catch (error) {
        console.error("RESET PASSWORD ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
});
/*
|--------------------------------------------------------------------------
| CURRENT USER
|--------------------------------------------------------------------------
*/
router.get("/me", authenticate, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const user = await getCurrentUser(req.userId);
        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        console.error("GET CURRENT USER ERROR:", error);
        const message = error instanceof Error ? error.message : "User not found";
        return res.status(404).json({
            success: false,
            message,
        });
    }
});
/*
|--------------------------------------------------------------------------
| MY REFERRALS — AUTHENTICATED
|--------------------------------------------------------------------------
*/
router.get("/my-referrals", authenticate, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const data = await getMyReferralsByUserId(req.userId);
        return res.status(200).json({
            success: true,
            ...data,
        });
    }
    catch (error) {
        console.error("GET MY REFERRALS ERROR:", error);
        const message = error instanceof Error
            ? error.message
            : "Unable to get your referrals";
        return res.status(404).json({
            success: false,
            message,
        });
    }
});
/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/
router.post("/logout", (_req, res) => {
    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
        path: "/",
    });
    return res.status(200).json({
        success: true,
        message: "Logout successful",
    });
});
/*
|--------------------------------------------------------------------------
| CHANGE PASSWORD - Authenticated
|--------------------------------------------------------------------------
*/
router.post("/change-password", authenticate, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required",
            });
        }
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });
        }
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { passwordHash: true },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect",
            });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await prisma.user.update({
            where: { id: req.userId },
            data: { passwordHash: hashedPassword },
        });
        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    }
    catch (error) {
        console.error("CHANGE PASSWORD ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to change password",
        });
    }
});
/*
|--------------------------------------------------------------------------
| USER BY EMAIL
|--------------------------------------------------------------------------
*/
router.get("/users/:email", async (req, res) => {
    try {
        const user = await getUserByEmail(String(req.params.email));
        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        console.error("GET USER ERROR:", error);
        const message = error instanceof Error ? error.message : "User not found";
        return res.status(404).json({
            success: false,
            message,
        });
    }
});
/*
|--------------------------------------------------------------------------
| REFERRAL LINK
|--------------------------------------------------------------------------
*/
router.get("/referral/:referralCode", async (req, res) => {
    try {
        const referralCode = String(req.params.referralCode)
            .trim()
            .toUpperCase();
        if (!referralCode) {
            return res.status(400).json({
                success: false,
                message: "Referral code is required",
            });
        }
        const link = generateReferralLink(referralCode);
        return res.status(200).json({
            success: true,
            referralCode,
            referralLink: link,
        });
    }
    catch (error) {
        console.error("REFERRAL LINK ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to generate referral link",
        });
    }
});
/*
|--------------------------------------------------------------------------
| LEGACY REFERRALS
|--------------------------------------------------------------------------
*/
router.get("/referrals/:referralCode", async (req, res) => {
    try {
        const referralCode = String(req.params.referralCode);
        const data = await getMyReferrals(referralCode);
        return res.status(200).json({
            success: true,
            ...data,
        });
    }
    catch (error) {
        console.error("GET REFERRALS ERROR:", error);
        const message = error instanceof Error
            ? error.message
            : "Unable to get referrals";
        return res.status(404).json({
            success: false,
            message,
        });
    }
});
/*
|--------------------------------------------------------------------------
| 2FA - Enable
|--------------------------------------------------------------------------
*/
router.post("/2fa/enable", authenticate, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        // Check if 2FA already enabled - ✅ email bhi select karo
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { twoFactorEnabled: true, twoFactorSecret: true, email: true },
        });
        if (user?.twoFactorEnabled) {
            return res.status(400).json({
                success: false,
                message: "2FA is already enabled",
            });
        }
        // Generate secret - ✅ ab email available hai
        const secret = speakeasy.generateSecret({
            name: `BOTEXIUM (${user?.email || "User"})`,
        });
        // Save secret to database
        await prisma.user.update({
            where: { id: req.userId },
            data: { twoFactorSecret: secret.base32 },
        });
        // Generate QR Code
        const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);
        return res.status(200).json({
            success: true,
            secret: secret.base32,
            qrCode: qrCodeUrl,
        });
    }
    catch (error) {
        console.error("2FA ENABLE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to enable 2FA",
        });
    }
});
/*
|--------------------------------------------------------------------------
| 2FA - Verify
|--------------------------------------------------------------------------
*/
router.post("/2fa/verify", authenticate, async (req, res) => {
    try {
        const { token } = req.body;
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "OTP token is required",
            });
        }
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { twoFactorSecret: true, twoFactorEnabled: true },
        });
        if (!user?.twoFactorSecret) {
            return res.status(400).json({
                success: false,
                message: "2FA not set up",
            });
        }
        // Verify OTP
        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: "base32",
            token: token,
        });
        if (!verified) {
            return res.status(401).json({
                success: false,
                message: "Invalid OTP code",
            });
        }
        // Enable 2FA
        await prisma.user.update({
            where: { id: req.userId },
            data: { twoFactorEnabled: true },
        });
        return res.status(200).json({
            success: true,
            message: "2FA enabled successfully",
        });
    }
    catch (error) {
        console.error("2FA VERIFY ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to verify 2FA",
        });
    }
});
/*
|--------------------------------------------------------------------------
| 2FA - Disable
|--------------------------------------------------------------------------
*/
router.post("/2fa/disable", authenticate, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        await prisma.user.update({
            where: { id: req.userId },
            data: {
                twoFactorSecret: null,
                twoFactorEnabled: false,
            },
        });
        return res.status(200).json({
            success: true,
            message: "2FA disabled successfully",
        });
    }
    catch (error) {
        console.error("2FA DISABLE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to disable 2FA",
        });
    }
});
/*
|--------------------------------------------------------------------------
| 2FA - Status
|--------------------------------------------------------------------------
*/
router.get("/2fa/status", authenticate, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { twoFactorEnabled: true },
        });
        return res.status(200).json({
            success: true,
            enabled: user?.twoFactorEnabled || false,
        });
    }
    catch (error) {
        console.error("2FA STATUS ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get 2FA status",
        });
    }
});
export default router;
