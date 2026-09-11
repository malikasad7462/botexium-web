import { Router, Request, Response } from "express";
import { authenticate, AuthenticatedRequest } from "../auth/auth.middleware";
import { prisma } from "../auth/auth.service";

const router = Router();

// ============================================================
// MIDDLEWARE: Admin Check
// ============================================================
async function requireAdmin(req: AuthenticatedRequest, res: Response, next: any) {
  if (!req.userId) {
    return res.status(401).json({ success: false, message: "Auth required" });
  }
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { role: true },
  });
  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    return res.status(403).json({ success: false, message: "Admin access required" });
  }
  next();
}

// ============================================================
// DASHBOARD STATS — FULL
// ============================================================
router.get("/stats", authenticate, requireAdmin, async (_req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.user.count({ where: { status: "ACTIVE" } });
    const totalReferrals = await prisma.user.count({ where: { referredById: { not: null } } });

    // Purchase stats
    const purchaseStats = await prisma.purchase.aggregate({
      _sum: { usdtAmount: true, tokenAmount: true },
      _count: true,
    });

    // Reward stats
    const rewardStats = await prisma.rewardDistribution.aggregate({
      _sum: { rewardTokens: true, rewardUSDT: true },
      _count: true,
    });

    // Settings
    const pool = await prisma.setting.findUnique({ where: { key: "reward_pool" } });
    const totalPool = parseInt(pool?.value || "0");
    const distributedRewards = rewardStats._sum.rewardTokens || 0;

    // Phase stats
    const phase1Sold = await prisma.purchase.aggregate({
      where: { price: 0.01 },
      _sum: { tokenAmount: true },
    });
    const phase1Remaining = 300000000 - (phase1Sold._sum.tokenAmount || 0);

    return res.json({
      success: true,
      stats: {
        // Users
        totalUsers,
        activeUsers,
        totalReferrals,

        // Purchases
        totalPurchases: purchaseStats._count,
        totalUSDT: purchaseStats._sum.usdtAmount || 0,
        totalTokensSold: purchaseStats._sum.tokenAmount || 0,

        // Rewards
        totalRewardsDistributed: rewardStats._count,
        totalRewardTokens: distributedRewards,
        totalRewardUSDT: rewardStats._sum.rewardUSDT || 0,
        rewardPoolTotal: totalPool,
        rewardPoolRemaining: totalPool - distributedRewards,

        // Phase
        phase1Sold: phase1Sold._sum.tokenAmount || 0,
        phase1Remaining,
        phase1Progress: ((300000000 - phase1Remaining) / 300000000) * 100,
      },
    });
  } catch (error) {
    console.error("STATS ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
});

// ============================================================
// SETTINGS
// ============================================================
router.get("/settings", authenticate, requireAdmin, async (_req, res) => {
  try {
    const settings = await prisma.setting.findMany();
    const settingsMap = settings.reduce((acc, s) => {
      acc[s.key] = s.value;
      return acc;
    }, {} as Record<string, string>);
    return res.json({ success: true, settings: settingsMap });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch settings" });
  }
});

router.put("/settings/:key", authenticate, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const key = String(req.params.key);
    const { value } = req.body;
    const oldSetting = await prisma.setting.findUnique({ where: { key } });

    const setting = await prisma.setting.upsert({
      where: { key },
      update: { value, updatedBy: req.userId },
      create: { key, value, category: "general" },
    });

    await prisma.auditLog.create({
      data: {
        adminId: req.userId!,
        action: "UPDATE_SETTING",
        target: key,
        oldValue: oldSetting?.value,
        newValue: value,
      },
    });

    return res.json({ success: true, setting });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update setting" });
  }
});

// ============================================================
// ANNOUNCEMENTS — FULL CRUD
// ============================================================
router.get("/announcements/all", authenticate, requireAdmin, async (_req, res) => {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { order: "asc" },
    });
    return res.json({ success: true, announcements });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch announcements" });
  }
});

router.get("/announcements", async (_req, res) => {
  try {
    const announcements = await prisma.announcement.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    return res.json({ success: true, announcements });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch announcements" });
  }
});

router.post("/announcements", authenticate, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { text, startDate, endDate } = req.body;
    const announcement = await prisma.announcement.create({
      data: { text, startDate, endDate },
    });

    await prisma.auditLog.create({
      data: {
        adminId: req.userId!,
        action: "CREATE_ANNOUNCEMENT",
        target: announcement.id,
        newValue: text,
      },
    });

    return res.json({ success: true, announcement });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create announcement" });
  }
});

router.put("/announcements/:id", authenticate, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const id = String(req.params.id);
    const { text, isActive } = req.body;

    const announcement = await prisma.announcement.update({
      where: { id },
      data: { text, isActive },
    });

    await prisma.auditLog.create({
      data: {
        adminId: req.userId!,
        action: "UPDATE_ANNOUNCEMENT",
        target: id,
        newValue: JSON.stringify({ text, isActive }),
      },
    });

    return res.json({ success: true, announcement });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update announcement" });
  }
});

router.delete("/announcements/:id", authenticate, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const id = String(req.params.id);
    await prisma.announcement.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        adminId: req.userId!,
        action: "DELETE_ANNOUNCEMENT",
        target: id,
      },
    });

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete announcement" });
  }
});

// ============================================================
// USERS — FULL DETAILS
// ============================================================
router.get("/users", authenticate, requireAdmin, async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        referralCode: true,
        points: true,
        status: true,
        role: true,
        createdAt: true,
        totalPurchased: true,
        totalRewards: true,
        isEligible: true,
        _count: {
          select: {
            referrals: true,
            purchases: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return res.json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});

router.get("/users/:id", authenticate, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const id = String(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        referralCode: true,
        points: true,
        status: true,
        role: true,
        createdAt: true,
        totalPurchased: true,
        totalRewards: true,
        isEligible: true,
        referredBy: {
          select: { id: true, name: true, email: true, referralCode: true },
        },
        referrals: {
          select: { id: true, name: true, email: true, referralCode: true, status: true, createdAt: true },
        },
        purchases: {
          orderBy: { createdAt: "desc" },
        },
        rewardsEarned: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
});

router.put("/users/:id/status", authenticate, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const id = String(req.params.id);
    const { status } = req.body;
    await prisma.user.update({ where: { id }, data: { status } });
    await prisma.auditLog.create({
      data: { adminId: req.userId!, action: "UPDATE_USER_STATUS", target: id, newValue: status },
    });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update status" });
  }
});

router.put("/users/:id/role", authenticate, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const id = String(req.params.id);
    const { role } = req.body;
    await prisma.user.update({ where: { id }, data: { role } });
    await prisma.auditLog.create({
      data: { adminId: req.userId!, action: "UPDATE_USER_ROLE", target: id, newValue: role },
    });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update role" });
  }
});

// ============================================================
// TRANSACTIONS — PURCHASES & REWARDS
// ============================================================
router.get("/purchases", authenticate, requireAdmin, async (_req, res) => {
  try {
    const purchases = await prisma.purchase.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        user: { select: { name: true, email: true } },
      },
    });
    return res.json({ success: true, purchases });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch purchases" });
  }
});

router.get("/rewards", authenticate, requireAdmin, async (_req, res) => {
  try {
    const rewards = await prisma.rewardDistribution.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        earner: { select: { name: true, email: true } },
        buyer: { select: { name: true, email: true } },
      },
    });
    return res.json({ success: true, rewards });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch rewards" });
  }
});

export default router;