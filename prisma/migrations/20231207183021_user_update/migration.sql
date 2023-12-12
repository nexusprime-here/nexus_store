/*
  Warnings:

  - You are about to drop the column `ano` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sala` on the `User` table. All the data in the column will be lost.
  - Added the required column `CEP` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nResidencia` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "name" TEXT NOT NULL,
    "CPF" BIGINT NOT NULL,
    "CEP" BIGINT NOT NULL,
    "nResidencia" INTEGER NOT NULL,
    "complemento" TEXT
);
INSERT INTO "new_User" ("CPF", "name") SELECT "CPF", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_CPF_key" ON "User"("CPF");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
