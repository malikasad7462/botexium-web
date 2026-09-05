import "dotenv/config";
import bcrypt from "bcryptjs";
import * as crypto from "crypto";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

// Prisma 7 کے لیے adapter کے ساتھ PrismaClient initialize کریں
const adapter = new PrismaLibSql({
  url: `file:${process.cwd()}/dev.db`,
});

const prisma = new PrismaClient({ adapter });

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  country: string;
  referralCode?: string;
}

function generateReferralCode(): string {
  return "BTX" + Math.random().toString(36).substring(2, 10).toUpperCase();
}

export async function registerUser(input: RegisterInput) {
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

  let referredById: string | undefined;

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

  while (
    await prisma.user.findUnique({
      where: { referralCode: newReferralCode },
    })
  ) {
    newReferralCode = generateReferralCode();
  }

  const passwordHash = await bcrypt.hash(password, 12);

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

export async function getUserByEmail(email: string) {
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

export function generateReferralLink(referralCode: string): string {
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  return `${baseUrl}/register?ref=${encodeURIComponent(
    referralCode.trim().toUpperCase()
  )}`;
}

export async function getMyReferrals(referralCode: string) {
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

export async function loginUser(input: {
  email: string;
  password: string;
}) {
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

  const passwordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordValid) {
    throw new Error("Invalid email or password");
  }

  if (user.status !== "ACTIVE") {
    throw new Error(
      user.status === "SUSPENDED"
        ? "Your account is suspended"
        : "Your account is not active"
    );
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

export async function getCurrentUser(userId: string) {
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

export async function getMyReferralsByUserId(userId: string) {
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

export async function requestPasswordReset(email: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return true;
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(resetToken, 10);
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
  } catch (error) {
    console.error('Error in requestPasswordReset:', error);
    return false;
  }
}

/*
|--------------------------------------------------------------------------
| VERIFY RESET TOKEN
|--------------------------------------------------------------------------
*/

export async function verifyResetToken(token: string): Promise<boolean> {
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

    const isValid = await bcrypt.compare(token, user.resetToken!);
    return isValid;
  } catch (error) {
    console.error('Error in verifyResetToken:', error);
    return false;
  }
}

/*
|--------------------------------------------------------------------------
| RESET PASSWORD - Update with Token
|--------------------------------------------------------------------------
*/

export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
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

    const isValid = await bcrypt.compare(token, user.resetToken!);
    if (!isValid) {
      throw new Error('Invalid reset token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
  where: { id: user.id },
  data: {
    passwordHash: hashedPassword,  // ✅ درست
    resetToken: null,
    resetTokenExpires: null,
  },
});
    return true;
  } catch (error) {
    console.error('Error in resetPassword:', error);
    throw error;
  }
}

export { prisma };