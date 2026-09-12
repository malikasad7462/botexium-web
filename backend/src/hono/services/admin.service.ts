import { createPrisma } from './prisma';

/*
|--------------------------------------------------------------------------
| DASHBOARD STATS
|--------------------------------------------------------------------------
*/

export async function getAdminStats(db: D1Database) {
  const prisma = createPrisma(db);

  const totalUsers = await prisma.user.count();
  const activeUsers = await prisma.user.count({ where: { status: 'ACTIVE' } });
  const bannedUsers = await prisma.user.count({ where: { status: 'BANNED' } });
  const totalReferrals = await prisma.user.count({
    where: { referredById: { not: null } },
  });

  const purchaseStats = await prisma.purchase.aggregate({
    _sum: { usdtAmount: true, tokenAmount: true },
    _count: true,
  });

  const rewardStats = await prisma.rewardTransaction.aggregate({
    _sum: { amount: true },
    _count: true,
  });

  const bonusStats = await prisma.bonusTransaction.aggregate({
    _sum: { amount: true },
    _count: true,
  });

  // Settings
  const pool = await prisma.setting.findUnique({
    where: { key: 'reward_pool' },
  });
  const tokenPrice = await prisma.setting.findUnique({
    where: { key: 'token_price' },
  });

  const totalPool = parseFloat(pool?.value || '0');
  const distributed = rewardStats._sum.amount || 0;
  const price = parseFloat(tokenPrice?.value || '0.01');

  // Phase 1
  const phase1Sold = await prisma.purchase.aggregate({
    where: { price: 0.01 },
    _sum: { tokenAmount: true },
  });

  return {
    // Users
    totalUsers,
    activeUsers,
    bannedUsers,
    totalReferrals,
    
    // Purchases
    totalPurchases: purchaseStats._count,
    totalUSDT: purchaseStats._sum.usdtAmount || 0,
    totalTokensSold: purchaseStats._sum.tokenAmount || 0,
    
    // Rewards
    totalRewardsDistributed: rewardStats._count,
    totalRewardTokens: rewardStats._sum.amount || 0,
    
    // Bonuses
    totalBonusesDistributed: bonusStats._count,
    totalBonusTokens: bonusStats._sum.amount || 0,
    
    // Reward Pool
    rewardPoolTotal: totalPool,
    rewardPoolRemaining: totalPool - distributed,
    
    // Phase 1
    phase1Sold: phase1Sold._sum.tokenAmount || 0,
    phase1Remaining: 300000000 - (phase1Sold._sum.tokenAmount || 0),
    
    // Token Price
    tokenPrice: price,
  };
}

/*
|--------------------------------------------------------------------------
| USER MANAGEMENT
|--------------------------------------------------------------------------
*/

