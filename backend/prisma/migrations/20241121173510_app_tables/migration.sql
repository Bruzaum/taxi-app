/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Drivers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RideLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RideRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Customer";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Drivers";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RideLog";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RideRequest";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "customers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "review_rating" INTEGER NOT NULL,
    "review_comment" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "km_min" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "rideRequests" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customer_id" INTEGER NOT NULL,
    "originLat" TEXT NOT NULL,
    "originLng" TEXT NOT NULL,
    "originAdress" TEXT NOT NULL,
    "destinationLat" TEXT NOT NULL,
    "destinationLng" TEXT NOT NULL,
    "destinationAdress" TEXT NOT NULL,
    "distance" REAL NOT NULL,
    "duration" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RideLogs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customer_id" INTEGER NOT NULL,
    "originLat" TEXT NOT NULL,
    "originLng" TEXT NOT NULL,
    "originAdress" TEXT NOT NULL,
    "destinationLat" TEXT NOT NULL,
    "destinationLng" TEXT NOT NULL,
    "destinationAdress" TEXT NOT NULL,
    "distance" REAL NOT NULL,
    "duration" TEXT NOT NULL,
    "driverId" INTEGER NOT NULL,
    "value" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RideLogs_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RideLogs_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
