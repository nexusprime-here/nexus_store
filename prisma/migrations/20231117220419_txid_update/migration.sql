/*
  Warnings:

  - You are about to drop the column `transation_id` on the `Order` table. All the data in the column will be lost.
  - Added the required column `txid` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "status" INTEGER NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "txid" TEXT NOT NULL,
    "userCPF" BIGINT NOT NULL,
    "p_quantity" TEXT NOT NULL,
    CONSTRAINT "Order_userCPF_fkey" FOREIGN KEY ("userCPF") REFERENCES "User" ("CPF") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("id", "p_quantity", "status", "userCPF") SELECT "id", "p_quantity", "status", "userCPF" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_txid_key" ON "Order"("txid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
