/*
  Warnings:

  - You are about to drop the column `iconURL` on the `Product` table. All the data in the column will be lost.
  - Added the required column `icon` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "icon" TEXT NOT NULL
);
INSERT INTO "new_Product" ("description", "id", "name", "price") SELECT "description", "id", "name", "price" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
