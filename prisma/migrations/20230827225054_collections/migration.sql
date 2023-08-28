-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "iconURL" TEXT NOT NULL,
    "collections" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
