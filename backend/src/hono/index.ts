import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { createPrisma } from './services/prisma';
import authRoutes from './routes/auth.routes';

type Env = {
  DB: D1Database;
  FRONTEND_URL: string;
  JWT_SECRET: string;
  SMTP_HOST: string;
  SMTP_USER: string;
  SMTP_PASS: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use('*', logger());

app.use('*', cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:8787',
    'https://botexium.com',
    'https://botexium.pages.dev',
    'https://botexium-web.pages.dev',
  ],
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Set-Cookie'],
}));

// ✅ Routes
app.route('/api/auth', authRoutes);

// ✅ Health Check
app.get('/', (c) => {
  return c.json({
    status: 'ok',
    message: 'BOTEXIUM API is running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (c) => {
  return c.json({ status: 'healthy' });
});

// ✅ D1 Database Test Route
app.get('/db-test', async (c) => {
  try {
    const result = await c.env.DB.prepare('SELECT 1 as test').first();
    return c.json({
      success: true,
      message: 'D1 database connected!',
      result,
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message,
    }, 500);
  }
});

// ✅ Prisma + D1 Test Route
app.get('/prisma-test', async (c) => {
  try {
    const prisma = createPrisma(c.env.DB);
    const userCount = await prisma.user.count();
    return c.json({
      success: true,
      message: 'Prisma + D1 connected!',
      userCount,
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message,
    }, 500);
  }
});

// ✅ 404 Handler
app.notFound((c) => {
  return c.json({
    success: false,
    error: 'Not Found',
    path: c.req.path,
  }, 404);
});

app.onError((err, c) => {
  console.error('API Error:', err);
  return c.json({
    success: false,
    error: err.message || 'Internal Server Error',
  }, 500);
});

export default app;