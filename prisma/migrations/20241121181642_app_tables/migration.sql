/*
  Warnings:

  - You are about to alter the column `value` on the `drivers` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_drivers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "review_rating" INTEGER NOT NULL,
    "review_comment" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "km_min" INTEGER NOT NULL
);
INSERT INTO "new_drivers" ("description", "id", "km_min", "name", "review_comment", "review_rating", "value", "vehicle") SELECT "description", "id", "km_min", "name", "review_comment", "review_rating", "value", "vehicle" FROM "drivers";
DROP TABLE "drivers";
ALTER TABLE "new_drivers" RENAME TO "drivers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
