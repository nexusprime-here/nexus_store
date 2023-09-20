/*
  Warnings:

  - You are about to alter the column `userCPF` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `CPF` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "status" INTEGER NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transation_id" TEXT NOT NULL,
    "userCPF" BIGINT NOT NULL,
    CONSTRAINT "Order_userCPF_fkey" FOREIGN KEY ("userCPF") REFERENCES "User" ("CPF") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("id", "status", "transation_id", "userCPF") SELECT "id", "status", "transation_id", "userCPF" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_transation_id_key" ON "Order"("transation_id");
CREATE TABLE "new_User" (
    "name" TEXT NOT NULL,
    "CPF" BIGINT NOT NULL,
    "ano" INTEGER NOT NULL,
    "fund" INTEGER NOT NULL,
    "sala" TEXT NOT NULL
);
INSERT INTO "new_User" ("CPF", "ano", "fund", "name", "sala") SELECT "CPF", "ano", "fund", "name", "sala" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_CPF_key" ON "User"("CPF");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
