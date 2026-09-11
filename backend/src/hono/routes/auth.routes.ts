import { Hono } from 'hono';
import { setCookie, deleteCookie, getCookie } from 'hono/cookie';
import { sign, verify } from 'hono/jwt';
import { registerUser, loginUser, getCurrentUser } from '../services/auth.service';

type Env = {
  DB: D1Database;
  JWT_SECRET: string;
  FRONTEND_URL: string;
};

const authRoutes = new Hono<{ Bindings: Env }>();

const COOKIE_NAME = 'botexium_token';

// ✅ REGISTER
authRoutes.post('/register', async (c) => {
  try {
    const body = await c.req.json();
    const user = await registerUser(c.env.DB, body);

    return c.json({
      success: true,
      message: 'Registration successful',
      user,
    }, 201);
  } catch (error: any) {
    console.error('REGISTER ERROR:', error);
    return c.json({
      success: false,
      message: error.message || 'Registration failed',
    }, 400);
  }
});

// ✅ LOGIN
authRoutes.post('/login', async (c) => {
  try {
    const body = await c.req.json();
    const user = await loginUser(c.env.DB, body);

    // ✅ JWT Token banao
    const token = await sign(
      {
        userId: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      },
      c.env.JWT_SECRET
    );

    console.log('✅ Token created:', token.slice(0, 30) + '...');

    // ✅ Cookie set karo
    setCookie(c, COOKIE_NAME, token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    console.log('✅ Cookie set:', COOKIE_NAME);

    return c.json({
      success: true,
      message: 'Login successful',
      user,
      tokenPreview: token.slice(0, 30) + '...', // ✅ Debug
    });
  } catch (error: any) {
    console.error('LOGIN ERROR:', error);
    return c.json({
      success: false,
      message: error.message || 'Login failed',
    }, 401);
  }
});

// ✅ LOGOUT
authRoutes.post('/logout', (c) => {
  deleteCookie(c, COOKIE_NAME, {
    path: '/',
  });

  return c.json({
    success: true,
    message: 'Logout successful',
  });
});

// ✅ DEBUG: Check cookie
authRoutes.get('/debug-cookie', (c) => {
  const token = getCookie(c, COOKIE_NAME);
  const cookieHeader = c.req.header('Cookie') || 'no cookie header';
  return c.json({
    hasToken: !!token,
    tokenPreview: token ? token.slice(0, 30) + '...' : null,
    cookieHeader: cookieHeader.slice(0, 100),
  });
});

// ✅ CURRENT USER
authRoutes.get('/me', async (c) => {
  try {
    const token = getCookie(c, COOKIE_NAME);

    if (!token) {
      return c.json({
        success: false,
        message: 'Authentication required',
      }, 401);
    }

    const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
    const userId = payload.userId as string;

    const user = await getCurrentUser(c.env.DB, userId);

    return c.json({
      success: true,
      user,
    });
  } catch (error: any) {
    console.error('ME ERROR:', error);
    return c.json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message,
    }, 401);
  }
});

export default authRoutes;