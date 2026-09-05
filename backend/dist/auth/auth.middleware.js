"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessToken = createAccessToken;
exports.authenticate = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }
    return secret;
}
function createAccessToken(userId) {
    return jsonwebtoken_1.default.sign({
        userId,
    }, getJwtSecret(), {
        expiresIn: "7d",
    });
}
function authenticate(req, res, next) {
    try {
        const token = req.cookies?.BOTEXIUM_token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, getJwtSecret());
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
