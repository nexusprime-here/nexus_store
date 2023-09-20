/*
  Warnings:

  - Added the required column `transation_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "status" INTEGER NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transation_id" TEXT NOT NULL,
    "userCPF" INTEGER NOT NULL,
    CONSTRAINT "Order_userCPF_fkey" FOREIGN KEY ("userCPF") REFERENCES "User" ("CPF") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("id", "status", "userCPF") SELECT "id", "status", "userCPF" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_transation_id_key" ON "Order"("transation_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
