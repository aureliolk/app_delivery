-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "promotion" BOOLEAN NOT NULL,
    "img" TEXT NOT NULL
);
INSERT INTO "new_product" ("category", "createdAt", "id", "img", "name", "price", "promotion") SELECT "category", "createdAt", "id", "img", "name", "price", "promotion" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