export async function getAllUsers(db: D1Database, search?: string) {
  const prisma = createPrisma(db);

  const users = await prisma.user.findMany({
    where: search ? {
      OR: [
        { name: { contains: search } },
        { email: { contains: search } },
        { referralCode: { contains: search } },
      ],
    } : undefined,
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
      walletBalance: true,
      lockedBonus: true,
      lockedRewards: true,
      totalReleased: true,
      totalPurchased: true,
      totalRewards: true,
      createdAt: true,
      _count: {
        select: { referrals: true, purchases: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return users;
}

export async function getUserDetails(db: D1Database, userId: string) {
  const prisma = createPrisma(db);

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
      walletBalance: true,
      lockedBonus: true,
      lockedRewards: true,
      totalReleased: true,
      totalPurchased: true,
      totalRewards: true,
      createdAt: true,
      referredBy: {
        select: { id: true, name: true, email: true, referralCode: true },
      },
      referrals: {
        select: {
          id: true,
          name: true,
          email: true,
          referralCode: true,
          status: true,
          createdAt: true,
        },
      },
      purchases: {
        orderBy: { createdAt: 'desc' },
      },
      bonusHistory: {
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
      rewardHistory: {
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
    },
  });

  return user;
}

export async function updateUserStatus(
  db: D1Database,
  userId: string,
  status: string,
  adminId: string
) {
  const prisma = createPrisma(db);

  await prisma.user.update({
    where: { id: userId },
    data: { status },
  });

  await prisma.auditLog.create({
    data: {
      adminId,
      action: 'UPDATE_USER_STATUS',
      target: userId,
      newValue: status,
    },
  });

  return { success: true };
}

export async function updateUserRole(
  db: D1Database,
  userId: string,
  role: string,
  adminId: string
) {
  const prisma = createPrisma(db);

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  await prisma.auditLog.create({
    data: {
      adminId,
      action: 'UPDATE_USER_ROLE',
      target: userId,
      newValue: role,
    },
  });

  return { success: true };
}

/*
|--------------------------------------------------------------------------
| BONUS MANAGEMENT
|--------------------------------------------------------------------------
*/

export async function addBonus(
  db: D1Database,
  userId: string,
  amount: number,
  type: string,
  reason: string,
  adminId: string
) {
  const prisma = createPrisma(db);

  const bonus = await prisma.bonusTransaction.create({
    data: {
      userId,
      amount,
      type,
      reason,
      status: 'LOCKED',
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      lockedBonus: { increment: amount },
    },
  });

  await prisma.auditLog.create({
    data: {
      adminId,
      action: 'ADD_BONUS',
      target: userId,
      newValue: `${amount} BOXM (${type})`,
    },
  });

  return bonus;
}

/*
|--------------------------------------------------------------------------
| RELEASE MANAGEMENT
|--------------------------------------------------------------------------
*/

export async function releaseUserFunds(
  db: D1Database,
  userId: string,
  releaseBonus: boolean,
  releaseRewards: boolean,
  txHash: string,
  adminId: string,
  notes: string
) {
  const prisma = createPrisma(db);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      lockedBonus: true,
      lockedRewards: true,
    },
  });

  if (!user) throw new Error('User not found');

  const bonusAmount = releaseBonus ? user.lockedBonus : 0;
  const rewardsAmount = releaseRewards ? user.lockedRewards : 0;
  const totalAmount = bonusAmount + rewardsAmount;

  if (totalAmount <= 0) {
    throw new Error('Nothing to release');
  }

  // Update transactions
  if (releaseBonus) {
    await prisma.bonusTransaction.updateMany({
      where: { userId, status: 'LOCKED' },
      data: {
        status: 'RELEASED',
        releasedAt: new Date(),
        releasedBy: adminId,
        txHash,
      },
    });
  }

  if (releaseRewards) {
    await prisma.rewardTransaction.updateMany({
      where: { userId, status: 'LOCKED' },
      data: {
        status: 'RELEASED',
        releasedAt: new Date(),
        releasedBy: adminId,
        txHash,
      },
    });
  }

  // Update user
  await prisma.user.update({
    where: { id: userId },
    data: {
      lockedBonus: releaseBonus ? 0 : undefined,
      lockedRewards: releaseRewards ? 0 : undefined,
      totalReleased: { increment: totalAmount },
    },
  });

  // Release history
  await prisma.releaseHistory.create({
    data: {
      userId,
      amount: totalAmount,
      type: releaseBonus && releaseRewards ? 'BOTH' : releaseBonus ? 'BONUS' : 'REWARD',
      releasedBy: adminId,
      txHash,
      notes,
    },
  });

  // Audit log
  await prisma.auditLog.create({
    data: {
      adminId,
      action: 'RELEASE_FUNDS',
      target: userId,
      newValue: `${totalAmount} BOXM (TX: ${txHash})`,
    },
  });

  return { success: true, released: totalAmount };
}

export async function getReleaseHistory(db: D1Database) {
  const prisma = createPrisma(db);

  const history = await prisma.releaseHistory.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return history;
}

/*
|--------------------------------------------------------------------------
| SETTINGS MANAGEMENT
|--------------------------------------------------------------------------
*/

export async function getAllSettings(db: D1Database) {
  const prisma = createPrisma(db);

  const settings = await prisma.setting.findMany();
  const settingsMap = settings.reduce((acc, s) => {
    acc[s.key] = s.value;
    return acc;
  }, {} as Record<string, string>);

  return settingsMap;
}

export async function updateSetting(
  db: D1Database,
  key: string,
  value: string,
  adminId: string
) {
  const prisma = createPrisma(db);

  const oldSetting = await prisma.setting.findUnique({ where: { key } });

  const setting = await prisma.setting.upsert({
    where: { key },
    update: { value, updatedBy: adminId },
    create: { key, value, category: 'general' },
  });

  await prisma.auditLog.create({
    data: {
      adminId,
      action: 'UPDATE_SETTING',
      target: key,
      oldValue: oldSetting?.value,
      newValue: value,
    },
  });

  return setting;
}

/*
|--------------------------------------------------------------------------
| PURCHASES & REWARDS
|--------------------------------------------------------------------------
*/

export async function getAllPurchases(db: D1Database) {
  const prisma = createPrisma(db);

  const purchases = await prisma.purchase.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return purchases;
}

export async function getAllRewards(db: D1Database) {
  const prisma = createPrisma(db);

  const rewards = await prisma.rewardTransaction.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return rewards;
}

/*
|--------------------------------------------------------------------------
| AUDIT LOGS
|--------------------------------------------------------------------------
*/

export async function getAuditLogs(db: D1Database) {
  const prisma = createPrisma(db);

  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return logs;
}