-- CreateTable
CREATE TABLE "transation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "status" TEXT,
    "paymentType" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME,
    "expiresAt" DATETIME,
    "qrCodeBase64" TEXT,
    "urlPayment" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "transation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "paymentItems" (
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
    CONSTRAINT "paymentItems_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
