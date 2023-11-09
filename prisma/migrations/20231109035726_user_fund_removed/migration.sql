/*
  Warnings:

  - You are about to drop the column `fund` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "name" TEXT NOT NULL,
    "CPF" BIGINT NOT NULL,
    "sala" TEXT NOT NULL,
    "ano" INTEGER NOT NULL
);
INSERT INTO "new_User" ("CPF", "ano", "name", "sala") SELECT "CPF", "ano", "name", "sala" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_CPF_key" ON "User"("CPF");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
