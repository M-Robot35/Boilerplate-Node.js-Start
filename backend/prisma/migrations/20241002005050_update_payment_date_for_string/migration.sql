-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_paymentItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transactionId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "description" TEXT,
    "quantity" INTEGER,
    "unit_price" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "paymentItem_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_paymentItem" ("amount", "created_at", "description", "id", "quantity", "status", "title", "transactionId", "unit_price", "update_at") SELECT "amount", "created_at", "description", "id", "quantity", "status", "title", "transactionId", "unit_price", "update_at" FROM "paymentItem";
DROP TABLE "paymentItem";
ALTER TABLE "new_paymentItem" RENAME TO "paymentItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
