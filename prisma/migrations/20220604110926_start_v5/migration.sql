-- AlterTable
ALTER TABLE "product" ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "category" SET DEFAULT E'Tradicionais';
