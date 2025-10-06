-- CreateEnum
CREATE TYPE "EquipamentItemStatus" AS ENUM ('AVAILABLE', 'IN_USE', 'MAINTENANCE', 'DISCARDED');

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "abbreviation" VARCHAR(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "jobTitle" VARCHAR(100) NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipamentItem" (
    "id" SERIAL NOT NULL,
    "serialNumber" VARCHAR(50) NOT NULL,
    "imei" VARCHAR(20) NOT NULL,
    "equipamentModelId" INTEGER NOT NULL,
    "employeeId" INTEGER,
    "status" "EquipamentItemStatus" NOT NULL DEFAULT 'AVAILABLE',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "EquipamentItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipament" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "prefix" VARCHAR(3) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "brand" VARCHAR(50) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Equipament_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Equipament_name_key" ON "Equipament"("name");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipamentItem" ADD CONSTRAINT "EquipamentItem_equipamentModelId_fkey" FOREIGN KEY ("equipamentModelId") REFERENCES "Equipament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipamentItem" ADD CONSTRAINT "EquipamentItem_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
