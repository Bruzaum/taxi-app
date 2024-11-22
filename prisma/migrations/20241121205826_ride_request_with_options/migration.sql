-- CreateTable
CREATE TABLE "_DriverToRideRequest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DriverToRideRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "drivers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DriverToRideRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "rideRequests" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_DriverToRideRequest_AB_unique" ON "_DriverToRideRequest"("A", "B");

-- CreateIndex
CREATE INDEX "_DriverToRideRequest_B_index" ON "_DriverToRideRequest"("B");
