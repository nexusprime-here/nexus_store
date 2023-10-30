/*
  Warnings:

  - You are about to drop the `_OrderToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_OrderToProduct";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "CountedProduct" (
    "productId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "CountedProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CountedProductToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CountedProductToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "CountedProduct" ("productId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CountedProductToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CountedProductToOrder_AB_unique" ON "_CountedProductToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_CountedProductToOrder_B_index" ON "_CountedProductToOrder"("B");
