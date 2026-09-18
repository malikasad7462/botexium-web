import jwt from "jsonwebtoken";
function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }
    return secret;
}
export function createAccessToken(userId) {
    return jwt.sign({
        userId,
    }, getJwtSecret(), {
        expiresIn: "7d",
    });
}
export function authenticate(req, res, next) {
    try {
        const token = req.cookies?.BOTEXIUM_token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const decoded = jwt.verify(token, getJwtSecret());
        if (typeof decoded !== "object" ||
            decoded === null ||
            typeof decoded.userId !== "string") {
            return res.status(401).json({
                success: false,
                message: "Invalid authentication token",
            });
        }
        req.userId = decoded.userId;
        return next();
    }
    catch {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired authentication token",
        });
    }
}
