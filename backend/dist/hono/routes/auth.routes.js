import { Hono } from 'hono';
import { setCookie, deleteCookie, getCookie } from 'hono/cookie';
import { sign, verify } from 'hono/jwt';
import { registerUser, loginUser, getCurrentUser, requestPasswordReset, verifyResetToken, resetPassword, changePassword, get2FAStatus, } from '../services/auth.service';
const authRoutes = new Hono();
const COOKIE_NAME = 'botexium_token';
/*
|--------------------------------------------------------------------------
| REGISTER
|--------------------------------------------------------------------------
*/
authRoutes.post('/register', async (c) => {
    try {
        const body = await c.req.json();
        const user = await registerUser(c.env.DB, body);
        return c.json({
            success: true,
            message: 'Registration successful',
            user,
        }, 201);
    }
    catch (error) {
        console.error('REGISTER ERROR:', error);
        return c.json({
            success: false,
            message: error.message || 'Registration failed',
        }, 400);
    }
});
/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/
authRoutes.post('/login', async (c) => {
    try {
        const body = await c.req.json();
        const user = await loginUser(c.env.DB, body);
        const token = await sign({
            userId: user.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        }, c.env.JWT_SECRET);
        setCookie(c, COOKIE_NAME, token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });
        return c.json({
            success: true,
            message: 'Login successful',
            user,
        });
    }
    catch (error) {
        console.error('LOGIN ERROR:', error);
        return c.json({
            success: false,
            message: error.message || 'Login failed',
        }, 401);
    }
});
/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/
authRoutes.post('/logout', (c) => {
    deleteCookie(c, COOKIE_NAME, { path: '/' });
    return c.json({
        success: true,
        message: 'Logout successful',
    });
});
/*
|--------------------------------------------------------------------------
| CURRENT USER
|--------------------------------------------------------------------------
*/
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
        const userId = payload.userId;
        const user = await getCurrentUser(c.env.DB, userId);
        return c.json({
            success: true,
            user,
        });
    }
    catch (error) {
        return c.json({
            success: false,
            message: 'Invalid or expired token',
        }, 401);
    }
});
/*
|--------------------------------------------------------------------------
| FORGOT PASSWORD
|--------------------------------------------------------------------------
*/
authRoutes.post('/forgot-password', async (c) => {
    try {
        const { email } = await c.req.json();
        if (!email) {
            return c.json({
                success: false,
                message: 'Email is required',
            }, 400);
        }
        const result = await requestPasswordReset(c.env.DB, email);
        return c.json({
            success: true,
            message: 'Password reset link sent to your email',
            // ✅ Development ke liye token return karo
            resetToken: result.resetToken,
        });
    }
    catch (error) {
        return c.json({
            success: false,
            message: error.message || 'Something went wrong',
        }, 500);
    }
});
/*
|--------------------------------------------------------------------------
| VERIFY RESET TOKEN
|--------------------------------------------------------------------------
*/
authRoutes.get('/verify-reset-token', async (c) => {
    try {
        const token = c.req.query('token');
        if (!token) {
            return c.json({
                success: false,
                message: 'Token is required',
            }, 400);
        }
        const isValid = await verifyResetToken(c.env.DB, token);
        return c.json({
            success: true,
            valid: isValid,
        });
    }
    catch (error) {
        return c.json({
            success: false,
            valid: false,
            message: error.message,
        }, 500);
    }
});
/*
|--------------------------------------------------------------------------
| RESET PASSWORD
|--------------------------------------------------------------------------
*/
authRoutes.post('/reset-password', async (c) => {
    try {
        const { token, password } = await c.req.json();
        if (!token || !password) {
            return c.json({
                success: false,
                message: 'Token and password are required',
            }, 400);
        }
        if (password.length < 8) {
            return c.json({
                success: false,
                message: 'Password must be at least 8 characters',
            }, 400);
        }
        await resetPassword(c.env.DB, token, password);
        return c.json({
            success: true,
            message: 'Password reset successfully',
        });
    }
    catch (error) {
        return c.json({
            success: false,
            message: error.message || 'Something went wrong',
        }, 500);
    }
});
/*
|--------------------------------------------------------------------------
| CHANGE PASSWORD
|--------------------------------------------------------------------------
*/
authRoutes.post('/change-password', async (c) => {
    try {
        const token = getCookie(c, COOKIE_NAME);
        if (!token) {
            return c.json({ success: false, message: 'Auth required' }, 401);
        }
        const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
        const userId = payload.userId;
        const { currentPassword, newPassword } = await c.req.json();
        if (!currentPassword || !newPassword) {
            return c.json({
                success: false,
                message: 'Current and new password are required',
            }, 400);
        }
        if (newPassword.length < 8) {
            return c.json({
                success: false,
                message: 'Password must be at least 8 characters',
            }, 400);
        }
        await changePassword(c.env.DB, userId, currentPassword, newPassword);
        return c.json({
            success: true,
            message: 'Password changed successfully',
        });
    }
    catch (error) {
        return c.json({
            success: false,
            message: error.message || 'Something went wrong',
        }, 500);
    }
});
/*
|--------------------------------------------------------------------------
| 2FA STATUS
|--------------------------------------------------------------------------
*/
authRoutes.get('/2fa/status', async (c) => {
    try {
        const token = getCookie(c, COOKIE_NAME);
        if (!token) {
            return c.json({ success: false, message: 'Auth required' }, 401);
        }
        const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
        const userId = payload.userId;
        const status = await get2FAStatus(c.env.DB, userId);
        return c.json({
            success: true,
            enabled: status.enabled,
        });
    }
    catch (error) {
        return c.json({
            success: false,
            message: error.message,
        }, 500);
    }
});
export default authRoutes;
