process.env.DATABASE_URL = "postgresql://neondb_owner:npg_co3P1DrILqgb@ep-still-star-ahj0mogj.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require";
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['info', 'warn', 'error'],
});

async function main() {
    console.log('Checking for quantity column...');
    try {
        const result = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Order' 
      AND column_name = 'quantity'
    `;

        if (Array.isArray(result) && result.length > 0) {
            console.log("SUCCESS: Quantity column already exists.");
            await prisma.$disconnect();
            return;
        }

        console.log("Column missing. Attempting RAW SQL migration...");
        // Add quantity column
        await prisma.$executeRaw`ALTER TABLE "Order" ADD COLUMN "quantity" INTEGER NOT NULL DEFAULT 1;`;
        console.log("SUCCESS: Added 'quantity' column via raw SQL.");

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
