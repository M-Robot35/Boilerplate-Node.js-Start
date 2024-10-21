-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_paymentItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "transactionId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "description" TEXT,
    "quantity" INTEGER,
    "unit_price" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "paymentItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_paymentItem" ("amount", "created_at", "description", "id", "quantity", "status", "title", "transactionId", "unit_price", "update_at", "userId") SELECT "amount", "created_at", "description", "id", "quantity", "status", "title", "transactionId", "unit_price", "update_at", "userId" FROM "paymentItem";
DROP TABLE "paymentItem";
ALTER TABLE "new_paymentItem" RENAME TO "paymentItem";
CREATE TABLE "new_transation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "transactionId" TEXT NOT NULL,
    "status" TEXT,
    "paymentType" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" TEXT,
    "expiresAt" TEXT,
    "qrCodeBase64" TEXT,
    "qrCodeLink" TEXT,
    "urlPayment" TEXT,
    "url_sandbox" TEXT,
    "url_production" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "transation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transation" ("amount", "createdAt", "created_at", "expiresAt", "id", "paymentType", "qrCodeBase64", "qrCodeLink", "status", "transactionId", "update_at", "urlPayment", "userId") SELECT "amount", "createdAt", "created_at", "expiresAt", "id", "paymentType", "qrCodeBase64", "qrCodeLink", "status", "transactionId", "update_at", "urlPayment", "userId" FROM "transation";
DROP TABLE "transation";
ALTER TABLE "new_transation" RENAME TO "transation";
CREATE UNIQUE INDEX "transation_transactionId_key" ON "transation"("transactionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
