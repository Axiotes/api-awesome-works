/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `EquipamentItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imei]` on the table `EquipamentItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EquipamentItem_serialNumber_key" ON "EquipamentItem"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "EquipamentItem_imei_key" ON "EquipamentItem"("imei");
