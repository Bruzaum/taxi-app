-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Drivers" (
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
CREATE TABLE "RideRequest" (
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
CREATE TABLE "RideLog" (
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
    CONSTRAINT "RideLog_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Drivers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
