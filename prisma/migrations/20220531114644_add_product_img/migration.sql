/*
  Warnings:

  - Added the required column `img` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "promotion" BOOLEAN NOT NULL,
    "img" TEXT NOT NULL
);
INSERT INTO "new_product" ("category", "createdAt", "id", "name", "price", "promotion") SELECT "category", "createdAt", "id", "name", "price", "promotion" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
