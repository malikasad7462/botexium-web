import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { verify } from 'hono/jwt';
import {
  getAdminStats,
  getAllUsers,
  getUserDetails,
  updateUserStatus,
  updateUserRole,
  addBonus,
  releaseUserFunds,
  getReleaseHistory,
  getAllSettings,
  updateSetting,
  getAllPurchases,
  getAllRewards,
  getAuditLogs,
} from '../services/admin.service';
import { createPrisma } from '../services/prisma';

type Env = {
  DB: D1Database;
  JWT_SECRET: string;
  FRONTEND_URL: string;
};

const adminRoutes = new Hono<{ Bindings: Env }>();

const COOKIE_NAME = 'botexium_token';

/*
|--------------------------------------------------------------------------
| ADMIN MIDDLEWARE
|--------------------------------------------------------------------------
*/

adminRoutes.use('*', async (c, next) => {
  try {
    const token = getCookie(c, COOKIE_NAME);

    if (!token) {
      return c.json({ success: false, message: 'Auth required' }, 401);
    }

    const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
    const userId = payload.userId as string;

    const prisma = createPrisma(c.env.DB);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || !['ADMIN', 'SUPER_ADMIN', 'MODERATOR'].includes(user.role)) {
      return c.json({ success: false, message: 'Admin access required' }, 403);
    }

    // Store user info in context
    c.set('userId', userId);
    c.set('role', user.role);

    await next();
  } catch (error) {
    return c.json({ success: false, message: 'Invalid token' }, 401);
  }
});

/*
|--------------------------------------------------------------------------
| DASHBOARD
|--------------------------------------------------------------------------
*/

adminRoutes.get('/stats', async (c) => {
  try {
    const stats = await getAdminStats(c.env.DB);
    return c.json({ success: true, stats });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

/*
|--------------------------------------------------------------------------
| USERS
|--------------------------------------------------------------------------
*/

adminRoutes.get('/users', async (c) => {
  try {
    const search = c.req.query('search');
    const users = await getAllUsers(c.env.DB, search);
    return c.json({ success: true, users });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

adminRoutes.get('/users/:id', async (c) => {
  try {
    const user = await getUserDetails(c.env.DB, c.req.param('id'));
    return c.json({ success: true, user });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

adminRoutes.put('/users/:id/status', async (c) => {
  try {
    const adminId = c.get('userId');
    const { status } = await c.req.json();
    await updateUserStatus(c.env.DB, c.req.param('id'), status, adminId);
    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

adminRoutes.put('/users/:id/role', async (c) => {
  try {
    const adminId = c.get('userId');
    const { role } = await c.req.json();
    await updateUserRole(c.env.DB, c.req.param('id'), role, adminId);
    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

/*
|--------------------------------------------------------------------------
| BONUS
|--------------------------------------------------------------------------
*/

adminRoutes.post('/users/:id/bonus', async (c) => {
  try {
    const adminId = c.get('userId');
    const { amount, type, reason } = await c.req.json();
    const bonus = await addBonus(
      c.env.DB,
      c.req.param('id'),
      amount,
      type,
      reason,
      adminId
    );
    return c.json({ success: true, bonus });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

/*
|--------------------------------------------------------------------------
| RELEASE
|--------------------------------------------------------------------------
*/

adminRoutes.post('/users/:id/release', async (c) => {
  try {
    const adminId = c.get('userId');
    const { releaseBonus, releaseRewards, txHash, notes } = await c.req.json();
    const result = await releaseUserFunds(
      c.env.DB,
      c.req.param('id'),
      releaseBonus,
      releaseRewards,
      txHash,
      adminId,
      notes
    );
    return c.json({ success: true, ...result });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

adminRoutes.get('/release-history', async (c) => {
  try {
    const history = await getReleaseHistory(c.env.DB);
    return c.json({ success: true, history });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

/*
|--------------------------------------------------------------------------
| TRANSACTIONS
|--------------------------------------------------------------------------
*/

adminRoutes.get('/purchases', async (c) => {
  try {
    const purchases = await getAllPurchases(c.env.DB);
    return c.json({ success: true, purchases });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

adminRoutes.get('/rewards', async (c) => {
  try {
    const rewards = await getAllRewards(c.env.DB);
    return c.json({ success: true, rewards });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

/*
|--------------------------------------------------------------------------
| SETTINGS
|--------------------------------------------------------------------------
*/

adminRoutes.get('/settings', async (c) => {
  try {
    const settings = await getAllSettings(c.env.DB);
    return c.json({ success: true, settings });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

adminRoutes.put('/settings/:key', async (c) => {
  try {
    const adminId = c.get('userId');
    const { value } = await c.req.json();
    const setting = await updateSetting(
      c.env.DB,
      c.req.param('key'),
      value,
      adminId
    );
    return c.json({ success: true, setting });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

/*
|--------------------------------------------------------------------------
| AUDIT LOGS
|--------------------------------------------------------------------------
*/

adminRoutes.get('/audit-logs', async (c) => {
  try {
    const logs = await getAuditLogs(c.env.DB);
    return c.json({ success: true, logs });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

export default adminRoutes;