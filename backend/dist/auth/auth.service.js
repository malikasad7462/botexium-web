"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.registerUser = registerUser;
exports.getUserByEmail = getUserByEmail;
exports.generateReferralLink = generateReferralLink;
exports.getMyReferrals = getMyReferrals;
exports.loginUser = loginUser;
exports.getCurrentUser = getCurrentUser;
exports.getMyReferralsByUserId = getMyReferralsByUserId;
exports.requestPasswordReset = requestPasswordReset;
exports.verifyResetToken = verifyResetToken;
exports.resetPassword = resetPassword;
require("dotenv/config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto = __importStar(require("crypto"));
const client_1 = require("../generated/prisma/client");
const adapter_libsql_1 = require("@prisma/adapter-libsql");
// Prisma 7 کے لیے adapter کے ساتھ PrismaClient initialize کریں
const adapter = new adapter_libsql_1.PrismaLibSql({
    url: `file:${process.cwd()}/dev.db`,
});
const prisma = new client_1.PrismaClient({ adapter });
exports.prisma = prisma;
function generateReferralCode() {
    return "BTX" + Math.random().toString(36).substring(2, 10).toUpperCase();
}
async function registerUser(input) {
    const name = input.name?.trim();
    const email = input.email?.trim().toLowerCase();
    const password = input.password;
    const country = input.country?.trim();
    const referralCode = input.referralCode?.trim().toUpperCase();
    if (!name || !email || !password || !country) {
        throw new Error("Name, email, password and country are required");
    }
    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error("Email is already registered");
    }
    let referredById;
    if (referralCode) {
        const referrer = await prisma.user.findUnique({
            where: {
                referralCode,
            },
        });
        if (!referrer) {
            throw new Error("Invalid referral code");
        }
        if (referrer.status !== "ACTIVE") {
            throw new Error("Referral account is not active");
        }
        referredById = referrer.id;
    }
    let newReferralCode = generateReferralCode();
    while (await prisma.user.findUnique({
        where: { referralCode: newReferralCode },
    })) {
        newReferralCode = generateReferralCode();
    }
    const passwordHash = await bcryptjs_1.default.hash(password, 12);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash,
            country,
            referralCode: newReferralCode,
            referredById,
        },
        select: {
            id: true,
            name: true,
            email: true,
            country: true,
            referralCode: true,
            referredById: true,
            role: true,
            status: true,
            points: true,
            createdAt: true,
        },
    });
    return user;
}
async function getUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: {
            email: email.trim().toLowerCase(),
        },
        select: {
            id: true,
            name: true,
            email: true,
            country: true,
            referralCode: true,
            referredById: true,
            role: true,
            status: true,
            points: true,
            createdAt: true,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}
function generateReferralLink(referralCode) {
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    return `${baseUrl}/register?ref=${encodeURIComponent(referralCode.trim().toUpperCase())}`;
}
async function getMyReferrals(referralCode) {
    const code = referralCode.trim().toUpperCase();
    if (!code) {
        throw new Error("Referral code is required");
    }
    const referrer = await prisma.user.findUnique({
        where: {
            referralCode: code,
        },
        select: {
            id: true,
            name: true,
            email: true,
            referralCode: true,
        },
    });
    if (!referrer) {
        throw new Error("Referral user not found");
    }
    const referrals = await prisma.user.findMany({
        where: {
            referredById: referrer.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            country: true,
            referralCode: true,
            role: true,
            status: true,
            points: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return {
        referrer,
        totalReferrals: referrals.length,
        referrals,
    };
}
async function loginUser(input) {
    const email = input.email?.trim().toLowerCase();
    const password = input.password;
    if (!email || !password) {
        throw new Error("Email and password are required");
    }
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            passwordHash: true,
            country: true,
            referralCode: true,
            referredById: true,
            role: true,
            status: true,
            points: true,
            createdAt: true,
        },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const passwordValid = await bcryptjs_1.default.compare(password, user.passwordHash);
    if (!passwordValid) {
        throw new Error("Invalid email or password");
    }
    if (user.status !== "ACTIVE") {
        throw new Error(user.status === "SUSPENDED"
            ? "Your account is suspended"
            : "Your account is not active");
    }
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        country: user.country,
        referralCode: user.referralCode,
        referredById: user.referredById,
        role: user.role,
        status: user.status,
        points: user.points,
        createdAt: user.createdAt,
    };
}
async function getCurrentUser(userId) {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            country: true,
            referralCode: true,
            referredById: true,
            role: true,
            status: true,
            points: true,
            createdAt: true,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}
async function getMyReferralsByUserId(userId) {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            country: true,
            referralCode: true,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const referrals = await prisma.user.findMany({
        where: {
            referredById: user.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            country: true,
            referralCode: true,
            role: true,
            status: true,
            points: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return {
        referrer: user,
        totalReferrals: referrals.length,
        referrals,
    };
}
/*
|--------------------------------------------------------------------------
| FORGOT PASSWORD - Request Reset Link
|--------------------------------------------------------------------------
*/
async function requestPasswordReset(email) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return true;
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = await bcryptjs_1.default.hash(resetToken, 10);
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken: hashedToken,
                resetTokenExpires: expiresAt,
            },
        });
        console.log(`Reset link: http://localhost:3000/reset-password?token=${resetToken}`);
        return true;
    }
    catch (error) {
        console.error('Error in requestPasswordReset:', error);
        return false;
    }
}
/*
|--------------------------------------------------------------------------
| VERIFY RESET TOKEN
|--------------------------------------------------------------------------
*/
async function verifyResetToken(token) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                resetToken: { not: null },
                resetTokenExpires: { gt: new Date() },
            },
        });
        if (!user) {
            return false;
        }
        const isValid = await bcryptjs_1.default.compare(token, user.resetToken);
        return isValid;
    }
    catch (error) {
        console.error('Error in verifyResetToken:', error);
        return false;
    }
}
/*
|--------------------------------------------------------------------------
| RESET PASSWORD - Update with Token
|--------------------------------------------------------------------------
*/
async function resetPassword(token, newPassword) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                resetToken: { not: null },
                resetTokenExpires: { gt: new Date() },
            },
        });
        if (!user) {
            throw new Error('Invalid or expired reset token');
        }
        const isValid = await bcryptjs_1.default.compare(token, user.resetToken);
        if (!isValid) {
            throw new Error('Invalid reset token');
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                passwordHash: hashedPassword, // ✅ درست
                resetToken: null,
                resetTokenExpires: null,
            },
        });
        return true;
    }
    catch (error) {
        console.error('Error in resetPassword:', error);
        throw error;
    }
}
