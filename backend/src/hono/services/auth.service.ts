import bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { createPrisma } from './prisma';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  country: string;
  referralCode?: string;
}

function generateReferralCode(): string {
  return 'BTX' + Math.random().toString(36).substring(2, 10).toUpperCase();
}

export async function registerUser(db: D1Database, input: RegisterInput) {
  const prisma = createPrisma(db);

  const name = input.name?.trim();
  const email = input.email?.trim().toLowerCase();
  const password = input.password;
  const country = input.country?.trim();
  const referralCode = input.referralCode?.trim().toUpperCase();

  if (!name || !email || !password || !country) {
    throw new Error('Name, email, password and country are required');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Email is already registered');
  }

  let referredById: string | undefined;

  if (referralCode) {
    const referrer = await prisma.user.findUnique({
      where: { referralCode },
    });

    if (!referrer) {
      throw new Error('Invalid referral code');
    }

    if (referrer.status !== 'ACTIVE') {
      throw new Error('Referral account is not active');
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

export async function loginUser(
  db: D1Database,
  input: { email: string; password: string }
) {
  const prisma = createPrisma(db);

  const email = input.email?.trim().toLowerCase();
  const password = input.password;

  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const user = await prisma.user.findUnique({
    where: { email },
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
    throw new Error('Invalid email or password');
  }

  const passwordValid = await bcrypt.compare(password, user.passwordHash);

  if (!passwordValid) {
    throw new Error('Invalid email or password');
  }

  if (user.status !== 'ACTIVE') {
    throw new Error('Your account is not active');
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

export async function getCurrentUser(db: D1Database, userId: string) {
  const prisma = createPrisma(db);

  if (!userId) {
    throw new Error('User ID is required');
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
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
    throw new Error('User not found');
  }

  return user;
}

/*
|--------------------------------------------------------------------------
| FORGOT PASSWORD
|--------------------------------------------------------------------------
*/

export async function requestPasswordReset(db: D1Database, email: string) {
  const prisma = createPrisma(db);

  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  // Security: don't reveal if user exists
  if (!user) {
    return { success: true };
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = await bcrypt.hash(resetToken, 10);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken: hashedToken,
      resetTokenExpires: expiresAt,
    },
  });

  // TODO: Send email
  console.log(`Reset link: http://localhost:3000/reset-password?token=${resetToken}`);

  return { success: true, resetToken };
}

export async function verifyResetToken(db: D1Database, token: string) {
  const prisma = createPrisma(db);

  const user = await prisma.user.findFirst({
    where: {
      resetToken: { not: null },
      resetTokenExpires: { gt: new Date() },
    },
  });

  if (!user || !user.resetToken) {
    return false;
  }

  return await bcrypt.compare(token, user.resetToken);
}

export async function resetPassword(
  db: D1Database,
  token: string,
  newPassword: string
) {
  const prisma = createPrisma(db);

  const user = await prisma.user.findFirst({
    where: {
      resetToken: { not: null },
      resetTokenExpires: { gt: new Date() },
    },
  });

  if (!user || !user.resetToken) {
    throw new Error('Invalid or expired reset token');
  }

  const isValid = await bcrypt.compare(token, user.resetToken);
  if (!isValid) {
    throw new Error('Invalid reset token');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    },
  });

  return { success: true };
}

/*
|--------------------------------------------------------------------------
| CHANGE PASSWORD
|--------------------------------------------------------------------------
*/

export async function changePassword(
  db: D1Database,
  userId: string,
  currentPassword: string,
  newPassword: string
) {
  const prisma = createPrisma(db);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { passwordHash: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isValid) {
    throw new Error('Current password is incorrect');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: hashedPassword },
  });

  return { success: true };
}

/*
|--------------------------------------------------------------------------
| 2FA
|--------------------------------------------------------------------------
*/

export async function get2FAStatus(db: D1Database, userId: string) {
  const prisma = createPrisma(db);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { twoFactorEnabled: true },
  });

  return { enabled: user?.twoFactorEnabled || false };
}