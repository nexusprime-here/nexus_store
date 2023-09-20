-- CreateTable
CREATE TABLE "Order" (
    "status" INTEGER NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userCPF" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "Order_userCPF_fkey" FOREIGN KEY ("userCPF") REFERENCES "User" ("CPF") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "CPF" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "fund" INTEGER NOT NULL,
    "sala" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_CPF_key" ON "User"("CPF");
