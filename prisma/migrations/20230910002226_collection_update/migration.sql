/*
  Warnings:

  - The primary key for the `Collection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Collection` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Collection" (
    "name" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Collection" ("name") SELECT "name" FROM "Collection";
DROP TABLE "Collection";
ALTER TABLE "new_Collection" RENAME TO "Collection";
CREATE TABLE "new__CollectionToProduct" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CollectionToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection" ("name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CollectionToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__CollectionToProduct" ("A", "B") SELECT "A", "B" FROM "_CollectionToProduct";
DROP TABLE "_CollectionToProduct";
ALTER TABLE "new__CollectionToProduct" RENAME TO "_CollectionToProduct";
CREATE UNIQUE INDEX "_CollectionToProduct_AB_unique" ON "_CollectionToProduct"("A", "B");
CREATE INDEX "_CollectionToProduct_B_index" ON "_CollectionToProduct"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
