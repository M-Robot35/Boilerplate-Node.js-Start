/*
  Warnings:

  - A unique constraint covering the columns `[transactionId]` on the table `transation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "transation_transactionId_key" ON "transation"("transactionId");
