/*
  Warnings:

  - Added the required column `amount` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Transactions" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;
