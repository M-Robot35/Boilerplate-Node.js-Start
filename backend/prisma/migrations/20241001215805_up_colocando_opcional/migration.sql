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
    "qrCodeLink" TEXT,
    "urlPayment" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "transation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transation" ("amount", "createdAt", "created_at", "expiresAt", "id", "paymentType", "qrCodeBase64", "qrCodeLink", "status", "transactionId", "update_at", "urlPayment", "userId") SELECT "amount", "createdAt", "created_at", "expiresAt", "id", "paymentType", "qrCodeBase64", "qrCodeLink", "status", "transactionId", "update_at", "urlPayment", "userId" FROM "transation";
DROP TABLE "transation";
ALTER TABLE "new_transation" RENAME TO "transation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;