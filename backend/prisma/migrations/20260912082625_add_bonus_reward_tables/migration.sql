-- CreateTable
CREATE TABLE "BonusTransaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'LOCKED',
    "reason" TEXT,
    "releasedAt" DATETIME,
    "releasedBy" TEXT,
    "txHash" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BonusTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RewardTransaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "level" INTEGER NOT NULL,
    "sourceId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'LOCKED',
    "releasedAt" DATETIME,
    "releasedBy" TEXT,
    "txHash" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RewardTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReleaseHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "releasedBy" TEXT NOT NULL,
    "txHash" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "referralCode" TEXT NOT NULL,
    "referredById" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "points" INTEGER NOT NULL DEFAULT 0,
    "resetToken" TEXT,
    "resetTokenExpires" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "twoFactorSecret" TEXT,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "walletBalance" REAL NOT NULL DEFAULT 0,
    "lockedBonus" REAL NOT NULL DEFAULT 0,
    "lockedRewards" REAL NOT NULL DEFAULT 0,
    "totalReleased" REAL NOT NULL DEFAULT 0,
    "totalPurchased" REAL NOT NULL DEFAULT 0,
    "totalRewards" REAL NOT NULL DEFAULT 0,
    "isEligible" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "User_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("country", "createdAt", "email", "id", "isEligible", "name", "passwordHash", "points", "referralCode", "referredById", "resetToken", "resetTokenExpires", "role", "status", "totalPurchased", "totalRewards", "twoFactorEnabled", "twoFactorSecret", "updatedAt") SELECT "country", "createdAt", "email", "id", "isEligible", "name", "passwordHash", "points", "referralCode", "referredById", "resetToken", "resetTokenExpires", "role", "status", "totalPurchased", "totalRewards", "twoFactorEnabled", "twoFactorSecret", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_referralCode_key" ON "User"("referralCode");
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");
CREATE INDEX "User_referredById_idx" ON "User"("referredById");
CREATE INDEX "User_status_idx" ON "User"("status");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "BonusTransaction_userId_idx" ON "BonusTransaction"("userId");

-- CreateIndex
CREATE INDEX "BonusTransaction_status_idx" ON "BonusTransaction"("status");

-- CreateIndex
CREATE INDEX "BonusTransaction_type_idx" ON "BonusTransaction"("type");

-- CreateIndex
CREATE INDEX "RewardTransaction_userId_idx" ON "RewardTransaction"("userId");

-- CreateIndex
CREATE INDEX "RewardTransaction_status_idx" ON "RewardTransaction"("status");

-- CreateIndex
CREATE INDEX "RewardTransaction_level_idx" ON "RewardTransaction"("level");

-- CreateIndex
CREATE INDEX "ReleaseHistory_userId_idx" ON "ReleaseHistory"("userId");

-- CreateIndex
CREATE INDEX "ReleaseHistory_releasedBy_idx" ON "ReleaseHistory"("releasedBy");
