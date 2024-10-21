/*
  Warnings:

  - You are about to drop the `paymentItems` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `qrCodeLink` to the `transation` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "paymentItems";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "paymentItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transactionId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "description" DATETIME,
    "quantity" INTEGER,
    "unit_price" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "paymentItem_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "status" TEXT,
    "paymentType" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME,
    "expiresAt" DATETIME,
    "qrCodeBase64" TEXT,
    "qrCodeLink" TEXT NOT NULL,
    "urlPayment" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "transation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transation" ("amount", "createdAt", "created_at", "expiresAt", "id", "paymentType", "qrCodeBase64", "status", "transactionId", "update_at", "urlPayment", "userId") SELECT "amount", "createdAt", "created_at", "expiresAt", "id", "paymentType", "qrCodeBase64", "status", "transactionId", "update_at", "urlPayment", "userId" FROM "transation";
DROP TABLE "transation";
ALTER TABLE "new_transation" RENAME TO "transation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
